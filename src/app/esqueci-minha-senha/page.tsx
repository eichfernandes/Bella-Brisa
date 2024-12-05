"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../page.module.css";
import MaskedInput, { cpfMask, idMask } from '../Mask';

export default function EsqueciMinhaSenha() {
  const router = useRouter();
  const handleBack = () => router.push("/login"); // Redireciona para a página de Controle

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
            <h1>ESQUECI MINHA SENHA</h1><br/>
            <h2>Insira seu ID ou CPF abaixo:</h2>
          
          <div className={styles.ElementsBox}>
                <input
                    className={styles.input2}
                    type="number"
                    placeholder="Identificação"
                /><br/>
                <button className={styles.inputButton2}>
                    Enviar
                </button>
                
                <span // Fazer este texto aparecer somente se a opção de Enviar for clicada e o Email existe no Banco de Dados
                ><br/><br/>Uma nova senha foi enviada ao email<br/>
                vinculado a sua conta.</span>
                <span className={styles.errorText} // Fazer este texto aparecer somente se a opção de Enviar for clicada e o Email não existir
                ><br/><br/>Erro: Email não vinculado a uma conta.</span>
            </div>
        </div>
        <input
          type="button"
          className={styles.ExitButton}
          value="Voltar"
          onClick={handleBack} // Redireciona ao clicar
        />
      </main>
    </div>
  );
}