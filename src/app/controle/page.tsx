"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";
import { IUser } from "@/models/User";

export default function Gerenciamento() {
  const router = useRouter();
  const [funcionarios, setFuncionarios] = useState([]); // Estado para armazenar a lista de funcionários
  const [searchTerm, setSearchTerm] = useState(""); // Estado para a barra de pesquisa

  const handleBack = () => router.push("/rh");
  const handleCadastro = () => router.push("/cadastro-funcionario");

  // Buscar os dados dos funcionários da API
  useEffect(() => {
    async function fetchFuncionarios() {
      try {
        const response = await fetch("/api/user"); // Chamada à API de listagem
        if (response.ok) {
          const data = await response.json();
          setFuncionarios(data.users); // Os usuários são retornados na propriedade "users"
        } else {
          console.error("Erro ao buscar os funcionários.");
        }
      } catch (error) {
        console.error("Erro ao conectar com a API:", error);
      }
    }

    fetchFuncionarios();
  }, []);

  // Filtrar funcionários com base no termo de pesquisa
  const filteredFuncionarios = funcionarios.filter((func:IUser) =>
    func.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1>GERENCIAMENTO DE<br />FUNCIONÁRIOS</h1><br />
          <h2>Selecione um funcionário para editar seus dados:</h2><br />
          <input
            type="text"
            className={styles.SearchBar}
            placeholder="Pesquisa"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado da pesquisa
          />
          <div className={styles.containerScroll}>
            <div className={styles.scrollbarBox}>
              {filteredFuncionarios.length > 0 ? (
                filteredFuncionarios.map((func:IUser) => (
                  <Func key={func.cpf} funcionario={func} />
                ))
              ) : (
                <p>Nenhum funcionário encontrado.</p>
              )}
            </div>
          </div>
          <button className={styles.CheckButton2} onClick={handleCadastro}>
            Cadastrar Novo Funcionário
          </button>
        </div>
      </main>
      <footer className={styles.footer}>
        <input
          type="button"
          className={styles.ExitButton}
          value="Voltar"
          onClick={handleBack}
        />
      </footer>
    </div>
  );
}

export function Func({ funcionario }: { funcionario: IUser }) {
  const router = useRouter();
  const handleEdit = () => router.push(`/editar-funcionario?cpf=${funcionario.cpf}`);



  return (
    <button className={styles.ClickableElementList} onClick={handleEdit}>
      <span>{funcionario.nome}</span>
      <span>ID {funcionario.id}</span>
    </button>
  );
}

