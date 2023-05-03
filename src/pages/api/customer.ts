import { stripe } from '@/lib/stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { newCustomer } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const customer = await stripe.customers.create({
    // address: {
    //   city: 'Recife',
    //   country: 'Brasil',
    //   line1: 'Rua Iolanda Rodrigues Sobral',
    //   postal_code: '50690220',
    //   state: 'PE',
    // },
    name: newCustomer.name,
    email: newCustomer.email,
    phone: newCustomer.phone,
  })

  return res.status(201).json({
    customer,
  })
}
