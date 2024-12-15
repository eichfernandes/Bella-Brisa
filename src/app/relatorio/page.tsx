"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from "../page.module.css";

// Definição da interface para tipar os dados
export interface IUser {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  Horas: {
    data: string;
    checkIn: string | null; // Formato ISO ou Date
    checkOut: string | null;
    almocoIn: string | null;
    almocoOut: string | null;
  }[];
}

export default function Relatorio() {
  const router = useRouter();
  const [funcionarios, setFuncionarios] = useState<IUser[]>([]); // Lista de funcionários
  const [searchTerm, setSearchTerm] = useState(""); // Termo de busca
  const [filterMode, setFilterMode] = useState(false); // Modo de filtro
  const [startDate, setStartDate] = useState(""); // Data inicial do filtro
  const [endDate, setEndDate] = useState(""); // Data final do filtro

  // Função para formatar horas no formato hh:mm
  const formatHour = (isoDate: string | null): string => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Buscar os dados dos funcionários da API
  useEffect(() => {
    async function fetchFuncionarios() {
      try {
        const response = await fetch("/api/user"); // Chamada à API de listagem
        if (response.ok) {
          const data = await response.json();
          setFuncionarios(data.users || []); // Os usuários são retornados na propriedade "users"
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
  const filteredFuncionarios = funcionarios.filter((func) =>
    func.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gerar relatório geral
  const handleDownloadReport = async () => {
    try {
      const doc = new jsPDF();
      doc.text("Relatório Geral de Funcionários", 10, 10);

      const tableData = funcionarios.flatMap((user: IUser) =>
        user.Horas.map((hora) => [
          user.id,
          user.nome,
          user.email,
          user.cpf,
          hora.data,
          formatHour(hora.checkIn),
          formatHour(hora.checkOut),
        ])
      );

      (doc as any).autoTable({
        head: [["ID", "Nome", "Email", "CPF", "Data", "Check-In", "Check-Out"]],
        body: tableData,
        startY: 20,
      });

      doc.save("Relatorio_Geral.pdf");
    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
    }
  };

  // Gerar relatório filtrado por data
  const handleDownloadFilteredReport = async () => {
    try {
      const doc = new jsPDF();
      doc.text("Relatório Filtrado de Funcionários", 10, 10);

      const filteredData = funcionarios.flatMap((user: IUser) =>
        user.Horas.filter(
          (hora) =>
            hora.data >= startDate && hora.data <= endDate // Filtro por data
        ).map((hora) => [
          user.id,
          user.nome,
          user.email,
          user.cpf,
          hora.data,
          formatHour(hora.checkIn),
          formatHour(hora.checkOut),
        ])
      );

      (doc as any).autoTable({
        head: [["ID", "Nome", "Email", "CPF", "Data", "Check-In", "Check-Out"]],
        body: filteredData,
        startY: 20,
      });

      doc.save("Relatorio_Filtrado.pdf");
    } catch (error) {
      console.error("Erro ao gerar o relatório filtrado:", error);
    }
  };

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
          {!filterMode ? (
            <>
              <h1>RELATÓRIO DE FUNCIONÁRIOS</h1>
              <h2>Selecione um funcionário ou baixe o relatório geral:</h2>
              <input
                type="text"
                className={styles.SearchBar}
                placeholder="Pesquisar funcionário"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className={styles.containerScroll}>
                <div className={styles.scrollbarBox}>
                  {filteredFuncionarios.length > 0 ? (
                    filteredFuncionarios.map((func) => (
                      <Func
                        key={func.cpf}
                        funcionario={func}
                      />
                    ))
                  ) : (
                    <p>Nenhum funcionário encontrado.</p>
                  )}
                </div>
              </div>
              <button
                className={styles.CheckButton2}
                onClick={handleDownloadReport}
              >
                Baixar Relatório Geral
              </button>
              <button
                className={styles.CheckButton2}
                onClick={() => setFilterMode(true)}
              >
                Relatório Filtrado por Data
              </button>
            </>
          ) : (
            <>
              <h1>RELATÓRIO FILTRADO</h1>
              <h2>Selecione uma data de início<br/>e fim para filtragem do relatório.</h2>
              <div className={styles.dateInputs}>
                <span className={styles.defaultTextSize}>Início do relatório:</span>
                <input
                  type="date"
                  className={styles.input}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                /><br/>
                <span className={styles.defaultTextSize}>Fim do relatório:</span>
                <input
                  type="date"
                  className={styles.input}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                /><br/>
              </div>
              <button
                className={styles.CheckButton2}
                onClick={handleDownloadFilteredReport}
              >
                Baixar Relatório Filtrado
              </button>
              <button
                className={styles.CheckButton2}
                onClick={() => setFilterMode(false)}
              >
                Relatório sem Filtragem
              </button>
            </>
          )}
        </div>
        <button
          className={styles.ExitButton}
          onClick={() => router.push("/rh")}
        >
          Voltar
        </button>
      </main>
    </div>
  );
}

export function Func({
  funcionario,
}: {
  funcionario: IUser;
}) {
  return (
    <button className={styles.ClickableElementList}>
      <span>{funcionario.nome}</span>
      <span>ID {funcionario.id}</span>
    </button>
  );
}
