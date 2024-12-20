"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../page.module.css";

export default function RH() {
  const router = useRouter();
  const handleControl = () => router.push("/controle"); // Redireciona para a página de Controle de Funcionários
  const handleRelatorio = () => router.push("/relatorio"); // Redireciona para a página de Relatórios
  const handleTrocarSenha = () => router.push("/trocar-senha"); // Redireciona para a página de Troca de Senha
  
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
            <h1>GESTÃO DE FUNCIONÁRIOS</h1>
            <h2>Acesse "Gerar Relatórios" para baixar relatórios 
              <br/>da equipe ou "Controle de Funcionários"<br/>para edições quando necessárias.
            </h2>
            <button className={styles.CheckButton2} onClick={handleRelatorio}>
              Gerar Relatórios
            </button>
            <button className={styles.CheckButton2} onClick={handleControl}>
              Controle de Funcionários
            </button>
        </div>
        <input
          type="button"
          className={styles.ExitButton}
          value="Sair"
          onClick={handleExit} // Redireciona ao clicar
          title="Logout do Sistema"
        />
      </main>
      <footer className={styles.footer}>
        <input
          type="button"
          className={styles.footerButton}
          onClick={handleTrocarSenha}
          value="Trocar Senha"
        />
      </footer>
    </div>
  );
}
