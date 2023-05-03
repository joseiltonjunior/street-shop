import { stripe } from '@/lib/stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { paymentIntentId } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!paymentIntentId) {
    return res.status(400).json({ error: 'ID not found' })
  }

  console.log(paymentIntentId)

  const confirmPayment = await stripe.paymentIntents.confirm(paymentIntentId, {
    receipt_email: 'joseiltonjuniortech@gmail.com',
    shipping: {
      address: {
        city: 'Recife',
        country: 'Brasil',
        line1: 'Rua Iolanda Rodrigues Sobral',
        postal_code: '50690220',
        state: 'PE',
      },
      name: 'Junior Ferreira',
      phone: '81999999999',
    },
  })

  return res.status(201).json({
    confirmPayment,
    // checkoutUrl: checkoutSession.url,
  })
}
