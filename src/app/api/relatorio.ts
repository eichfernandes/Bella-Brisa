import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { usersCollection } from "@/db/db"; // Simulação da collection MongoDB

// Definição de interfaces para os dados
interface IHour {
  data: string;
  checkIn?: Date | null;
  checkOut?: Date | null;
  almocoIn?: Date | null;
  almocoOut?: Date | null;
}

interface IUser {
  nome: string;
  cpf: string;
  email: string;
  Horas: IHour[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1. Buscar os dados dos usuários no banco de dados
    const users: IUser[] = await usersCollection.find<IUser>({}).toArray();


    // 2. Gerar o HTML do relatório
    const reportHTML = `
      <h1>Relatório Mensal</h1>
      <table border="1" cellspacing="0" cellpadding="5">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Horas Trabalhadas</th>
          </tr>
        </thead>
        <tbody>
          ${users
            .map((user) => {
              const horasFormatadas = user.Horas.map(
                (h) => `
                Data: ${h.data},
                CheckIn: ${h.checkIn?.toISOString() || "N/A"},
                CheckOut: ${h.checkOut?.toISOString() || "N/A"},
                Almoço In: ${h.almocoIn?.toISOString() || "N/A"},
                Almoço Out: ${h.almocoOut?.toISOString() || "N/A"}`
              ).join("<br>");

              return `
                <tr>
                  <td>${user.nome}</td>
                  <td>${user.cpf}</td>
                  <td>${user.email}</td>
                  <td>${horasFormatadas}</td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    `;

    // 3. Configuração do Nodemailer para envio de e-mail
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // Exemplo: smtp.gmail.com
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false, // true para 465, false para outros
      auth: {
        user: process.env.EMAIL_USER, // E-mail remetente
        pass: process.env.EMAIL_PASS, // Senha do e-mail ou App Password
      },
    });

    // 4. Envio do e-mail
    await transporter.sendMail({
      from: `"Relatório Mensal" <${process.env.EMAIL_USER}>`,
      to: "admin@example.com", // Destinatário
      subject: "Relatório Mensal de Usuários",
      html: reportHTML, // Relatório em HTML
    });

    // 5. Resposta de sucesso
    res.status(200).json({ message: "Relatório enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao gerar/enviar o relatório:", error);
    res.status(500).json({ error: "Erro ao gerar/enviar o relatório." });
  }
}
