"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../page.module.css";

export default function Gerenciamento() {

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
        <div className={styles.container} style={{ marginBottom: 80 }}>
          <h1>GERENCIAMENTO DE<br/>FUNCIONÁRIOS</h1><br/>
          <h2>Selecione um funcionário para editar seus dados:</h2><br/>
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
          </div><br/>

          <button className={styles.inputButton}>
            Voltar
          </button>
        </div>
      </main>
    </div>
  );
}

export function Func(){
  return(
    <div className={styles.ClickableElementList}>
      <span>Teste da Silva Filho Junior Correa da Silva</span>
      <span>ID 0002</span>
    </div>
  );
}