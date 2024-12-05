"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../page.module.css";
import MaskedInput, { cpfMask, idMask } from '../Mask';

export default function Cadastro() {
  const [funcID, setFuncID] = useState("");
  const [funcName, setFuncName] = useState("");
  const [funcCPF, setFuncCPF] = useState("");
  const [password, setPassword] = useState("");
  const [funcEmail, setFuncEmail] = useState("");
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
                <MaskedInput
                    className={styles.input2}
                    type="text"
                    placeholder="ID de Funcionário"
                    maskFunction={idMask}
                    maxLength="4"
                    value={funcID}
                    max={99}
                    onChange={(e) => setFuncID(e.target.value)}
                /><br/>
                <input
                    className={styles.input2}
                    type="text"
                    placeholder="Nome Completo"
                    value={funcName}
                    onChange={(e) => setFuncName(e.target.value)}
                /><br/>
                <MaskedInput
                className={styles.input2}
                type="text"
                maskFunction={cpfMask}
                placeholder="CPF"
                maxlength="14"
                value={funcCPF}
                onChange={(e) => setFuncCPF(e.target.value)}
                /><br/>
                <input
                    className={styles.input2}
                    type="email"
                    placeholder="Email"
                    value={funcEmail}
                    onChange={(e) => setFuncEmail(e.target.value)}
                /><br/>
                <input
                    className={styles.input2}
                    type="password"
                    placeholder="Senha"
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