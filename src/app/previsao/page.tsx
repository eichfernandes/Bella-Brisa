"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import styles from "../page.module.css";

export default function Previsao() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [currentStage, setCurrentStage] = useState("checkin");

  // UseEffect para garantir que o código só execute no cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentStage(searchParams.get("stage") || "checkin");
    }
  }, [searchParams]);

  async function handleExit() {
    const res = await fetch('/api/login', { method: 'DELETE' });
    if (res.ok) {
      router.push("/login"); // Redireciona para a página de login 
    }
  }

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
          <Suspense fallback={<div>Carregando...</div>}>
            <Horas currentStage={currentStage} />
          </Suspense>
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
}

function formatUTCtoBrasilia(date: Date) {
  const brasiliaOffset = -3; // UTC -3 para o horário de Brasília

  // Cria um novo objeto Date ajustando o fuso horário
  const brasiliaDate = new Date(date);
  brasiliaDate.setHours(brasiliaDate.getHours() + brasiliaOffset);

  return brasiliaDate;
}

function getIntervalo(date: Date):string{
  const dateBr = formatUTCtoBrasilia(date);
  dateBr.setHours(dateBr.getHours() + 4);
  // Chama toString para obter uma string representando a data
  const timeIntervaloString = dateBr.toISOString();

  const dateRetorno = dateBr;
  dateRetorno.setHours(dateBr.getHours() + 1);
  // Chama toString para obter uma string representando a data
  const timeRetornoString = dateRetorno.toISOString();

  // Usa slice para extrair a parte da hora (HH:mm)
  return timeIntervaloString.slice(11,16) + " - " + timeRetornoString.slice(11,16);
}

function getCheckinSaida(date: Date):string{
  const dateBr = formatUTCtoBrasilia(date);
  dateBr.setHours(dateBr.getHours() + 9);

  // Chama toString para obter uma string representando a data
  const timeString = dateBr.toISOString();

  // Usa slice para extrair a parte da hora (HH:mm)
  return timeString.slice(11,16);
}

function getRetorno(date: Date):string{
  const dateBr = formatUTCtoBrasilia(date);
  dateBr.setHours(dateBr.getHours() + 1);

  // Chama toString para obter uma string representando a data
  const timeString = dateBr.toISOString();

  // Usa slice para extrair a parte da hora (HH:mm)
  return timeString.slice(11,16);
}

function getRetornoSaida(date: Date):string{
  const dateBr = formatUTCtoBrasilia(date);
  dateBr.setHours(dateBr.getHours() + 4);

  // Chama toString para obter uma string representando a data
  const timeString = dateBr.toISOString();

  // Usa slice para extrair a parte da hora (HH:mm)
  return timeString.slice(11,16);
}

function Horas({ currentStage }: HorasProps) {
  const time = new Date;

  if (currentStage === "checkin") {
    return (
      <div className={styles.TextBox}>
        <p>Previsão de Intervalo: {getIntervalo(time)}</p><br/>
        <p>Previsão de Saída: {getCheckinSaida(time)}</p>
      </div>
    );
  } else if (currentStage === "interval") {
    return (
      <div className={styles.TextBox}>
        <p>Previsão de Retorno: {getRetorno(time)}</p>
      </div>
    );
  } else if (currentStage === "return") {
    return (
      <div className={styles.TextBox}>
        <p>Previsão de Saída: {getRetornoSaida(time)}</p>
      </div>
    );
  } else if (currentStage === "checkout") {
    return (
      <div className={styles.TextBox}>
        <p>Fim do expediente!</p>
        <p>Obrigado pelo seu serviço.</p>
      </div>
    );
  }

  return null;
}
