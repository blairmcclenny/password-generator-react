import { FormEvent, useState } from "react"
import generatePassword from "./generate-password"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

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
    <div className="p-4 bg-white rounded-lg min-w-xs">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Password Generator
      </h2>
      <div>
        <span>{password}</span>
        <button></button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="length">
            Password length <span>16</span>
          </label>
          <Slider
            id="length"
            name="length"
            min={8}
            max={32}
            defaultValue={[16]}
            step={1}
          />
        </div>
        <div>
          <label htmlFor="uppercase">Include Uppercase Letters</label>
          <Checkbox id="uppercase" name="uppercase" defaultChecked={true} />
        </div>
        <div>
          <label htmlFor="lowercase">Include Lowercase Letters</label>
          <Checkbox id="lowercase" name="lowercase" defaultChecked={true} />
        </div>
        <div>
          <label htmlFor="numbers">Include Numbers</label>
          <Checkbox id="numbers" name="numbers" defaultChecked={true} />
        </div>
        <div>
          <label htmlFor="symbols">Include Symbols</label>
          <Checkbox id="symbols" name="symbols" defaultChecked={true} />
        </div>
        <Button type="submit">Generate Password</Button>
      </form>
    </div>
  )
}

export default PasswordGenerator
