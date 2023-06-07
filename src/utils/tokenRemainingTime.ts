import jwt from 'jsonwebtoken'

export function handleTokenRemainingTime(token: string) {
  const decodedToken: any = jwt.decode(token)
  const currentTime = Date.now() / 1000
  const expirationTime = decodedToken.exp
  const remainingTime = expirationTime - currentTime
  return remainingTime
}
