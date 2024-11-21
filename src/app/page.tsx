"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const WelcomePage = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/login'); // Navega para a página de Login
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bem-vindo</h1>
      <p>Faça login para acessar o sistema.</p>
      <button 
        onClick={handleNavigation} 
        className="inputButton" 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Ir para o Login
      </button>
    </div>
  );
};

export default WelcomePage;
