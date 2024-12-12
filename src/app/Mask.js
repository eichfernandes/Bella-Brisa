export default function MaskedInput({ maskFunction, value, onChange, ...props }) {
  const handleChange = (event) => {
    const rawValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const maskedValue = maskFunction(rawValue); // Aplica a máscara
    if (onChange) {
      onChange({ target: { value: maskedValue } }); // Passa o valor mascarado para o componente pai
    }
  };

  return (
    <input
      {...props}
      value={value} // Usa o valor controlado pelo componente pai
      onChange={handleChange}
    />
  );
}

// Máscara CPF: ###.###.###-##
export const cpfMask = (value) => {
  return value
    .replace(/(\d{3})(\d)/, '$1.$2') // Primeiro ponto
    .replace(/(\d{3})(\d)/, '$1.$2') // Segundo ponto
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Traço
};

// Máscara telefone: (##) #####-####
export const phoneMask = (value) => {
  return value
    .replace(/(\d{2})(\d)/, '($1) $2') // Parênteses
    .replace(/(\d{5})(\d)/, '$1-$2'); // Traço
};

// Máscara ID: ####
export const idMask = (value) => {
  return value.replace(/(\d{4})(\d)/, '$1'); // Apenas garante até 4 dígitos
};
