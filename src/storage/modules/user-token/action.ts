export function setToken(token: string) {
  return {
    type: '@user/SET_TOKEN',
    payload: {
      token,
    },
  }
}

export function removeToken() {
  return {
    type: '@user/REMOVE_TOKEN',
  }
}
