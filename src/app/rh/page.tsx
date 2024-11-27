"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../page.module.css";

export default function RH() {
  const router = useRouter();
  const handleExit = () => router.push("/login"); // Redireciona para a página de login
  const handleControl = () => router.push("/controle"); // Redireciona para a página de Controle de Funcionários
  const handleRelatorio = () => router.push("/relatorio"); // Redireciona para a página de Relatórios
  const handleTrocarSenha = () => router.push("/trocar-senha"); // Redireciona para a página de Troca de Senha
  

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
            <h1>GESTÃO DE FUNCIONÁRIOS</h1><br/>
            <h2>Acesse "Gerar Relatórios" para baixar relatórios 
              <br/>da equipe ou "Controle de Funcionários"<br/>para edições na mesma.            </h2>
          <div className={styles.ElementsBox}>
                <button className={styles.CheckButton2} onClick={handleRelatorio}>
                  Gerar Relatórios
                </button><br/>
                <button className={styles.CheckButton2} onClick={handleControl}>
                  Controle de Funcionários
                </button>
            </div>
        </div>
        <input
          type="button"
          className={styles.ExitButton}
          value="Sair"
          onClick={handleExit} // Redireciona ao clicar
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
