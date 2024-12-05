"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../page.module.css";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleEsqueciSenha = () => router.push("/esqueci-minha-senha");

  const handleLogin = () => {
    if (userId === "0000" && password === "senhaRh") {
      router.push("/rh"); // Redireciona para a página de RH e como a página de RH e de ADMIN é a mesma, então vou redirecionar para a mesma pág.
    } else if (userId === "0001" && password === "senhaAdm") {
      router.push("/rh"); // Redireciona para a página de RH
    } else if (userId === "0002" && password === "0002") { // Apenas pra teste, #TODO lógica pra funcionário logar.
      router.push("/ponto");
    } else {
      alert("ID ou senha incorretos!"); // Alerta caso os dados sejam inválidos
    }
  };

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
          <h1>LOGIN</h1>
          <div className={styles.ElementsBox}>
            <input
              className={styles.input}
              type="number"
              placeholder="ID ou CPF"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            /><br/>
            <input
              className={styles.input}
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.inputButton} onClick={handleLogin}>
              Entrar
            </button>
            <span className={styles.errorText} // Fazer este texto aparecer somente se o login falhar
            ><br/><br/>Erro de Login: Identificador ou Senha incorretos.</span>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <input
          type="button"
          className={styles.footerButton}
          onClick={handleEsqueciSenha}
          value="Esqueci Minha Senha"
        />
      </footer>
    </div>
  );
}
