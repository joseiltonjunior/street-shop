import clientAPI from '@/services/client-api'
import { AxiosError } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token not found' })
  }

  try {
    const response = await clientAPI.post(
      '/token/refresh',
      {},
      {
        headers: { Cookie: `refreshToken=${refreshToken}` },
      },
    )

    const { data } = response

    return res.status(200).json({
      token: data.token,
    })
  } catch (error) {
    const { response, message } = error as AxiosError

    if (response?.status) {
      res.status(response.status).json({ message: response.statusText })
    }

    res.status(500).json({ message })
  }
}
