"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../page.module.css";
import MaskedInput, { cpfMask, idMask } from "../Mask";

export default function Cadastro() {
  const [funcID, setFuncID] = useState("");
  const [funcName, setFuncName] = useState("");
  const [funcCPF, setFuncCPF] = useState("");
  const [password, setPassword] = useState("");
  const [funcEmail, setFuncEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleBack = () => router.push("/controle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!funcID || !funcName || !funcCPF || !password || !funcEmail) {
      setErrorMessage("Todos os campos são obrigatórios.");
      return;
    }

    const cadastroData = {
      id: funcID,
      name: funcName,
      cpf: funcCPF,
      email: funcEmail,
      password: password,
    };

    try {
      const response = await fetch("/api/funcionarios/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cadastroData),
      });

      if (response.ok) {
        alert("Funcionário cadastrado com sucesso!");
        router.push("/controle");
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message || "Erro ao cadastrar funcionário.");
      }
    } catch (error) {
      setErrorMessage("Erro inesperado ao processar o cadastro.");
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
<<<<<<< HEAD
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
                <span className={styles.errorText} hidden // Fazer este texto aparecer somente se algum campo não for preenchido
                ><br/><br/>Erro: Campo em branco.</span>
            </div>
=======
          <h1>CADASTRO DE FUNCIONÁRIO</h1>
          <h2>Insira os dados do funcionário a cadastrar abaixo:</h2>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <MaskedInput
              className={styles.input2}
              type="text"
              placeholder="ID de Funcionário"
              maskFunction={idMask}
              maxLength={4}
              value={funcID}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFuncID(e.target.value)}
            />
            <MaskedInput
              className={styles.input2}
              type="text"
              placeholder="Nome Completo"
              value={funcName}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFuncName(e.target.value)} maskFunction={undefined}            />
            <MaskedInput
              className={styles.input2}
              type="text"
              placeholder="CPF"
              maskFunction={cpfMask}
              maxLength={14}
              value={funcCPF}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFuncCPF(e.target.value)}
            />
            <input
              className={styles.input2}
              type="email"
              placeholder="Email"
              value={funcEmail}
              onChange={(e) => setFuncEmail(e.target.value)}
            />
            <input
              className={styles.input2}
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={styles.inputButton2}>
              Cadastrar
            </button>
            {errorMessage && (
              <span className={styles.errorText}>{errorMessage}</span>
            )}
          </form>
>>>>>>> ff6890f (Adição da lógica para conexão do BD)
        </div>
        <button
          type="button"
          className={styles.ExitButton}
          onClick={handleBack}
        >
          Voltar
        </button>
      </main>
    </div>
  );
}
