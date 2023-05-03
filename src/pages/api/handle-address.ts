import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //   const { cep } = req.body

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const address = await fetch('/viacep.com.br/ws/01001000/json/')

  return res.status(200).json({
    address,
  })
}
