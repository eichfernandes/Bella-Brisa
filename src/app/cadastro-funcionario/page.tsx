"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../page.module.css";
import InputMask from 'react-input-mask-next';

export default function Cadastro() {
  const [funcID, setFuncID] = useState("");
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
            <h1>CADASTRO DE FUNCIONÁRIO</h1><br/>
            <h2>Insira os dados do funcionário a cadastrar abaixo:</h2>
          
          <div className={styles.ElementsBox}>
                <input
                    className={styles.input2}
                    type="number"
                    placeholder="ID do Funcionário"
                    value={funcID}
                    onChange={(e) => setFuncID(e.target.value)}
                /><br/>
                <input
                    className={styles.input2}
                    type="text"
                    placeholder="Nome do Funcionário"
                    value={funcName}
                    onChange={(e) => setFuncName(e.target.value)}
                /><br/>
                <input
                    className={styles.input2}
                    type="number"
                    placeholder="CPF do Funcionário"
                    value={funcCPF}
                    onChange={(e) => setFuncCPF(e.target.value)}
                /><br/>
                <input
                    className={styles.input2}
                    type="password"
                    placeholder="Senha do Funcionário"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.inputButton2}>
                Cadastrar
                </button>
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