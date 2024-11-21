"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import para redirecionamento
import styles from "./admin.module.css";

export default function Admin() {
  const router = useRouter(); // Hook para navegação

  const handleExit = () => router.push("/login"); // Redireciona para a página de login

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

  const handleExport = (type: string) => {
    alert(`Exportando relatórios em formato ${type}`);
  };

  const handleLogout = () => {
    router.push("/login"); // Redireciona para a página de login
  };

  return (
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <h1>Painel do Administrador</h1>
      </header>

      <main className={styles.main}>
        {/* Monitoramento de Funcionários */}
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

        {/* Relatórios */}
        <section className={styles.section}>
          <h2>Relatórios</h2>
          <div className={styles.reportActions}>
            <button
              className={styles.reportButton}
              onClick={() => handleExport("PDF")}
            >
              Exportar PDF
            </button>
            <button
              className={styles.reportButton}
              onClick={() => handleExport("CSV")}
            >
              Exportar CSV
            </button>
          </div>
        </section>

        {/* Funcionalidades Extras */}
        <section className={styles.section}>
          <h2>Banco de Horas</h2>
          <p>Total acumulado: 12 horas</p>
          <button className={styles.extraButton}>Ajustar Manualmente</button>
        </section>


        <input
          type="button"
          className={styles.ExitButton}
          value="Sair"
          onClick={handleExit} // Redireciona ao clicar
        />
      </main>

      <footer>
 
          
      </footer>
    </div>
  );
}
