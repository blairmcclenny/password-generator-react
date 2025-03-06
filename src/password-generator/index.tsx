import { FormEvent, useState } from "react"
import generatePassword from "./generate-password"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([16])

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
        Number(formData.get("password-length"))
      )
    )
  }

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(password)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">
          Password Generator
        </CardTitle>
        <CardDescription>Generate a Secure Password</CardDescription>
        <div className="flex gap-2 justify-between mt-4">
          <Input name="password" value={password} readOnly />
          <Button variant="secondary" onClick={handleCopyClick}>
            <Copy strokeWidth={1} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          id="password-settings"
          className="space-y-2"
        >
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span>Length</span>
              <Input
                readOnly
                name="password-length-display"
                value={length[0].toString()}
                size={2}
                className="w-fit pointer-events-none"
              />
            </div>
            <Slider
              id="password-length"
              name="password-length"
              min={8}
              max={32}
              value={length}
              onValueChange={(value) => setLength(value)}
              step={1}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="uppercase">Uppercase Letters</label>
            <Checkbox id="uppercase" name="uppercase" defaultChecked={true} />
          </div>
          <div className="flex justify-between">
            <label htmlFor="lowercase">Lowercase Letters</label>
            <Checkbox id="lowercase" name="lowercase" defaultChecked={true} />
          </div>
          <div className="flex justify-between">
            <label htmlFor="numbers">Numbers</label>
            <Checkbox id="numbers" name="numbers" defaultChecked={true} />
          </div>
          <div className="flex justify-between">
            <label htmlFor="symbols">Symbols</label>
            <Checkbox id="symbols" name="symbols" defaultChecked={true} />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="password-settings" className="w-full">
          Generate Password
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PasswordGenerator
