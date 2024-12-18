"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../page.module.css";

export default function Ponto() {
  const [stage, setStage] = useState("loading"); // Estado inicial como "loading"
  const [errorMessage, setErrorMessage] = useState(""); // Mensagens de erro
  const router = useRouter();
  const handlePasswordChange = () => router.push("/trocar-senha");
  async function handleExit() {
    const res = await fetch('/api/login', { method: 'DELETE' })
    if (res.ok){
      router.push("/login"); // Redireciona para a página de login 
    }
  }

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
          <h1>ERRO DE ACESSO</h1>
            <div className={styles.TextBox}>
              <p>O sistema de ponto não deve ser acessado por funcionários fora da empresa.</p>
            </div>
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