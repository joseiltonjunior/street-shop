import { stripe } from '@/lib/stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { newPurchase } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!newPurchase) {
    return res.status(400).json({ error: 'Price not found' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  // const cancelUrl = `${process.env.NEXT_URL}/`

  console.log(newPurchase)

  // const dadosCartao = {
  //   number: '4242424242424242',
  //   exp_month: 12,
  //   exp_year: 2024,
  //   cvc: '123',
  //   name: 'Fulano de Tal',
  // }

  console.log(newPurchase)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 0,
    currency: 'brl',
    // payment_method_data:{

    // }
    // payment_method: { card: {} },
    // payment_method_types: ['card'],
    description: 'Compra de teste',
    return_url: successUrl,
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

    // line_items: newPurchase,
  })

  // const confirmPayment = await stripe.paymentIntents.confirm(paymentIntent.id, {
  //   payment_method: {
  //     card: {
  //       number: '4242424242424242', // Número do cartão de teste
  //       exp_month: 12, // Mês de expiração do cartão
  //       exp_year: 2023, // Ano de expiração do cartão
  //       cvc: '123', // Código de verificação do cartão
  //     },
  //   },
  // })

  // console.log(paymentIntent.id)

  // const confirmPayment = await stripe.paymentIntents.confirm(paymentIntent.id, {
  //   receipt_email: 'joseiltonjuniortech@gmail.com',
  //   shipping: {
  //     address: {
  //       city: 'Recife',
  //       country: 'Brasil',
  //       line1: 'Rua Iolanda Rodrigues Sobral',
  //       postal_code: '50690220',
  //       state: 'PE',
  //     },
  //     name: 'Junior Ferreira',
  //     phone: '81999999999',
  //   },
  // })

  // const checkoutSession = await stripe.checkout.sessions.create({
  //   success_url: successUrl,
  //   cancel_url: cancelUrl,
  //   mode: 'payment',
  //   line_items: newPurchase,
  //   shipping_address_collection: { allowed_countries: ['BR'] },
  //   phone_number_collection: {
  //     enabled: true,
  //   },
  // })

  return res.status(201).json({
    paymentIntent,
    // checkoutUrl: checkoutSession.url,
  })
}
