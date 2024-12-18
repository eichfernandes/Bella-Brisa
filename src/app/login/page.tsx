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

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cpf, senha }),
      });

      if (response.ok) {
        // Verifica se é ADM
        if(cpf === "0000" || cpf === "0001" || cpf === "00000000000100" || cpf === "00000000000100" ){
          router.push('/rh');
        }else{
          router.push('/ponto');
        }
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message || 'Erro de Login: Identificador ou Senha incorretos.');
      }
    } catch (error) {
      setErrorMessage('Erro inesperado ao tentar realizar o login.');
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
              name="cpf"
              placeholder="Identificador"
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
