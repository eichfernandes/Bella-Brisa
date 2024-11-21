
import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Seu Projeto',
  description: 'Descrição do seu projeto',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
