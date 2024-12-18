"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from "../page.module.css";

interface IUser {
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
    const ActualDate = new Date();
    const ActualDateString = formatDateToDDMMYYYY(ActualDate);

    const OneMonthBack = new Date();
    OneMonthBack.setDate(OneMonthBack.getDate() - 30);
    const OneMonthBackString = formatDateToDDMMYYYY(OneMonthBack);

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`Relatório de ${user.nome}`, 10, 14);
    doc.setFontSize(15);
    doc.text(`(${OneMonthBackString} - ${ActualDateString})`, 10, 22);
    doc.setFontSize(12);
    doc.text(`ID: ${user.id}`, 10, 30);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Horas trabalhadas: ${calculateTotalHours(user.Horas)}`, 10, 38);
    doc.text(`Inconsistências: ${calculateTotalInconsistency(user.Horas)}`, 10, 44);

    const tableHeaders = [
      "Data",
      "Entrada",
      "Intervalo",
      "Retorno",
      "Saída",
      "Horas Trabalhadas",
      "Duração Almoço",
      "Inconsistência",
    ];

    const tableData = user.Horas
    .filter((hora) => {
      const horaData = new Date(hora.data);
      return horaData >= OneMonthBack && horaData <= ActualDate;
    }).sort((a,b) => new Date(a.data).getTime() - new Date(b.data).getTime())
    .map((hora) => [
      formatDateToDDMMYYYY(new Date(hora.data)) || "FALTA",
      formatHour(hora.checkIn),
      `${formatHour(hora.almocoIn)}${hora.almocoIn ? "\n" + formatDateToDDMMYYYY(new Date(hora.almocoIn)) : "" }`,
      `${formatHour(hora.almocoOut)}${hora.almocoOut ? "\n" + formatDateToDDMMYYYY(new Date(hora.almocoOut)) : "" }`,
      `${formatHour(hora.checkOut)}${hora.checkOut ? "\n" + formatDateToDDMMYYYY(new Date(hora.checkOut)) : "" }`,
      formatDecimalToHours(calculateHoursWorked(hora.checkIn, hora.checkOut, hora.almocoIn, hora.almocoOut)),
      formatDecimalToHours(calculateLunchDuration(hora.almocoIn, hora.almocoOut)),
      `${formatDecimalToHours(calculateInconsistency(hora.checkIn, hora.checkOut, hora.almocoIn, hora.almocoOut))}${formatDecimalToHours(calculateInconsistency(hora.checkIn, hora.checkOut, hora.almocoIn, hora.almocoOut))[0] === '-' ? "\n(Dívida)" : ""}`,
    ]);

    (doc as any).autoTable({
      startY: 52,
      head: [tableHeaders],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 8, halign: "center", valign: 'middle' },
    });

    doc.save(`Relatorio_${user.nome}_(${ActualDateString}).pdf`);
  };

  // Gerar relatório geral de todos os funcionários
  const generateGeneralPDF = () => {
    const ActualDate = new Date();
    const ActualDateString = ActualDate.toISOString().split('T')[0];

    const OneMonthBack = new Date();
    OneMonthBack.setDate(OneMonthBack.getDate() - 30);
    const OneMonthBackString = OneMonthBack.toISOString().split('T')[0];

    if (!ActualDateString || !OneMonthBackString) {
      alert("Por favor, selecione as datas de início e fim.");
      return;
    }
  
    const doc = new jsPDF();
    let yOffset = 35; // Coordenada inicial no eixo Y
  
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`Relatório Geral (${formatDateToDDMMYYYY(ActualDate)})`, 10, 14);
    doc.setFontSize(15);
    doc.text(`Período: últimos 30 dias`, 10, 22);
    doc.setFontSize(12);
    doc.text(`(${formatDateToDDMMYYYY(OneMonthBack)} - ${formatDateToDDMMYYYY(ActualDate)})`, 72, 21.8)
  
    const tableHeaders = [
      "Data",
      "Entrada",
      "Intervalo",
      "Retorno",
      "Saída",
      "Horas Trabalhadas",
      "Duração Almoço",
      "Inconsistência",
    ];
  
    // Filtrando os dados dentro do período
    const filteredFuncionarios = funcionarios.map((user) => {
      const horasFiltradas = user.Horas.filter(
        (hora) =>
          new Date(hora.data) >= new Date(OneMonthBackString) &&
          new Date(hora.data) <= new Date(ActualDateString)
      );
      return { ...user, Horas: horasFiltradas };
    }).filter(user => user.Horas.length > 0); // Filtra funcionários sem dados no período
  
    // Verifica se há dados filtrados
    if (filteredFuncionarios.length === 0) {
      doc.setFontSize(12);
      doc.text("Nenhum dado encontrado no período selecionado.", 10, 35);
      doc.save(`Relatorio_Geral_(${formatDateToDDMMYYYY(ActualDate)})_VAZIO.pdf`);
      return;
    }
  
    // Gera a tabela para cada funcionário
    filteredFuncionarios.sort((a, b) => Number(a.id) - Number(b.id)).forEach((user, index) => {
      if (index !== 0) yOffset += 10; // Espaço entre as seções
  
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`Funcionário: ${user.nome}`, 10, yOffset);
      doc.text(`ID: ${user.id}`, 10, yOffset + 6);
  
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Horas trabalhadas: ${calculateTotalHours(user.Horas)} | Inconsistências: ${calculateTotalInconsistency(user.Horas)}`,
        10,
        yOffset + 14
      );
  
      const tableData = user.Horas.sort((a,b) => new Date(a.data).getTime() - new Date(b.data).getTime()).map((hora) => [
        formatDateToDDMMYYYY(new Date(hora.data)) || "FALTA",
        formatHour(hora.checkIn),
        `${formatHour(hora.almocoIn)}${hora.almocoIn ? "\n" + formatDateToDDMMYYYY(new Date(hora.almocoIn)) : "" }`,
        `${formatHour(hora.almocoOut)}${hora.almocoOut ? "\n" + formatDateToDDMMYYYY(new Date(hora.almocoOut)) : "" }`,
        `${formatHour(hora.checkOut)}${hora.checkOut ? "\n" + formatDateToDDMMYYYY(new Date(hora.checkOut)) : "" }`,
        formatDecimalToHours(calculateHoursWorked(hora.checkIn, hora.checkOut, hora.almocoIn, hora.almocoOut)),
        formatDecimalToHours(calculateLunchDuration(hora.almocoIn, hora.almocoOut)),
        `${formatDecimalToHours(calculateInconsistency(hora.checkIn, hora.checkOut, hora.almocoIn, hora.almocoOut))}${formatDecimalToHours(calculateInconsistency(hora.checkIn, hora.checkOut, hora.almocoIn, hora.almocoOut))[0] === '-' ? "\n(Dívida)" : ""}`,
      ]);
  
      (doc as any).autoTable({
        startY: yOffset + 20,
        head: [tableHeaders],
        body: tableData,
        theme: "grid",
        styles: { fontSize: 8, halign: "center", valign: 'middle' },
      });
  
      // Atualiza o yOffset para a próxima seção
      yOffset = (doc as any).lastAutoTable.finalY + 10;
  
      // Adiciona uma nova página se necessário
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 10;
      }
    });
  
    // Salva o PDF no final
    doc.save(`Relatorio_Geral_(${formatDateToDDMMYYYY(ActualDate)}).pdf`);
  };
  

  // Gerar relatório filtrado por data
  const generateFilteredPDF = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate());

    const newEndDate = new Date(endDate);
    newEndDate.setDate(newEndDate.getDate());

    if (!startDate || !endDate) {
      alert("Por favor, selecione as datas de início e fim.");
      return;
    }
  
    const doc = new jsPDF();
    let yOffset = 35; // Coordenada inicial no eixo Y
  
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`Relatório Filtrado`, 10, 14);
    doc.setFontSize(15);
    doc.text(`Período: ${formatDateToDDMMYYYY(newStartDate)} - ${formatDateToDDMMYYYY(newEndDate)}`, 10, 22);
  
    const tableHeaders = [
      "Data",
      "Entrada",
      "Intervalo",
      "Retorno",
      "Saída",
      "Horas Trabalhadas",
      "Duração Almoço",
      "Inconsistência",
    ];
  
    // Filtrando os dados dentro do período
    const filteredFuncionarios = funcionarios.map((user) => {
      const horasFiltradas = user.Horas.filter(
        (hora) =>
          new Date(hora.data) >= newStartDate &&
          new Date(hora.data) <= newEndDate
      );
      return { ...user, Horas: horasFiltradas };
    }).filter(user => user.Horas.length > 0); // Filtra funcionários sem dados no período
  
    // Verifica se há dados filtrados
    if (filteredFuncionarios.length === 0) {
      doc.setFontSize(12);
      doc.text("Nenhum dado encontrado no período selecionado.", 10, 35);
      doc.save(`Relatorio_Filtrado_(${formatDateToDDMMYYYY(newStartDate)}-${formatDateToDDMMYYYY(newEndDate)}).pdf`);
      return;
    }
  
    // Gera a tabela para cada funcionário
    filteredFuncionarios.sort((a, b) => Number(a.id) - Number(b.id)).forEach((user, index) => {
      if (index !== 0) yOffset += 10; // Espaço entre as seções
  
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`Funcionário: ${user.nome}`, 10, yOffset);
      doc.text(`ID: ${user.id}`, 10, yOffset + 6);
  
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Horas trabalhadas: ${calculateTotalHours(user.Horas)} | Inconsistências: ${calculateTotalInconsistency(user.Horas)}`,
        10,
        yOffset + 14
      );
  
      const tableData = user.Horas.sort((a,b) => new Date(a.data).getTime() - new Date(b.data).getTime()).map((hora) => [
        formatDateToDDMMYYYY(new Date(hora.data)) || "FALTA",
        formatHour(hora.checkIn),
        `${formatHour(hora.almocoIn)}${hora.almocoIn ? "\n" + formatDateToDDMMYYYY(new Date(hora.almocoIn)) : "" }`,
        `${formatHour(hora.almocoOut)}${hora.almocoOut ? "\n" + formatDateToDDMMYYYY(new Date(hora.almocoOut)) : "" }`,
        `${formatHour(hora.checkOut)}${hora.checkOut ? "\n" + formatDateToDDMMYYYY(new Date(hora.checkOut)) : "" }`,
        formatDecimalToHours(calculateHoursWorked(hora.checkIn, hora.checkOut, hora.almocoIn, hora.almocoOut)),
        formatDecimalToHours(calculateLunchDuration(hora.almocoIn, hora.almocoOut)),
        `${formatDecimalToHours(calculateInconsistency(hora.checkIn, hora.checkOut, hora.almocoIn, hora.almocoOut))}${formatDecimalToHours(calculateInconsistency(hora.checkIn, hora.checkOut, hora.almocoIn, hora.almocoOut))[0] === '-' ? "\n(Dívida)" : ""}`,
      ]);
  
      (doc as any).autoTable({
        startY: yOffset + 20,
        head: [tableHeaders],
        body: tableData,
        theme: "grid",
        styles: { fontSize: 8, halign: "center", valign: 'middle' },
      });
  
      // Atualiza o yOffset para a próxima seção
      yOffset = (doc as any).lastAutoTable.finalY + 10;
  
      // Adiciona uma nova página se necessário
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 10;
      }
    });
  
    // Salva o PDF no final
    doc.save(`Relatorio_Filtrado_${formatDateToDDMMYYYY(newStartDate)}_a_${formatDateToDDMMYYYY(newEndDate)}.pdf`);
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
          <h2>Selecione um funcionário para gerar um relatório relativo:</h2>
          <input
            type="text"
            className={styles.SearchBar}
            placeholder="Pesquisar funcionário"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className={styles.containerScroll}>
            <div className={styles.scrollbarBox}>
              {filteredFuncionarios.sort((a, b) => Number(a.id) - Number(b.id)).map((func) => (
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
          
            <button className={styles.CheckButton2} onClick={generateGeneralPDF}>
              Gerar Relatório Geral
            </button>
            <br/>
            <br/>
            <h1>FILTRAGEM DE RELATÓRIO</h1>
            <h2>Para filtragem de relatório, insira nos campos abaixo as datas de<br/>início e fim, respectivamente, do período desejado.</h2>
            <div className={styles.dateFilters}>
              <input
                type="date"
                className={styles.Date}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                className={styles.Date}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button className={styles.CheckButton2} onClick={generateFilteredPDF}>
              Gerar Relatório Filtrado
            </button>
        </div>
        <button className={styles.ExitButton} onClick={() => router.push("/rh")}>
          Voltar
        </button>
      </main>
    </div>
  );
}

// Funções auxiliares
const formatHour = (time: string | null) => {
  if(time){
    return time.slice(11, 16);
  }else{
    return "FALTA";
  } 
}
    

const formatDateToDDMMYYYY = (date: Date): string => {
  const dateBr = new Date(formatUTCtoBrasilia(date));

  const day = String(dateBr.getUTCDate()).padStart(2, '0'); // Adiciona 0 à esquerda se o dia for menor que 10
  const month = String(dateBr.getUTCMonth() + 1).padStart(2, '0'); // Meses começam do 0, então somamos 1
  const year = dateBr.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

function formatUTCtoBrasilia(date: Date) {
    // Ajusta para o fuso horário de Brasília (UTC-3)
    const offsetBrasilia = -3; // Horário padrão UTC-3
    const novaData = new Date(date.getTime() + offsetBrasilia * 60 * 60 * 1000);

    // Formata novamente para o formato ISO sem alterar o padrão
    const ano = novaData.getUTCFullYear();
    const mes = String(novaData.getUTCMonth() + 1).padStart(2, '0');
    const dia = String(novaData.getUTCDate()).padStart(2, '0');
    const horas = String(novaData.getUTCHours()).padStart(2, '0');
    const minutos = String(novaData.getUTCMinutes()).padStart(2, '0');
    const segundos = String(novaData.getUTCSeconds()).padStart(2, '0');
    const milissegundos = String(novaData.getUTCMilliseconds()).padStart(3, '0');

    return `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}.${milissegundos}`;
}

const calculateHoursWorked = (checkIn: string | null, checkOut: string | null, almocoIn: string | null, almocoOut: string | null) => {
  if (!checkIn || !checkOut) return 0;
  return (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 3600000 - calculateLunchDuration(almocoIn, almocoOut);
};

const calculateLunchDuration = (almocoIn: string | null, almocoOut: string | null) => {
  if (!almocoIn || !almocoOut) return 0;
  return (new Date(almocoOut).getTime() - new Date(almocoIn).getTime()) / 3600000;
};

const calculateInconsistency = (checkIn: string | null, checkOut: string | null, almocoIn: string | null, almocoOut: string | null) => {
  const worked = calculateHoursWorked(checkIn, checkOut, almocoIn, almocoOut);
  const expected = -8;
  const inconsistency = expected + worked;
  return inconsistency;
};

const formatDecimalToHours = (decimalHours: number): string => {
  const isNegative = decimalHours < 0;
  decimalHours = Math.abs(decimalHours);

  let hours = Math.floor(decimalHours);
  let minutes = Math.round((decimalHours - hours) * 60);

  if(minutes === 60){
    minutes = 0;
    hours += 1;
  }

  const formattedTime = `${isNegative ? '-' : ''}${hours}h${minutes.toString().padStart(2, '0')}m`;

  return formattedTime;
};

const calculateTotalHours = (horas: any[]) =>
  formatDecimalToHours(
    horas.reduce((sum, h) => sum + calculateHoursWorked(h.checkIn, h.checkOut, h.almocoIn, h.almocoOut), 0)
  );

const calculateTotalInconsistency = (horas: any[]) =>
  formatDecimalToHours(
    horas.reduce((sum, h) => sum + calculateInconsistency(h.checkIn, h.checkOut, h.almocoIn, h.almocoOut), 0)
  );
