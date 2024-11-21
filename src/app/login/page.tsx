import Image from "next/image";
import styles from "../page.module.css";

export default function Login() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image className={styles.logo} src="/bellabrisa.svg" alt="Next.js logo" width={80} height={80} style={{marginBottom: 15}} priority/>
        <div className={styles.container} style={{marginBottom: 80}}>
        {/* Adicionei um marginBottom para subir um pouco o bloco de login */}

          <h1>LOGIN</h1>

          <input className={styles.input} type="number" placeholder="ID de Login"/>

          <input className={styles.input} type="password" placeholder="Senha"/>
          
          <input className={styles.inputButton} type="button" placeholder="Senha" value="Entrar"/>
        </div>
      </main>
    </div>
  );
}