import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { zipCode } = req.query

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const response = await axios.get(
      `https://viacep.com.br/ws/${zipCode}/json/`,
    )

    if (response.data.erro) {
      return res.status(400).json({ message: 'CEP inválido.' })
    }

    return res.status(200).json(response.data)
  } catch (error) {
    const { message } = error as Error
    return res.status(400).json({ message })
  }
}
