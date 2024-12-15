"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from "../page.module.css";

// Interface dos dados
export interface IUser {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  Horas: {
    data: string;
    checkIn: string | null;
    checkOut: string | null;
    almocoIn: string | null;
    almocoOut: string | null;
  }[];
}

export default function Relatorio() {
  const router = useRouter();
  const [funcionarios, setFuncionarios] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState(false); // Para alternar entre modos
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Buscar dados da API
  useEffect(() => {
    async function fetchFuncionarios() {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          setFuncionarios(data.users || []);
        } else {
          console.error("Erro ao buscar funcionários.");
        }
      } catch (error) {
        console.error("Erro ao conectar com a API:", error);
      }
    }
    fetchFuncionarios();
  }, []);

  // Filtrar funcionários com base no nome
  const filteredFuncionarios = funcionarios.filter((func) =>
    func.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gerar PDF
  const handleDownloadReport = (filtered = false) => {
    const doc = new jsPDF();
    const title = filtered
      ? "Relatório Filtrado de Funcionários"
      : "Relatório Detalhado de Funcionários";
    doc.text(title, 10, 10);

    const usersToInclude = filtered
      ? funcionarios.map((user) => ({
          ...user,
          Horas: user.Horas.filter(
            (hora) => hora.data >= startDate && hora.data <= endDate
          ),
        }))
      : funcionarios;

    usersToInclude.forEach((user, index) => {
      if (index > 0) doc.addPage();
      doc.text(`Funcionário: ${user.nome}`, 10, 20);
      doc.text(`ID: ${user.id}`, 10, 30);

      const tableData = user.Horas.map((hora) => [
        hora.data || "FALTA",
        formatHour(hora.checkIn),
        formatHour(hora.checkOut),
        formatHour(hora.almocoIn),
        formatHour(hora.almocoOut),
      ]);

      (doc as any).autoTable({
        head: [["Data", "Entrada", "Saída", "Entrada Almoço", "Saída Almoço"]],
        body: tableData,
        startY: 40,
        theme: "grid",
        styles: { fontSize: 8, halign: "center" },
      });
    });

    doc.save(filtered ? "Relatorio_Filtrado.pdf" : "Relatorio_Geral.pdf");
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
          priority
        />
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>RELATÓRIO DETALHADO DE FUNCIONÁRIOS</h1>
          {!filterMode ? (
            <>
              <h2>Lista de Funcionários</h2>
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
                      <Func key={func.id} funcionario={func} />
                    ))
                  ) : (
                    <p>Nenhum funcionário encontrado.</p>
                  )}
                </div>
              </div>
              <button
                className={styles.CheckButton2}
                onClick={() => handleDownloadReport(false)}
              >
                Baixar Relatório Geral
              </button>
              <button
                className={styles.CheckButton2}
                onClick={() => setFilterMode(true)}
              >
                Filtrar Relatório por Data
              </button>
            </>
          ) : (
            <>
              <h2>Filtrar Relatório por Data</h2>
              <div className={styles.dateInputs}>
                <label>Data Inicial</label>
                <input
                  type="date"
                  className={styles.input}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <label>Data Final</label>
                <input
                  type="date"
                  className={styles.input}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <button
                className={styles.CheckButton2}
                onClick={() => handleDownloadReport(true)}
              >
                Baixar Relatório Filtrado
              </button>
              <button
                className={styles.ExitButton}
                onClick={() => setFilterMode(false)}
              >
                Voltar
              </button>
            </>
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <button
          className={styles.ExitButton}
          onClick={() => router.push("/rh")}
        >
          Voltar
        </button>
      </footer>
    </div>
  );
}

export function Func({ funcionario }: { funcionario: IUser }) {
  return (
    <div className={styles.ClickableElementList}>
      <span>{funcionario.nome}</span>
      <span>ID {funcionario.id}</span>
    </div>
  );
}

// Função auxiliar para formatar horas
const formatHour = (time: string | null) =>
  time
    ? new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "FALTA";
