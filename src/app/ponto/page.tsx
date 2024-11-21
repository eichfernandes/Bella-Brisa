import Image from "next/image";
import styles from "../page.module.css";


export default function Ponto() {
    return (
      <div className={styles.page}>
        <header className={styles.header}><Image className={styles.logo} src="/bellabrisa.svg" alt="Next.js logo" width={70} height={70} style={{marginBottom: 15}} priority/></header>
        <main className={styles.main}>
          
          <div className={styles.container}>
          {/* Adicionei um marginBottom para subir um pouco o bloco de login */}
  
            <h1>Registro de Ponto</h1>
            <Comeco_do_Expediente/>
            
          </div>
          <input type="button" className={styles.ExitButton} value="Sair"/>
        </main>
      </div>
    );
  }

  export function Comeco_do_Expediente() {
    return(
        <div className={styles.PontoBox}>
            Clique em "Check-In" para iniciar o expediente:<br/>
            <input className={styles.CheckButton} id={styles.Checkin} type="button" value="Check-In"/>
        </div>
    );
  }

  export function Antes_Almoco() {
    return(
        <div className={styles.PontoBox}>
            Clique em "Almoço" para iniciar seu intervalo de almoço ou em "Check-Out" para encerrar o expediente:<br/>
            <input className={styles.CheckButton} id={styles.Almoco} type="button" value="Almoço"/>
            <input className={styles.CheckButton} id={styles.Checkout}
            type="button" value="Check-Out"/>
        </div>
    );
  }

  export function Durante_Almoco() {
    return(
        <div className={styles.PontoBox}>
            Você está em intervalo no momento. Clique em "Retornar" para encerrar o intervalo de almoço:<br/>
            <input className={styles.CheckButton} type="button" value="Retornar"/>
        </div>
    );
  }

  export function Depois_Almoco() {
    return(
        <div className={styles.PontoBox}>
            Clique em "Check-Out" para encerrar o expediente:<br/>
            <input className={styles.CheckButton} id={styles.Checkout} type="button" value="Check-Out"/>
            
        </div>
    );
  }