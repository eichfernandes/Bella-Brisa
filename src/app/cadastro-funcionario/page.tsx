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

  const handleBack = () => router.push("/controle");

  // Validação do CPF - Apenas números e 11 dígitos
  const isValidCPF = (cpf: string) => /^[0-9]{11}$/.test(cpf.replace(/\D/g, ""));

  // Validação do Email com Regex
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Limpar formatações de CPF antes da validação
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
          <form onSubmit={handleSubmit} className={styles.ElementsBox}>
            <MaskedInput
              className={styles.input2}
              type="text"
              placeholder="ID de Funcionário"
              maskFunction={idMask}
              value={funcID}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFuncID(e.target.value)}
            /><br />
            <input
              className={styles.input2}
              type="text"
              placeholder="Nome Completo"
              value={funcName}
              onChange={(e) => setFuncName(e.target.value)}
            /><br />
            <MaskedInput
              className={styles.input2}
              type="text"
              maskFunction={cpfMask}
              placeholder="CPF"
              value={funcCPF}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFuncCPF(e.target.value)}
              maxLength={14} // Limita o input mascarado a 14 caracteres (000.000.000-00)
            /><br />
            <input
              className={styles.input2}
              type="email"
              placeholder="Email"
              value={funcEmail}
              onChange={(e) => setFuncEmail(e.target.value)}
            /><br />
            <input
              className={styles.input2}
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br />
            <button type="submit" className={styles.inputButton2}>
              Cadastrar
            </button>
            {errorMessage && (
              <span className={styles.errorText}>
                <br />
                {errorMessage}
              </span>
            )}
          </form>
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
