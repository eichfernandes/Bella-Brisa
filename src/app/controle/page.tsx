"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../page.module.css";

export default function Gerenciamento() {
  const router = useRouter();
  const handleBack = () => router.push("/rh");
  const handleCadastro = () => router.push("/cadastro-funcionario");

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
          <h1>GERENCIAMENTO DE<br/>FUNCIONÁRIOS</h1>
          <h2>Selecione um funcionário para editar seus dados:</h2>
          <input type="text" className={styles.SearchBar} placeholder="Pesquisa"/>
          <div className={styles.containerScroll}>
            <div className={styles.scrollbarBox}>
              <Func/>
              <Func/>
              <Func/>
              <Func/>
              <Func/>
              <Func/>
              <Func/>
              <Func/>
              <Func/>
              <Func/>
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
          onClick={handleBack} // Redireciona ao clicar
        />
      </footer>
    </div>
  );
}

export function Func(){
  const router = useRouter();
  const handleEdit = () => router.push("/editar-funcionario"); // Configurar para redirecionar para a tela de edição de funcionário
  
  return(
    <button className={styles.ClickableElementList} onClick={handleEdit}>
      <span>Rafael Eich Fernandes</span>
      <span>ID 0002</span>
    </button>
  );
}