import { stripe } from '@/lib/stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { address, email, name, phone, card, amount } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const payment = await stripe.paymentMethods.create({
    billing_details: { address, email, name, phone },
    type: 'card',
    card,
  })

  const customer = await stripe.customers.create({
    address,
    name,
    email,
    phone,
    shipping: { address, name, phone },
  })

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'brl',
    payment_method_types: ['card'],
    payment_method: payment.id,
    customer: customer.id,
    confirm: true,
    shipping: {
      address,
      name,
      phone,
    },
  })

  return res.status(201).json({
    paymentIntent,
  })
}
