import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Geração do relatório e envio
    res.status(200).json({ message: "Relatório enviado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar o relatório." });
  }
}
