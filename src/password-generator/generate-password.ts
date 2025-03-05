const randomFn = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
}

function getRandomNumberInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomLower() {
  return String.fromCharCode(getRandomNumberInRange(97, 122))
}

function getRandomUpper() {
  return String.fromCharCode(getRandomNumberInRange(65, 90))
}

function getRandomNumber() {
  return String.fromCharCode(getRandomNumberInRange(48, 57))
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]<>/,."
  return symbols[Math.floor(Math.random() * symbols.length)]
}

export default function generatePassword(
  lower = true,
  upper = true,
  number = true,
  symbol = true,
  length = 16
) {
  const types = { lower, upper, number, symbol }
  const typesArr = []

  for (const [key, value] of Object.entries(types)) {
    if (value) typesArr.push(key)
  }

  if (!typesArr.length) return ""

  let password = ""
  let typesIndex = 0

  for (let i = 0; i < length; i++) {
    password += randomFn[typesArr[typesIndex] as keyof typeof randomFn]()
    typesIndex++

    if (typesIndex > typesArr.length - 1) typesIndex = 0
  }

  return password
}
