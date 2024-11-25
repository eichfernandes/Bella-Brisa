"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../page.module.css";

export default function Cadastro() {
  const [funcName, setFuncName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleExit = () => router.push("/admin"); // Redireciona para a página de login

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
            <h1>CADASTRO DE FUNCIONÁRIO</h1><br/>
            <h2>ID do Novo Funcionário: 0003</h2>
          
          <div className={styles.ElementsBox}>
                <input
                    className={styles.input}
                    type="number"
                    placeholder="Nome do Funcionário"
                    value={funcName}
                    onChange={(e) => setFuncName(e.target.value)}
                /><br/>
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Senha do Funcionário"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.inputButton}>
                Cadastrar
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
    </div>
  );
}
