"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from "../page.module.css";

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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Buscar dados dos funcionários
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

  // Filtrar funcionários pelo nome
  const filteredFuncionarios = funcionarios.filter((func) =>
    func.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gerar relatório PDF para um funcionário
  const generatePDF = (user: IUser) => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Funcionário: ${user.nome}`, 10, 10);
    doc.text(`ID: ${user.id}`, 10, 16);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Horas trabalhadas no mês: ${calculateTotalHours(user.Horas)}`, 10, 26);
    doc.text(`Inconsistências: ${calculateTotalInconsistency(user.Horas)}`, 10, 32);

    const tableHeaders = [
      "Data",
      "Entrada",
      "Saída",
      "Horas Trabalhadas",
      "Entrada Almoço",
      "Saída Almoço",
      "Duração Almoço",
      "Inconsistência",
    ];

    const tableData = user.Horas.map((hora) => [
      hora.data || "FALTA",
      formatHour(hora.checkIn),
      formatHour(hora.checkOut),
      formatDecimalToHours(calculateHoursWorked(hora.checkIn, hora.checkOut)),
      formatHour(hora.almocoIn),
      formatHour(hora.almocoOut),
      formatDecimalToHours(calculateLunchDuration(hora.almocoIn, hora.almocoOut)),
      formatDecimalToHours(calculateInconsistency(hora.checkIn, hora.checkOut)),
    ]);

    (doc as any).autoTable({
      startY: 40,
      head: [tableHeaders],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 8, halign: "center" },
    });

    doc.save(`Relatorio_${user.nome}.pdf`);
  };

  // Gerar relatório geral de todos os funcionários
  const generateGeneralPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Relatório Geral de Funcionários", 10, 10);

    const tableHeaders = [
      "Funcionário",
      "Data",
      "Entrada",
      "Saída",
      "Horas Trabalhadas",
      "Entrada Almoço",
      "Saída Almoço",
      "Duração Almoço",
      "Inconsistência",
    ];

    const tableData = funcionarios.flatMap((user) =>
      user.Horas.map((hora) => [
        user.nome,
        hora.data || "FALTA",
        formatHour(hora.checkIn),
        formatHour(hora.checkOut),
        formatDecimalToHours(calculateHoursWorked(hora.checkIn, hora.checkOut)),
        formatHour(hora.almocoIn),
        formatHour(hora.almocoOut),
        formatDecimalToHours(calculateLunchDuration(hora.almocoIn, hora.almocoOut)),
        formatDecimalToHours(calculateInconsistency(hora.checkIn, hora.checkOut)),
      ])
    );

    (doc as any).autoTable({
      startY: 20,
      head: [tableHeaders],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 8, halign: "center" },
    });

    doc.save("Relatorio_Geral.pdf");
  };

  // Gerar relatório filtrado por data
  const generateFilteredPDF = () => {
    const doc = new jsPDF();

    const filteredData = funcionarios.flatMap((user) =>
      user.Horas.filter(
        (hora) =>
          new Date(hora.data) >= new Date(startDate) &&
          new Date(hora.data) <= new Date(endDate)
      ).map((hora) => ({
        ...hora,
        nome: user.nome,
      }))
    );

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Relatório Filtrado de ${startDate} a ${endDate}`, 10, 10);

    const tableHeaders = [
      "Funcionário",
      "Data",
      "Entrada",
      "Saída",
      "Horas Trabalhadas",
      "Entrada Almoço",
      "Saída Almoço",
      "Duração Almoço",
      "Inconsistência",
    ];

    const tableData = filteredData.map((data) => [
      data.nome,
      data.data || "FALTA",
      formatHour(data.checkIn),
      formatHour(data.checkOut),
      formatDecimalToHours(calculateHoursWorked(data.checkIn, data.checkOut)),
      formatHour(data.almocoIn),
      formatHour(data.almocoOut),
      formatDecimalToHours(calculateLunchDuration(data.almocoIn, data.almocoOut)),
      formatDecimalToHours(calculateInconsistency(data.checkIn, data.checkOut)),
    ]);

    (doc as any).autoTable({
      startY: 20,
      head: [tableHeaders],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 8, halign: "center" },
    });

    doc.save(`Relatorio_Filtrado_${startDate}_a_${endDate}.pdf`);
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
          <h1 className={styles.title}>RELATÓRIO DETALHADO DE FUNCIONÁRIOS</h1>
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
              {filteredFuncionarios.map((func) => (
                <button
                  key={func.cpf}
                  className={styles.ClickableElementList}
                  onClick={() => generatePDF(func)}
                >
                  <span>{func.nome}</span>
                  <span>ID {func.id}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.dateFilters}>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.GenerateButton} onClick={generateGeneralPDF}>
              Gerar Relatório Geral
            </button>
            <button className={styles.GenerateButton} onClick={generateFilteredPDF}>
              Gerar Relatório Filtrado
            </button>
          </div>
          <button className={styles.ExitButton} onClick={() => router.push("/rh")}>
            Voltar
          </button>
        </div>
      </main>
    </div>
  );
}

// Funções auxiliares
const formatHour = (time: string | null) =>
  time
    ? new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "FALTA";

const calculateHoursWorked = (checkIn: string | null, checkOut: string | null) => {
  if (!checkIn || !checkOut) return 0;
  return (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 3600000;
};

const calculateLunchDuration = (almocoIn: string | null, almocoOut: string | null) => {
  if (!almocoIn || !almocoOut) return 0;
  return (new Date(almocoOut).getTime() - new Date(almocoIn).getTime()) / 3600000;
};

const calculateInconsistency = (checkIn: string | null, checkOut: string | null) => {
  const worked = calculateHoursWorked(checkIn, checkOut);
  const expected = 8;
  return worked - expected;
};

const formatDecimalToHours = (decimalHours: number): string => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours}h${minutes.toString().padStart(2, "0")}m`;
};

const calculateTotalHours = (horas: any[]) =>
  formatDecimalToHours(
    horas.reduce((sum, h) => sum + calculateHoursWorked(h.checkIn, h.checkOut), 0)
  );

const calculateTotalInconsistency = (horas: any[]) =>
  formatDecimalToHours(
    horas.reduce((sum, h) => sum + calculateInconsistency(h.checkIn, h.checkOut), 0)
  );
