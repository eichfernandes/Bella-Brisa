
import React from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const userCode = '0000'; // Este código pode ser dinâmico, vindo de um contexto ou API.

  const handleNavigation = () => {
    if (userCode === '0000') {
      router.push('/rh'); // Navega para a página de RH
    } else if (userCode === '0001') {
      router.push('/admin'); // Navega para a página de Administração
    } else {
      alert('Código de usuário inválido!');
    }
  };

  return (
    <div className="container">
      <h1>Bem-vindo</h1>
      <p>Você será direcionado com base no seu código.</p>
      <button onClick={handleNavigation} className="inputButton">
        Ir para a Página
      </button>
    </div>
  );
};

export default Page;
