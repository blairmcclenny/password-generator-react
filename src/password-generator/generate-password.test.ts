import { test, expect } from "vitest"
import generatePassword from "./generate-password"

test("password has length of 24 characters when length is 24", () => {
  expect(generatePassword(true, true, true, true, 24)).toHaveLength(24)
})

test("password has length of 0 characters when all character types are false", () => {
  expect(generatePassword(false, false, false, false, 24)).toHaveLength(0)
})

// test if slider controls number display
