"use client";

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import styles from"../page.module.css"

export default function LoginPage() {
  const router = useRouter();

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
      alert('CPF ou senha incorretos!');
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
          style={{ marginBottom: 15 }}
          priority
        />
      </header>
      <main className={styles.main}>
        <div className={styles.container} style={{ marginBottom: 80 }}>
          <h1>LOGIN</h1>
          <form onSubmit={handleSubmit} className={styles.ElementsBox}>
            <input
              className={styles.input}
<<<<<<< HEAD
              type="textfield"
              placeholder="Identificador"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            /><br/>
=======
              type="text"
              name="cpf"
              placeholder="ID ou CPF"
              required
            />
            <br />
>>>>>>> ff6890f (Adição da lógica para conexão do BD)
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
<<<<<<< HEAD
            <span className={styles.errorText} hidden // Fazer este texto aparecer somente se o login falhar
            ><br/><br/>Erro de Login: Identificador ou Senha incorretos.</span>
          </div>
=======
            <br />
            <span className={styles.errorText}>
              <br />
              <br /> Erro de Login: Identificador ou Senha incorretos.
            </span>
          </form>
>>>>>>> ff6890f (Adição da lógica para conexão do BD)
        </div>
      </main>
      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.footerButton}
          onClick={() => router.push("/esqueci-minha-senha")}
        >
          Esqueci Minha Senha
        </button>
      </footer>
    </div>
  );
}
