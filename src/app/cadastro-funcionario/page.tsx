"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../page.module.css";
import MaskedInput, { cpfMask, idMask } from "../Mask";
import { IUser } from "@/models/User";

export default function Cadastro() {
  const [funcID, setFuncID] = useState("");
  const [funcName, setFuncName] = useState("");
  const [funcCPF, setFuncCPF] = useState("");
  const [password, setPassword] = useState("");
  const [funcEmail, setFuncEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleBack = () => history.back();

  // Validação do CPF
  const isValidCPF = (cpf: string) => /^[0-9]{11}$/.test(cpf.replace(/\D/g, ""));

  // Validação do Email
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanCPF = funcCPF.replace(/\D/g, "");

    // Verificar campos obrigatórios
    if (!funcID || !funcName || !cleanCPF || !password || !funcEmail) {
      setErrorMessage("Todos os campos são obrigatórios.");
      return;
    }

    // Validações específicas
    if (!isValidCPF(cleanCPF)) {
      setErrorMessage("CPF inválido. Deve conter 11 números.");
      return;
    }

    if (!isValidEmail(funcEmail)) {
      setErrorMessage("Email inválido.");
      return;
    }

    // Dados para envio
    const cadastroData: IUser = {
      id: funcID,
      nome: funcName,
      cpf: cleanCPF,
      email: funcEmail,
      senha: password,
    };

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cadastroData),
      });

      if (response.ok) {
        alert("Funcionário cadastrado com sucesso!");
        router.push("/controle");
      } else {
        const errorResponse = await response.json();
        setErrorMessage(
          errorResponse.message || "Erro ao cadastrar funcionário."
        );
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
          priority
        />
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>CADASTRO DE FUNCIONÁRIO</h1>
          <h2>Insira os dados do funcionário a cadastrar abaixo:</h2>

          <form className={styles.ElementsBox} onSubmit={handleSubmit}>
            <MaskedInput
              className={styles.input2}
              type="text"
              placeholder="ID de Funcionário"
              maskFunction={idMask}
              maxLength="4"
              value={funcID}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFuncID(e.target.value)}
            />
            <br />
            <input
              className={styles.input2}
              type="text"
              placeholder="Nome Completo"
              value={funcName}
              onChange={(e) => setFuncName(e.target.value)}
            />
            <br />
            <MaskedInput
              className={styles.input2}
              type="text"
              maskFunction={cpfMask}
              placeholder="CPF"
              maxLength="14"
              value={funcCPF}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFuncCPF(e.target.value)}
            />
            <br />
            <input
              className={styles.input2}
              type="email"
              placeholder="Email"
              value={funcEmail}
              onChange={(e) => setFuncEmail(e.target.value)}
            />
            <br />
            <input
              className={styles.input2}
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit" className={styles.inputButton2}>
              Cadastrar
            </button>
          </form>

          {errorMessage && (
            <div className={styles.errorText}>
              <p>Erro: {errorMessage}</p>
            </div>
          )}
        </div>
        <button type="button" className={styles.ExitButton} onClick={handleBack}>
          Voltar
        </button>
      </main>
    </div>
  );
}
