"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";

export default function Previsao() {
  const router = useRouter();
  async function handleExit() {
    const res = await fetch('/api/login', { method: 'DELETE' })
    if (res.ok){
      router.push("/login"); // Redireciona para a página de login 
    }
  }

  // Estados para armazenar o horário do Check-in e a etapa do expediente
  const [currentStage, setCurrentStage] = useState("checkin");
  const [checkinTime, setCheckinTime] = useState<Date | null>(null);
  const [intervalStartTime, setIntervalStartTime] = useState<Date | null>(null);
  const [returnTime, setReturnTime] = useState<Date | null>(null);

  // Função para calcular previsões baseadas nos horários
  const calculateTime = (baseTime: Date, hoursToAdd: number) => {
    const newTime = new Date(baseTime);
    newTime.setHours(newTime.getHours() + hoursToAdd);
    return newTime;
  };

  // Lógica para avançar de uma etapa para outra
  const advanceStage = () => {
    switch (currentStage) {
      case "checkin":
        const now = new Date();
        setCheckinTime(now);
        setCurrentStage("interval");
        break;
      case "interval":
        setIntervalStartTime(new Date());
        setCurrentStage("return");
        break;
      case "return":
        setReturnTime(new Date());
        setCurrentStage("checkout");
        break;
      case "checkout":
        setCurrentStage("farewell");
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/bellabrisa.svg"
          alt="Logo"
          width={70}
          height={70}
          priority
        />
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>PREVISÃO DE HORÁRIOS</h1>
          <Horas
            currentStage={currentStage}
            checkinTime={checkinTime}
            intervalStartTime={intervalStartTime}
            returnTime={returnTime}
          />
          {currentStage !== "farewell" && (
            <button className={styles.CheckButton} onClick={advanceStage}>
              Avançar
            </button>
          )}
        </div>
        <button className={styles.ExitButton} onClick={handleExit}>
          Sair
        </button>
      </main>
    </div>
  );
}

interface HorasProps {
  currentStage: string;
  checkinTime: Date | null;
  intervalStartTime: Date | null;
  returnTime: Date | null;
}

export function Horas({
  currentStage,
  checkinTime,
  intervalStartTime,
  returnTime,
}: HorasProps) {
  const formatTime = (date: Date | null) =>
    date
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "Não disponível";

  const calculateTime = (baseTime: Date | null, hoursToAdd: number) => {
    if (!baseTime) return "FALTA";
    const newTime = new Date(baseTime);
    newTime.setHours(newTime.getHours() + hoursToAdd);
    return formatTime(newTime);
  };

  if (currentStage === "checkin") {
    return (
      <div className={styles.TextBox}>
        <p>Início do expediente.</p>
        <p>Previsão de Intervalo: {calculateTime(new Date(), 4)}</p>
        <p>Previsão de Saída: {calculateTime(new Date(), 8)}</p>
      </div>
    );
  } else if (currentStage === "interval") {
    return (
      <div className={styles.TextBox}>
        <p>Intervalo iniciado.</p>
        <p>Previsão de Retorno: {calculateTime(new Date(), 1)}</p>
      </div>
    );
  } else if (currentStage === "return") {
    return (
      <div className={styles.TextBox}>
        <p>Retorno do Intervalo.</p>
        <p>Previsão de Saída: {calculateTime(returnTime, 4)}</p>
      </div>
    );
  } else if (currentStage === "checkout") {
    return (
      <div className={styles.TextBox}>
        <p>Fim do expediente!</p>
        <p>Obrigado por hoje.</p>
      </div>
    );
  } else if (currentStage === "farewell") {
    return (
      <div className={styles.TextBox}>
        <p>Até logo!</p>
      </div>
    );
  }

  return null;
}
