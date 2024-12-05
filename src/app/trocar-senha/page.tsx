"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../page.module.css";

export default function TrocarSenha() {
  const [OldPassword, setOldPass] = useState("");
  const [NewPassword, setNewPass] = useState("");
  const [NewPasswordConfirm, setNewPassConfirm] = useState("");
  const router = useRouter();
  const handleBack = () => history.back(); // Redireciona para a página de RH

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
            <h1>TROCAR SENHA</h1><br/>
            <div className={styles.ElementsBox}>
                <h2>Confirmação de Senha:</h2>
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Insira sua Senha atual"
                    value={OldPassword}
                    onChange={(e) => setOldPass(e.target.value)}
                /><br/><br/>
                <h2>Nova Senha:</h2>
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Insira a Senha nova"
                    value={NewPassword}
                    onChange={(e) => setNewPass(e.target.value)}
                /><br/>
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Repita a Senha nova"
                    value={NewPasswordConfirm}
                    onChange={(e) => setNewPassConfirm(e.target.value)}
                />
                <button className={styles.inputButton}>
                Alterar Senha
                </button>
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
