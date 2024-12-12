"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../page.module.css";

export default function Ponto() {
  const [stage, setStage] = useState("loading"); // Estado inicial como "loading"
  const [errorMessage, setErrorMessage] = useState(""); // Mensagens de erro
  const router = useRouter();

  // Busca o estado atual do expediente no banco de dados ao carregar a página
  useEffect(() => {
    async function fetchStage() {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setStage(data.stage || "start"); // Define o estágio com base nos dados recebidos
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
  const updateStage = async (newStage: any) => {
    setErrorMessage(""); // Limpa mensagens de erro
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf, tipo }),
      });

      if (response.ok) {
        setStage(newStage);
      } else {
        setErrorMessage("Erro ao registrar ponto.");
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar com a API.");
    }
  };

  const handleCheckIn = () => updateStage("beforeLunch");
  const handleLunch = () => updateStage("duringLunch");
  const handleAfterLunch = () => updateStage("afterLunch");
  const handleCheckOut = () => updateStage("end");
  const handleExit = () => router.push("/login");
  const handlePasswordChange = () => router.push("/trocar-senha");

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
          <br />
          <h2>Rafael Eich Fernandes (ID 0002)</h2>
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
