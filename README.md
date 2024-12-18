# Sistema de Gerenciamento de Ponto - Hotel Bella Brisa

## Resumo
**Objetivo do Sistema:**
Gerenciamento de carga horária dos funcionários do hotel Bella Brisa.

**Escopo:**
- Horários de entrada, saída e intervalo.
- Geração de relatórios relacionados a esses itens.

**Benefícios:**
- Controle otimizado do cumprimento de horas.
- Identificação de faltas e excessos.

---

## Descrição do Sistema

### Funcionalidades Principais
- Registro de ponto (entrada, saída, intervalos).
- Geração de relatórios filtrados em períodos.
- Alerta de irregularidades (ex.: excesso ou falta na carga horária).

### Público-Alvo
- Funcionários de RH.
- Dono do hotel.

---

## Requisitos

### Requisitos Funcionais

#### Funcionários:
1. Realizar login.
2. Registrar entrada, intervalo, retorno do intervalo e saída.
3. Visualizar previsão de horários dentro do turno (intervalo e saída).

#### RH/Admin:
1. Realizar login.
2. Gerar relatórios filtrados por período.
3. Receber relatórios mensais automaticamente.
4. Alterar lista de e-mails para relatórios.
5. Recuperar senha esquecida.
6. Registrar novos funcionários no sistema.

### Requisitos Não Funcionais
1. Sistema acessível somente na empresa para funcionários.
2. Acesso remoto para RH/Admin.
3. Interface responsiva para uso em dispositivos móveis.

### Requisitos Técnicos
- **Tecnologias:** HTML, CSS, JavaScript, NextJS.
- **Banco de Dados:** MongoDB.
- **Hospedagem:**
  - Local para funcionários.
  - Online via Vercel para RH/Admin.

---

## Funcionalidades e Interações

### Funcionários

- **Check-in:**
  - Registra o início do expediente.
  - Exibe previsão de horários (intervalo e saída).

- **Intervalo:**
  - Registra o início do período de intervalo.
  - Exibe previsão para retorno.

- **Retorno do Intervalo:**
  - Registra o retorno ao expediente.
  - Exibe previsão para término do expediente.

- **Check-out:**
  - Registra o fim do expediente.

- **Alterar Senha:**
  - Permite alterar a senha usada no login.

### RH/Admin

- **Relatórios:**
  - Gerar relatórios de períodos específicos.
  - Relatório mensal enviado automaticamente por e-mail.

- **Gerenciamento de Funcionários:**
  - Cadastrar, editar ou excluir funcionários.

- **Alterar Senha:**
  - Permite alterar a senha usada no login.

---

## Manual de Uso

### Funcionários

1. **Login:**
   - Insira ID/CPF e senha.
   - Clique em "Entrar".

2. **Registro de Ponto:**
   - Check-in: Clique em "Check-in".
   - Intervalo: Clique em "Intervalo".
   - Retorno do Intervalo: Clique em "Retornar".
   - Check-out: Clique em "Check-out".

3. **Alterar Senha:**
   - Acesse a opção "Trocar Senha".
   - Insira a senha atual, nova senha e confirmação.
   - Clique em "Alterar Senha".

4. **Recuperar Senha:**
   - Clique em "Esqueci Minha Senha".
   - Insira ID/CPF.
   - Receba uma nova senha por e-mail.

### RH/Admin

1. **Baixar Relatórios de Funcionário:**
   - Acesse "Gerar Relatórios".
   - Clique no funcionário escolhido.

   **Baixar Relatórios Gerais:**
   - Acesse "Gerar Relatórios".
   - Clique em "Gerar Relatório Geral".

   **Baixar Relatórios:**
   - Acesse "Gerar Relatórios".
   - Insira datas ou deixe em branco para relatório do último mês.
   - Clique em "Gerar Relatório Filtrado".

2. **Gerenciar Funcionários:**
   - Acesse "Controle de Funcionários".
   - Escolha entre cadastrar, editar ou excluir.

   - **Cadastrar:**
     - Insira Nome, ID, CPF, e-mail e senha.
     - Clique em "Cadastrar".

   - **Editar:**
     - Clique no nome do funcionário.
     - Atualize as informações desejadas.
     - Clique em "Editar".

   - **Excluir:**
     - Clique no nome do funcionário.
     - Clique em "Excluir" (operação irreversível).

---

## Observação
- Para mais informações, consulte a documentação técnica completa.
