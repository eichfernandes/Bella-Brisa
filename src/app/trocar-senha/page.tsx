"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../page.module.css";

export default function TrocarSenha() {
  const [oldPassword, setOldPass] = useState("");
  const [newPassword, setNewPass] = useState("");
  const [newPasswordConfirm, setNewPassConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleBack = () => history.back(); // Redireciona para a página anterior

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Verificar campos obrigatórios
    if (!oldPassword || !newPassword || !newPasswordConfirm) {
      setErrorMessage("Todos os campos são obrigatórios.");
      return;
    }

    // Verificar se a nova senha e a confirmação coincidem
    if (newPassword !== newPasswordConfirm) {
      setErrorMessage("A nova senha e a confirmação não coincidem.");
      return;
    }

    try {
      const response = await fetch("/api/trocar-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senhaOld: oldPassword, senha: newPassword }),
      });

      if (response.ok) {
        alert("Senha alterada com sucesso!");
        router.push("/controle"); // Redireciona após sucesso
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message || "Erro ao alterar a senha.");
      }
    } catch (error) {
      setErrorMessage("Erro inesperado ao processar a troca de senha.");
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/bellabrisa.svg"
          alt="Logo"
          width={70}
          height={70}
          style={{ marginBottom: 15 }}
          priority
        />
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>TROCAR SENHA</h1>
          <form className={styles.ElementsBox} onSubmit={handleSubmit}>
            <h2>Confirmação de Senha:</h2>
            <input
              className={styles.input}
              type="password"
              placeholder="Insira sua senha atual"
              value={oldPassword}
              onChange={(e) => setOldPass(e.target.value)}
            />
            <br />
            <h2>Nova Senha:</h2>
            <input
              className={styles.input}
              type="password"
              placeholder="Insira a nova senha"
              value={newPassword}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <br />
            <input
              className={styles.input}
              type="password"
              placeholder="Repita a nova senha"
              value={newPasswordConfirm}
              onChange={(e) => setNewPassConfirm(e.target.value)}
            />
            <br />
            <button className={styles.inputButton} type="submit">
              Alterar Senha
            </button>
          </form>
          {errorMessage && (
            <div className={styles.errorText}>
              <p>Erro: {errorMessage}</p>
            </div>
          )}
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
