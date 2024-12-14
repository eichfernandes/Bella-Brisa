"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";
import MaskedInput, { cpfMask } from "../Mask";

export default function Editar() {
  const [funcName, setFuncName] = useState(""); // Nome do funcionário
  const [funcCPF, setFuncCPF] = useState(""); // CPF do funcionário
  const [funcID, setFuncID] = useState(""); // ID do funcionário
  const [password, setPassword] = useState(""); // Nova senha do funcionário
  const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro
  const [successMessage, setSuccessMessage] = useState(""); // Mensagem de sucesso
  const router = useRouter();
  const searchParams = useSearchParams();
  const cpf = searchParams.get("cpf"); // Obtém o CPF dos parâmetros da URL

  // Busca os dados do funcionário pelo CPF
  useEffect(() => {
    async function fetchFuncionario() {
      try {
        const response = await fetch(`/api/user?cpf=${cpf}`);
        if (response.ok) {
          const data = await response.json();
          const user = data.user;

          if (user) {
            setFuncName(user.nome || "");
            setFuncCPF(user.cpf || "");
            setFuncID(user.id || "");
          } else {
            setErrorMessage("Funcionário não encontrado.");
          }
        } else {
          setErrorMessage("Erro ao buscar os dados do funcionário.");
        }
      } catch (error) {
        setErrorMessage("Erro ao conectar com a API.");
      }
    }

    if (cpf) {
      fetchFuncionario();
    }
  }, [cpf]);

  // Função para editar os dados do funcionário
  const handleEdit = async () => {
    try {
      const updatedData = {
        nome: funcName || undefined, // Mantém o valor atual se o campo estiver vazio
        cpf: funcCPF || undefined,
        senha: password || undefined,
      };

      const response = await fetch(`/api/user?cpf=${cpf}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setSuccessMessage("Funcionário atualizado com sucesso!");
        setErrorMessage("");
      } else {
        setErrorMessage("Erro ao atualizar os dados do funcionário.");
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar com a API.");
    }
  };

  // Função para excluir o funcionário
  const handleDelete = async () => {
    const confirmDelete = confirm("Você tem certeza que deseja excluir este funcionário?");
    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf }),
      });

      if (response.ok) {
        alert("Funcionário excluído com sucesso!");
        router.push("/controle");
      } else {
        setErrorMessage("Erro ao excluir o funcionário.");
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar com a API.");
    }
  };

  const handleBack = () => router.push("/controle"); // Redireciona para a página de Controle

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
          <h1>EDIÇÃO DE FUNCIONÁRIO</h1>
          <h2>ID: {funcID || "Carregando..."}</h2>
          <h2>Nome: {funcName || "Carregando..."}</h2>
          <h2>CPF: {funcCPF || "Carregando..."}</h2>
          <p>Para editar um dado, insira na tabela abaixo.<br />Valores em branco serão mantidos.</p>

          <div className={styles.ElementsBox}>
            <input
              className={styles.input2}
              type="text"
              placeholder="Novo Nome"
              value={funcName}
              onChange={(e) => setFuncName(e.target.value)}
            />
            <br />
            <MaskedInput
              className={styles.input2}
              type="text"
              maskFunction={cpfMask}
              placeholder="Novo CPF"
              maxLength="14"
              value={funcCPF}
              onChange={(e: any) => setFuncCPF(e.target.value)}
            />
            <br />
            <input
              className={styles.input2}
              type="password"
              placeholder="Nova Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button
              className={styles.inputButton2}
              onClick={handleEdit}
            >
              Editar
            </button>
            <br />
            <button
              className={styles.RemoveButton}
              title="Cuidado! Este botão deletará o funcionário do sistema."
              onClick={handleDelete}
            >
              Excluir
            </button>
          </div>
          {successMessage && <p className={styles.successText}>{successMessage}</p>}
          {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
        </div>
        <input
          type="button"
          className={styles.ExitButton}
          value="Voltar"
          onClick={handleBack}
        />
      </main>
    </div>
  );
}
