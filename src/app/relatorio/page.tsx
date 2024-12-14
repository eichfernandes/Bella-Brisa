"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import styles from "../page.module.css";

export default function RelatorioPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  // Função para buscar dados do funcionário
  const fetchEmployeeData = async () => {
    setErrorMessage(""); // Limpa mensagens de erro
    try {
      const response = await fetch(
        `/api/employee/hours?startDate=${startDate}&endDate=${endDate}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados do funcionário.");
      }

      const data = await response.json();
      if (!data || !data.Horas) {
        throw new Error("Dados retornados estão inválidos.");
      }

      setEmployeeData(data);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  // Geração do PDF com os dados do funcionário
  const generatePDF = () => {
    if (!startDate || !endDate) {
      alert("Selecione as datas de início e fim.");
      return;
    }

    if (!employeeData || !employeeData.Horas.length) {
      alert("Nenhum registro encontrado para o período selecionado.");
      return;
    }

    const doc = new jsPDF();
    const { id, nome, cpf, Horas } = employeeData;

    // Cabeçalho do relatório
    doc.setFontSize(16);
    doc.text("Relatório de Horas do Funcionário", 10, 10);

    doc.setFontSize(12);
    doc.text(`ID: ${id}`, 10, 20);
    doc.text(`Nome: ${nome}`, 10, 30);
    doc.text(`CPF: ${cpf}`, 10, 40);
    doc.text(`Período: ${startDate} até ${endDate}`, 10, 50);

    // Adicionando tabela de Horas
    let y = 60;
    doc.text("Data          Entrada     Saída       Almoço Início   Almoço Fim", 10, y);
    y += 10;

    Horas.forEach((hora: any) => {
      const row = `${hora.data}   ${hora.checkIn}   ${hora.checkOut}   ${hora.almocoIn}   ${hora.almocoOut}`;
      doc.text(row, 10, y);
      y += 10;
    });

    // Salvar PDF
    doc.save(`Relatorio_${id}_${startDate}_a_${endDate}.pdf`);
  };

  // Atualiza os dados quando as datas são alteradas
  useEffect(() => {
    if (startDate && endDate) {
      fetchEmployeeData();
    }
  }, [startDate, endDate]);

  return (
    <div className={styles.page}>
      <header>
        <h1 className={styles.defaultTextSize}>Relatório de Horas</h1>
        <p className={styles.TextBox}>
          Selecione o período para visualizar os registros de Horas do funcionário:
        </p>
      </header>

      {/* Formulário de seleção de datas */}
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.ElementsBox}>
            <label htmlFor="start-date" className={styles.defaultTextSize}>
              Início do Relatório:
            </label>
            <input
              id="start-date"
              type="date"
              className={styles.Date}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label htmlFor="end-date" className={styles.defaultTextSize}>
              Fim do Relatório:
            </label>
            <input
              id="end-date"
              type="date"
              className={styles.Date}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <button className={styles.inputButton2} onClick={generatePDF}>
              Gerar PDF
            </button>
          </div>

          {/* Exibição de erro */}
          {errorMessage && (
            <p className={`${styles.errorText} ${styles.TextBox}`}>
              {errorMessage}
            </p>
          )}
        </div>

        {/* Exibição dos dados */}
        {employeeData && (
          <div className={styles.container}>
            <h2>Dados do Funcionário</h2>
            <p>
              <strong>ID:</strong> {employeeData.id}
            </p>
            <p>
              <strong>Nome:</strong> {employeeData.nome}
            </p>
            <p>
              <strong>CPF:</strong> {employeeData.cpf}
            </p>
            <h3>Registros de Horas</h3>
            <div className={styles.containerScroll}>
              <div className={styles.scrollbarBox}>
                {employeeData.Horas.map((hora: any, index: number) => (
                  <div key={index} className={styles.ClickableElementList}>
                    <div className={styles.Left}>
                      <p>Data: {hora.data}</p>
                      <p>Entrada: {hora.checkIn}</p>
                      <p>Saída: {hora.checkOut}</p>
                    </div>
                    <div className={styles.Right}>
                      <p>Almoço Início: {hora.almocoIn}</p>
                      <p>Almoço Fim: {hora.almocoOut}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer>
        <button
          type="button"
          className={styles.ExitButton}
          onClick={() => router.push("/controle")}
        >
          Voltar
        </button>
      </footer>
    </div>
  );
}
