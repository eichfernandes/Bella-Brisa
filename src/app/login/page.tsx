import Image from "next/image";
//import styles from "../page.module.css";

export default function Login() {
  return (
    <div className="page">
      <main className="main">
        <div className="container">
          <h1>Login</h1>
          <input type="text" placeholder="ID de Login"/>
          <input type="password" placeholder="Senha"/>
        </div>
      </main>
      <footer className="footer">
        <Image className="logo" src="/bellabrisa.svg" alt="Next.js logo" width={180}height={50} priority/>
      </footer>
    </div>
  );
}