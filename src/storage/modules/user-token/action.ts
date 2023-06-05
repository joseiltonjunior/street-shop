export function setToken(token: string) {
  return {
    type: '@user/SET_TOKEN',
    payload: {
      token,
    },
  }
}
