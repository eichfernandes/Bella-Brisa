import { useState } from 'react';

export default function MaskedInput({ maskFunction, ...props }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    const rawValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const maskedValue = maskFunction(rawValue); // Aplica a máscara
    setValue(maskedValue);
  };

  return (
    <input
      {...props}
      value={value}
      onChange={handleChange}
    />
  );
}

// Formato CPF: ###.###.###-##
export const cpfMask = (value) => {
    return value
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
};

// Formato telefone: (##) #####-####
export const phoneMask = (value) => {
    return value
        .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona o parêntese
        .replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona o traço
};

// Formato ID: ####
export const idMask = (value) => {
    return value
        .replace(/(\d{4})(\d)/, '$1$2') // Praticamente não faz nada
};