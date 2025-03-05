import { FormEvent, useState } from "react"
import generatePassword from "./generate-password"

function PasswordGenerator() {
  const [password, setPassword] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    setPassword(
      generatePassword(
        formData.has("lowercase"),
        formData.has("uppercase"),
        formData.has("numbers"),
        formData.has("symbols"),
        Number(formData.get("length"))
      )
    )
  }

  return (
    <div>
      <h2>Password Generator</h2>
      <div>
        <span>{password}</span>
        <button></button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="length">
            Password length <span>16</span>
          </label>
          <input
            type="range"
            id="length"
            name="length"
            min="8"
            max="32"
            defaultValue={16}
          />
        </div>
        <div>
          <label htmlFor="uppercase">Include Uppercase Letters</label>
          <input
            type="checkbox"
            id="uppercase"
            name="uppercase"
            defaultChecked={true}
          />
        </div>
        <div>
          <label htmlFor="lowercase">Include Lowercase Letters</label>
          <input
            type="checkbox"
            id="lowercase"
            name="lowercase"
            defaultChecked={true}
          />
        </div>
        <div>
          <label htmlFor="numbers">Include Numbers</label>
          <input
            type="checkbox"
            id="numbers"
            name="numbers"
            defaultChecked={true}
          />
        </div>
        <div>
          <label htmlFor="symbols">Include Symbols</label>
          <input
            type="checkbox"
            id="symbols"
            name="symbols"
            defaultChecked={true}
          />
        </div>
        <button type="submit">Generate Password</button>
      </form>
    </div>
  )
}

export default PasswordGenerator
