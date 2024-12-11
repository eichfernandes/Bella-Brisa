"use client";

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import styles from "../page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const cpf = formData.get('cpf');
    const senha = formData.get('senha');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpf, senha }),
    });

    if (response.ok) {
      router.push('/profile');
    } else {
      setErrorMessage('Erro de Login: Identificador ou Senha incorretos.');
    }
  }

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
          <h1>LOGIN</h1>
          <form onSubmit={handleSubmit} className={styles.ElementsBox}>
            <input
              className={styles.input}
              type="text"
              name="cpf" // Alterado para coincidir com o FormData
              placeholder="CPF"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            /><br />
            <input
              className={styles.input}
              type="password"
              name="senha"
              placeholder="Senha"
              required
            />
            <button type="submit" className={styles.inputButton}>
              Entrar
            </button>
            {errorMessage && (
              <span className={styles.errorText}>
                <br /><br />{errorMessage}
              </span>
            )}
          </form>
        </div>
      </main>

    </div>
  );
}
