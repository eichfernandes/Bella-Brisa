"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";
import MaskedInput, { cpfMask } from "../Mask";

export default function Editar() {
  const [funcName, setFuncName] = useState(""); // Estado para o nome do funcionário
  const [funcCPF, setFuncCPF] = useState(""); // Estado para o CPF do funcionário
  const [password, setPassword] = useState(""); // Estado para a senha do funcionário
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensagens de sucesso
  const router = useRouter();
  const searchParams = useSearchParams();
  const cpf = searchParams.get("cpf");

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

      const response = await fetch("/api/user", {
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
            <h2>ID: 0002</h2>
            <h2>Nome: Rafael Eich Fernandes</h2>
            <h2>CPF: 000.000.000-00</h2>
            Para editar um dado, insira na tabela abaixo.<br/>Valores em branco serão mantidos.
          
          <div className={styles.ElementsBox}>
            <input
              className={styles.input2}
              type="text"
              placeholder="Nome"
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
              onChange={(maskedValue: React.SetStateAction<string>) => setFuncCPF(maskedValue)}
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
