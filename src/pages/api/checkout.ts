import { stripe } from '@/lib/stripe'
import { checkoutResponseProps } from '@/types/checkoutResponse'
import type { NextApiRequest, NextApiResponse } from 'next'

interface errorProps {
  code: string
  rawType: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { address, email, name, phone, card, amount } =
    req.body as checkoutResponseProps

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
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
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'brl',
      payment_method_types: ['card'],
      payment_method: payment.id,
      customer: customer.id,
      confirm: true,
      receipt_email: email,
      shipping: {
        address,
        name,
        phone,
      },
    })

    // chamar api client

    return res.status(201).json({
      paymentIntent,
    })
  } catch (error) {
    const { rawType } = error as errorProps
    return res.status(400).json({ message: rawType })
  }
}
