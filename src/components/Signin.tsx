import { useEffect, useId, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoginMutation } from '@/redux/features/auth/auth.api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { LoaderCircle } from 'lucide-react'
import WallexLogo from '@/assets/wallex-logo'

import { useDispatch } from 'react-redux'
import { openModal } from '@/redux/features/modal/modalSlice'

export default function Signin() {
  const id = useId()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [inputData, setInputData] = useState<{
    email: string
    password: string
  }>({
    email: 'admin@gmail.com',
    password: 'admin_50@/50',
  })

  const dispatch = useDispatch()

  const handleRegisterClick = () => {
    setIsModalOpen(false)
    dispatch(openModal())
  }

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    console.log(inputData)
  }, [inputData])

  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setInputData((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = inputData
    try {
      console.log('handle submit')
      const res = await login(data).unwrap()

      console.log('res', res)

      if (res.success) {
        toast.success('Logged in successfully')
        navigate('/')
      }
    } catch (err: any) {
      console.error(err)

      if (err.data.message === 'Password does not match') {
        toast.error('Invalid credentials')
      }

      if (err.data.message === 'User is not verified') {
        toast.error('Your account is not verified')
        navigate('/verify', { state: data.email })
      }
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} >
      <DialogTrigger asChild>
        <Button variant="outline">Sign in</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex shrink-0 items-center justify-center mb-2"
            aria-hidden="true"
          >
            <WallexLogo />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Welcome back</DialogTitle>
            <DialogDescription className="sm:text-center">
              Enter your credentials to login to your account.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                name="email"
                placeholder="hi@yourcompany.com"
                type="email"
                value={inputData.email}
                onChange={handleChangeInputData}
                required
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                name="password"
                placeholder="Enter your password"
                type="password"
                value={inputData.password}
                onChange={handleChangeInputData}
                required
              />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id={`${id}-remember`} />
              <Label
                htmlFor={`${id}-remember`}
                className="text-muted-foreground font-normal"
              >
                Remember me
              </Label>
            </div>
            <a className="text-sm underline hover:no-underline" href="#">
              Forgot password?
            </a>
          </div>
          <div className="text-center">
            Have not any account?{' '}
            <button onClick={handleRegisterClick}>
              <a className="text-sm underline hover:no-underline" href="#">
                Register now
              </a>
            </button>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Sign in'}
          </Button>
        </form>

        <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
          <span className="text-muted-foreground text-xs">Or</span>
        </div>

        <Button variant="outline">Login with Google</Button>
      </DialogContent>
    </Dialog>
  )
}
