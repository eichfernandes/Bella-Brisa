"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./rh.module.css";

type DailyReport = { id: string; name: string; hours: string };
type MonthlyReport = { month: string; totalHours: string };
type YearlyReport = { year: string; totalHours: string };

export default function Rh() {
  const router = useRouter();
  const [reportType, setReportType] = useState<"daily" | "monthly" | "yearly">("daily");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [reportData, setReportData] = useState<DailyReport[] | MonthlyReport[] | YearlyReport[]>([]);

  const handleExit = () => router.push("/login");

  const handleExport = (type: "PDF" | "CSV") => {
    alert(`Exportando relatório ${reportType} em formato ${type}`);
  };

  const handleGenerateReport = () => {
    let data: DailyReport[] | MonthlyReport[] | YearlyReport[] = [];
    if (reportType === "daily") {
      data = [
        { id: "001", name: "Hugo Leonardo", hours: "8h" },
        { id: "002", name: "Wagner Martins", hours: "7.5h" },
        { id: "003", name: "Tiago Daniel", hours: "7.5h" },
        { id: "004", name: "Tiago Rodrigues", hours: "7.5h" },
      ];
    } else if (reportType === "monthly") {
      data = [
        { month: "Janeiro", totalHours: "160h" },
        { month: "Fevereiro", totalHours: "150h" },        
        { month: "Março", totalHours: "160h" },
        { month: "Abril", totalHours: "150h" },
      ];
    } else if (reportType === "yearly") {
      data = [        
        { year: "2021", totalHours: "1800h" },
        { year: "2022", totalHours: "1720h" },
        { year: "2023", totalHours: "1800h" },
        { year: "2024", totalHours: "1720h" },
      ];
    }
    setReportData(data);
  };

  const [employees, setEmployees] = useState([
    {
      id: "001",
      name: "Hugo Leonardo",
      entry: "08:00",
      break: "12:00 - 13:00",
      exit: "17:00",
      totalHours: "8h",
    },
    {
      id: "002",
      name: "Wagner Martins",
      entry: "09:00",
      break: "12:30 - 13:30",
      exit: "18:00",
      totalHours: "7.5h",
    },
    {
      id: "003",
      name: "Tiago Daniel",
      entry: "09:00",
      break: "12:30 - 13:30",
      exit: "18:00",
      totalHours: "7.5h",
    },
    {
      id: "004",
      name: "Tiago Rodrigues",
      entry: "09:00",
      break: "12:30 - 13:30",
      exit: "18:00",
      totalHours: "7.5h",
    },
  ]);

  return (
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <h1>Painel do RH</h1>
      </header>

      <main className={styles.main}>

        
      <section className={styles.section}>
          <h2>Monitoramento de Funcionários</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Entrada</th>
                <th>Intervalo</th>
                <th>Saída</th>
                <th>Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.entry}</td>
                  <td>{emp.break}</td>
                  <td>{emp.exit}</td>
                  <td>{emp.totalHours}</td>
                  <td>
                    <button className={styles.actionButton}>Editar</button>
                    <button className={styles.actionButton}>Alertar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={styles.section}>
          <h2>Relatórios</h2>
          <div className={styles.reportFilter}>
            <label>
              <input
                type="radio"
                name="reportType"
                value="daily"
                checked={reportType === "daily"}
                onChange={() => setReportType("daily")}
              />
              Diário
            </label>
            <label>
              <input
                type="radio"
                name="reportType"
                value="monthly"
                checked={reportType === "monthly"}
                onChange={() => setReportType("monthly")}
              />
              Mensal
            </label>
            <label>
              <input
                type="radio"
                name="reportType"
                value="yearly"
                checked={reportType === "yearly"}
                onChange={() => setReportType("yearly")}
              />
              Anual
            </label>
          </div>
          <button className={styles.generateButton} onClick={handleGenerateReport}>
            Gerar Relatório
          </button>
          <div className={styles.reportActions}>
            <button className={styles.reportButton} onClick={() => handleExport("PDF")}>
              Exportar PDF
            </button>
            <button className={styles.reportButton} onClick={() => handleExport("CSV")}>
              Exportar CSV
            </button>
          </div>
          <div className={styles.reportResults}>
            {reportData.length > 0 && (
              <table className={styles.table}>
                <thead>
                  <tr>
                    {Object.keys(reportData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, idx) => (
                        <td key={idx}>{String(value)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <input
          type="button"
          className={styles.ExitButton}
          value="Sair"
          onClick={handleExit}
        />
      </main>
    </div>
  );
}
