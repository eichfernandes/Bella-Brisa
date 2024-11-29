"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../page.module.css";

export default function Editar() {
  const [funcName, setFuncName] = useState("");
  const [funcCPF, setFuncCPF] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleBack = () => router.push("/controle"); // Redireciona para a página de Controle

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
            <h1>EDIÇÃO DE FUNCIONÁRIO</h1><br/>
            <h2>ID: 0002</h2>
            <h2>Nome: Teste da Silva</h2>
            <h2>CPF: 000.000.000-00</h2><br/>
            Para editar um dado, insira na tabela abaixo.<br/>Valores em branco serão mantidos.
          
          <div className={styles.ElementsBox}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Nome"
                    value={funcName}
                    onChange={(e) => setFuncName(e.target.value)}
                /><br/>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="CPF"
                    value={funcCPF}
                    onChange={(e) => setFuncCPF(e.target.value)}
                /><br/>
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br/>
                <button // Recarrega a página e altera os dados
                className={styles.inputButton}>
                    Editar
                </button><br/>
                <button // Recarrega a página e altera os dados
                className={styles.RemoveButton}>
                    Excluir
                </button><br/><br/>
                Cuidado, este botão deletará o<br/>funcionário do sistema.
            </div>
        </div>
        <input
          type="button"
          className={styles.ExitButton}
          value="Voltar"
          onClick={handleBack} // Redireciona ao clicar
        />
      </main>
    </div>
  );
}
