"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../page.module.css";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (userId === "0000" && password === "senhaRh") {
      router.push("/rh"); // Redireciona para a página de RH e como a página de RH e de ADMIN é a mesma, então vou redirecionar para a mesma pág.
    } else if (userId === "0001" && password === "senhaAdm") {
      router.push("/admin"); // Redireciona para a página de Admin
    } else if (userId === "0002" && password === "0002") { // Apenas pra teste, #TODO lógica pra funcionário logar.
      router.push("/ponto");
    } else {
      alert("ID ou senha incorretos!"); // Alerta caso os dados sejam inválidos
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/bellabrisa.svg"
          alt="Logo Bella Brisa"
          width={80}
          height={80}
          style={{ marginBottom: 15 }}
          priority
        />
        <div className={styles.container} style={{ marginBottom: 80 }}>
          <h1>LOGIN</h1>
          <input
            className={styles.input}
            type="number"
            placeholder="ID de Login"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
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
        </div>
      </main>
    </div>
  );
}
