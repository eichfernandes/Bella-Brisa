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
                <Horas/>
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

export function Horas() {
    return(
        <div className={styles.TextBox}>
            Horário de Intervalo: 13:00 - 14:00<br/><br/>
            Fim do Expediente: 18:00<br/><br/>
        </div>
    );
} // Editar para que ao inicio do expediente seja apresentada a previsão de intervalo e saída
// ao entrar em intervalo mostrar a previsao de fim do intervalo
// e ao retornar do intervalo  a previsão de fim do expediente
// O calculo da previsão deve ser feito com base na hora de cada checkin.
