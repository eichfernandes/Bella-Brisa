"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; // Import para redirecionamento
import styles from "../page.module.css";

export default function Previsao() {
    const router = useRouter(); // Hook para navegação
    const handleExit = () => router.push("/login"); // Redireciona para a página de login

  return(
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
                <h1>PREVISÃO</h1>
                <div className={styles.TextBox}>
                    Horário de Almoço: 13:00 - 14:00<br/><br/>
                    Fim do Expediente: 18:00<br/><br/>
                </div>
                
            </div>
            <input
            type="button"
            className={styles.ExitButton}
            value="Sair"
            onClick={handleExit}
            />
        </main>
    </div>
  );
}
