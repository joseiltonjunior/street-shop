import { stripe } from '@/lib/stripe'
import { userProps } from '@/types/user'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { address, email, name, phone } = req.body as userProps

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const customer = await stripe.customers.create({
    address,
    name,
    email,
    phone,
  })

  return res.status(201).json({
    customer,
  })
}
