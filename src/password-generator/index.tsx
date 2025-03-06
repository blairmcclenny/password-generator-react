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
          <Input value={password} readOnly />
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
            <label
              htmlFor="length"
              className="flex items-center justify-between"
            >
              <span>Length</span>
              <Input
                type="number"
                name="length"
                defaultValue={16}
                min={8}
                max={32}
                className="w-fit"
              />
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
