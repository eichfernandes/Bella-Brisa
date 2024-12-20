"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import styles from "../page.module.css";
import MaskedInput, { cpfMask } from "../Mask";

export default function Editar() {
  const [funcName, setFuncName] = useState(""); // Nome do funcionário
  const [funcCPF, setFuncCPF] = useState(""); // CPF do funcionário
  const [funcID, setFuncID] = useState(""); // ID do funcionário
  const [funcEmail, setFuncEmail] = useState(""); // Email do funcionário
  const [password, setPassword] = useState(""); // Nova senha do funcionário
  const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro
  const [successMessage, setSuccessMessage] = useState(""); // Mensagem de sucesso
  const [cpf, setCpf] = useState<string | null>(null); // CPF do funcionário vindo da URL
  const router = useRouter();

  // SuspenseBoundary para garantir que useSearchParams só execute no cliente
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <EditarPage cpf={cpf} setCpf={setCpf} />
    </Suspense>
  );
}

function EditarPage({ cpf, setCpf }: { cpf: string | null, setCpf: React.Dispatch<React.SetStateAction<string | null>> }) {
  const searchParams = useSearchParams();
  
  // Garantir que o cpf seja atualizado apenas no lado do cliente
  useEffect(() => {
    if (!cpf) {
      const cpfParam = searchParams.get("cpf");
      if (cpfParam) {
        setCpf(cpfParam);
      }
    }
  }, [cpf, searchParams, setCpf]);

  const [funcName, setFuncName] = useState(""); 
  const [funcCPF, setFuncCPF] = useState(""); 
  const [funcID, setFuncID] = useState(""); 
  const [funcEmail, setFuncEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  
  const router = useRouter();

  // Busca os dados do funcionário
  useEffect(() => {
    if (cpf) {
      async function fetchFuncionario() {
        try {
          const response = await fetch(`/api/user?cpf=${cpf}`);
          if (response.ok) {
            const data = await response.json();
            const user = data.user;
            if (user) {
              setFuncName(user.nome || "");
              setFuncCPF(user.cpf || "");
              setFuncEmail(user.email || "");
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

      fetchFuncionario();
    }
  }, [cpf]);

  const handleEdit = async () => {
    try {
      const updatedData = {
        nome: funcName || undefined,
        cpf: funcCPF || undefined,
        email: funcEmail || undefined,
        senha: password || undefined,
      };

      const response = await fetch(`/api/user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          cpf,
          updatedData
        }),
      });

      if (response.ok) {
        setSuccessMessage("Funcionário atualizado com sucesso!");
        setErrorMessage("");
        router.push("/controle");
      } else {
        setErrorMessage("Erro ao atualizar os dados do funcionário.");
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar com a API.");
    }
  };

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

  const handleBack = () => router.push("/controle");

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
          <p>Para editar um dado, basta altera-lo abaixo e confirmar a edição.<br />Campos em branco serão ignorados e não serão alterados.</p>

          <div className={styles.ElementsBox}>
            <h2>Nome</h2>
            <input
              className={styles.input2}
              type="text"
              placeholder="Novo Nome"
              value={funcName}
              onChange={(e) => setFuncName(e.target.value)}
            />
            <h2>CPF</h2>
            <input
              className={styles.input2}
              type="text"
              placeholder="Novo CPF"
              value={funcCPF}
              onChange={(e) => setFuncCPF(e.target.value)}
            />
            <h2>Email</h2>
            <input
              className={styles.input2}
              type="text"
              placeholder="Novo Email"
              value={funcEmail}
              onChange={(e) => setFuncEmail(e.target.value)}
            />
            <h2>Senha</h2>
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
