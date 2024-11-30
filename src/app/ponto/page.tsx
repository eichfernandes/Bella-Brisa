"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../page.module.css";

export default function Ponto() {
  const [stage, setStage] = useState("start");
  const router = useRouter();

  const handleCheckIn = () => setStage("beforeLunch");
  const handleLunch = () =>
  {
    setStage("duringLunch");
    router.push("/previsao");
  };
  const handleCheckOut = () => setStage("end");
  const handleExit = () => router.push("/login");
  const handlePasswordChange = () => router.push('/trocar-senha');


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
          {stage === "start" && (
            <div className={styles.TextBox}>
              Clique em "Check-In" para iniciar o expediente:<br />
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
              Clique em "Almoço" para iniciar seu intervalo de almoço ou em
              "Check-Out" para encerrar o expediente:<br />
              <input
                className={styles.CheckButton}
                id={styles.Almoco}
                type="button"
                value="Almoço"
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
              encerrar o intervalo de almoço:<br />
              <input
                className={styles.CheckButton}
                type="button"
                value="Retornar"
                onClick={() => setStage("afterLunch")}
              />
            </div>
          )}
          {stage === "afterLunch" && (
            <div className={styles.TextBox}>
              Clique em "Check-Out" para encerrar o expediente:<br />
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