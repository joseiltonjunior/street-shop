export function formatPhone(phoneNumber: string): string {
  const digitsOnly = phoneNumber.replace(/\D/g, '')

  if (digitsOnly.length > 11) {
    const ddd = digitsOnly.slice(2, 4)

    const phoneNumberDigits = digitsOnly.slice(4, 13)

    return `(${ddd}) ${phoneNumberDigits.slice(0, 5)}-${phoneNumberDigits.slice(
      5,
    )}`
  } else {
    const ddd = digitsOnly.slice(0, 2)
    const phoneNumberDigits = digitsOnly.slice(2)

    return `(${ddd}) ${phoneNumberDigits.slice(0, 4)}-${phoneNumberDigits.slice(
      4,
    )}`
  }
}
