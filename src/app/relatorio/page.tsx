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
  const [filterMode, setFilterMode] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  const filteredFuncionarios = funcionarios.filter((func) =>
    func.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para gerar PDF individual
  const handleGenerateEmployeeReport = (user: IUser) => {
    const doc = new jsPDF();
    doc.text(`Relatório Detalhado de ${user.nome}`, 10, 10);
    doc.text(`ID: ${user.id}`, 10, 20);
    doc.text(`CPF: ${user.cpf}`, 10, 30);

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

    doc.save(`Relatorio_${user.nome.replace(/ /g, "_")}.pdf`);
  };

  // Função para gerar relatório geral
  const handleDownloadGeneralReport = () => {
    const doc = new jsPDF();
    doc.text("Relatório Geral de Funcionários", 10, 10);

    const tableData = funcionarios.flatMap((user) =>
      user.Horas.map((hora) => [
        user.id,
        user.nome,
        hora.data || "FALTA",
        formatHour(hora.checkIn),
        formatHour(hora.checkOut),
        formatHour(hora.almocoIn),
        formatHour(hora.almocoOut),
      ])
    );

    (doc as any).autoTable({
      head: [
        ["ID", "Nome", "Data", "Entrada", "Saída", "Entrada Almoço", "Saída Almoço"],
      ],
      body: tableData,
      startY: 20,
      theme: "grid",
      styles: { fontSize: 8, halign: "center" },
    });

    doc.save("Relatorio_Geral.pdf");
  };

  // Função para gerar relatório filtrado
  const handleDownloadFilteredReport = () => {
    const doc = new jsPDF();
    doc.text("Relatório Filtrado de Funcionários", 10, 10);

    const tableData = funcionarios.flatMap((user) =>
      user.Horas.filter(
        (hora) => hora.data >= startDate && hora.data <= endDate
      ).map((hora) => [
        user.id,
        user.nome,
        hora.data || "FALTA",
        formatHour(hora.checkIn),
        formatHour(hora.checkOut),
        formatHour(hora.almocoIn),
        formatHour(hora.almocoOut),
      ])
    );

    (doc as any).autoTable({
      head: [
        ["ID", "Nome", "Data", "Entrada", "Saída", "Entrada Almoço", "Saída Almoço"],
      ],
      body: tableData,
      startY: 20,
      theme: "grid",
      styles: { fontSize: 8, halign: "center" },
    });

    doc.save("Relatorio_Filtrado.pdf");
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
                  <Func
                    key={func.id}
                    funcionario={func}
                    onClick={() => handleGenerateEmployeeReport(func)}
                  />
                ))
              ) : (
                <p>Nenhum funcionário encontrado.</p>
              )}
            </div>
          </div>
          <button
            className={styles.CheckButton2}
            onClick={handleDownloadGeneralReport}
          >
            Baixar Relatório Geral
          </button>
          <button
            className={styles.CheckButton2}
            onClick={() => setFilterMode(true)}
          >
            Relatório Filtrado
          </button>
          {filterMode && (
            <>
              <input
                type="date"
                className={styles.input}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                className={styles.input}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <button
                className={styles.CheckButton2}
                onClick={handleDownloadFilteredReport}
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
          <button className={styles.ExitButton} onClick={() => router.push("/rh")}>
            Voltar
          </button>
        </div>
      </main>
    </div>
  );
}

export function Func({
  funcionario,
  onClick,
}: {
  funcionario: IUser;
  onClick: () => void;
}) {
  return (
    <button className={styles.ClickableElementList} onClick={onClick}>
      <span>{funcionario.nome}</span>
      <span>ID {funcionario.id}</span>
    </button>
  );
}

const formatHour = (time: string | null) =>
  time
    ? new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "FALTA";
