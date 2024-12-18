"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../page.module.css";

export default function Ponto() {
  const [stage, setStage] = useState("loading"); // Estado inicial como "loading"
  const [errorMessage, setErrorMessage] = useState(""); // Mensagens de erro
  const router = useRouter();
  const cpf = "12345678900"; // This should come from authentication or user session

  const [userData, setUserData] = useState<{ id: string; nome: string } | null>(null); // Para escrever ID e Nome do funcionário na tela

  // Busca o estado atual do expediente no banco de dados ao carregar a página
  useEffect(() => {
    async function fetchStage() {
      try {
        const response = await fetch(`/api/ponto`, {
          method: "GET"
        });
        if (response.ok) {
          const data = await response.json();
          setUserData({
            id: data.user?.id || "ID não encontrado",  // Ajuste conforme o formato da resposta
            nome: data.user?.nome || "Nome não encontrado", // Ajuste conforme o formato da resposta
          });
          console.log(data)
          const today = new Date().toISOString().split("T")[0]; // Pega apenas a data (YYYY-MM-DD)
          const todayRecord = data.user?.Horas?.find(
            (record: { data: string }) => record.data === today
          );

          if (todayRecord) {
            if (todayRecord.checkOut) setStage("end");
            else if (todayRecord.almocoOut) setStage("afterLunch");
            else if (todayRecord.almocoIn) setStage("duringLunch");
            else if (todayRecord.checkIn) setStage("beforeLunch");
            else setStage("start");
          } else {
            setStage("start");
          }
        } else {
          setErrorMessage("Erro ao carregar estado do expediente.");
        }
      } catch (error) {
        setErrorMessage("Erro ao conectar com a API.");
      }
    }

    fetchStage();
  }, []);

  // Função genérica para enviar o estágio ao backend
  const updateStage = async (tipo: string) => {
    setErrorMessage(""); // Limpa mensagens de erro
    try {
      const response = await fetch("/api/ponto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo }),
      });

      if (response.ok) {
        const newStage = getNextStage(tipo);
        setStage(newStage);
      } else {
        setErrorMessage("Erro ao registrar ponto.");
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar com a API.");
    }
  };

  // Define o próximo estágio com base no tipo atual
  const getNextStage = (tipo: string): string => {
    switch (tipo) {
      case "checkIn":
        return "beforeLunch";
      case "almocoIn":
        return "duringLunch";
      case "almocoOut":
        return "afterLunch";
      case "checkOut":
        return "end";
      default:
        return "start";
    }
  };

  const handleCheckIn = () => updateStage("checkIn");
  const handleLunch = () => updateStage("almocoIn");
  const handleAfterLunch = () => updateStage("almocoOut");
  const handleCheckOut = () => updateStage("checkOut");
  const handlePasswordChange = () => router.push("/trocar-senha");
  async function handleExit() {
    const res = await fetch('/api/login', { method: 'DELETE' })
    if (res.ok){
      router.push("/login"); // Redireciona para a página de login 
    }
  }

  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const dateString = today.toLocaleDateString("pt-BR"); // Data no formato DD/MM/AAAA
    const timeString = today.toLocaleTimeString("pt-BR"); // Hora no formato HH:MM:SS
    setCurrentDateTime(`${dateString} ${timeString}`);
  
    // Sua lógica para buscar o estado do expediente...
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/bellabrisa.svg"
          alt="Next.js logo"
          width={70}
          height={70}
          style={{ marginBottom: 15 }}
          priority
        />
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>REGISTRO DE PONTO</h1>
          <h2>ID: {userData?.id + " - " + userData?.nome || 'Carregando...'}</h2>
          <h3>({currentDateTime})</h3>
          {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
          {stage === "loading" && (
            <div className={styles.TextBox}>
              <p>Carregando estado do expediente...</p>
            </div>
          )}
          {stage === "start" && (
            <div className={styles.TextBox}>
              Clique em "Check-In" para iniciar o expediente:
              <br />
              <input
                className={styles.CheckButton}
                id={styles.Checkin}
                type="button"
                value="Check-In"
                onClick={handleCheckIn}
              />
            </div>
          )}
          {stage === "beforeLunch" && (
            <div className={styles.TextBox}>
              Clique em "Intervalo" para iniciar seu intervalo ou em
              "Check-Out" para encerrar o expediente:
              <br />
              <input
                className={styles.CheckButton}
                id={styles.Intervalo}
                type="button"
                value="Intervalo"
                onClick={handleLunch}
              />
              <input
                className={styles.CheckButton}
                id={styles.Checkout}
                type="button"
                value="Check-Out"
                onClick={handleCheckOut}
              />
            </div>
          )}
          {stage === "duringLunch" && (
            <div className={styles.TextBox}>
              Você está em intervalo no momento. Clique em "Retornar" para
              terminá-lo:
              <br />
              <input
                className={styles.CheckButton}
                type="button"
                value="Retornar"
                onClick={handleAfterLunch}
              />
            </div>
          )}
          {stage === "afterLunch" && (
            <div className={styles.TextBox}>
              Clique em "Check-Out" para encerrar o expediente:
              <br />
              <input
                className={styles.CheckButton}
                id={styles.Checkout}
                type="button"
                value="Check-Out"
                onClick={handleCheckOut}
              />
            </div>
          )}
          {stage === "end" && (
            <div className={styles.TextBox}>
              <p>Expediente encerrado. Tenha um bom dia!</p>
            </div>
          )}
        </div>
        <input
          type="button"
          className={styles.ExitButton}
          value="Sair"
          onClick={handleExit}
        />
      </main>
      <footer className={styles.footer}>
        <input
          type="button"
          onClick={handlePasswordChange}
          className={styles.footerButton}
          value="Trocar Senha"
        />
      </footer>
    </div>
  );
}
