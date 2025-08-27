import { useId, useState } from 'react'
import { useRegisterMutation } from '@/redux/features/auth/auth.api'

import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Password from './Password'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import Dropdown from './Dropdown'
import { LoaderCircle } from 'lucide-react'

import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '@/redux/store'
import { closeModal } from '@/redux/features/modal/modalSlice'
import WallexLogo from '@/assets/wallex-logo'

const registerSchema = z.object({
  name: z
    .string()
    .min(3, {
      error: 'Name is too short',
    })
    .max(50),
  email: z.email(),
  password: z.string().min(8, { error: 'Password is too short' }),
  role: z.string().refine((value) => value === 'Admin' || ''),
})

const Signup = () => {
  const id = useId()
  const navigate = useNavigate()

  const [inputData, setInputData] = useState<{
    name: string
    email: string
    password: string
    role: string
  }>({
    name: 'John Doe',
    email: 'admin@gmail.com',
    password: 'admin_50@/50',
    role: 'USER',
  })

  const dropdownItems = ['ADMIN', 'AGENT', 'USER']

  const [register, { isLoading }] = useRegisterMutation()

  const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen) // Redux state
  const dispatch = useDispatch()

  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setInputData((values) => ({ ...values, [name]: value }))
  }

  const handleOpenChange = () => {
    dispatch(closeModal())
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      registerSchema.safeParse(inputData)
      await register(inputData).unwrap()

      toast.success('User created successfully')
      navigate('/verify', {
        state: { email: inputData.email, name: inputData.name },
      })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)
      if (error.data?.stack && error.data?.stack.includes('ZodError')) {
        const parsed = JSON.parse(error.data.stack.match(/\[(.*)\]/s)![0])
        toast.error(parsed[0].message)
        return
      }
      toast.error(error?.data?.message)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      {/*       <DialogTrigger asChild>
        <Button variant="outline">Sign up</Button>
      </DialogTrigger> */}

      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex shrink-0 items-center justify-center mb-2"
            aria-hidden="true"
          >
            <WallexLogo />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Sign up
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              We just need a few details to get you started.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-name`}>Full name</Label>
              <Input
                id={`${id}-name`}
                name="name"
                placeholder="Matt Welsh"
                type="text"
                value={inputData.name}
                onChange={handleChangeInputData}
                required
              />
            </div>
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
            {/* <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                placeholder="Enter your password"
                type="password"
                                value={inputData.password}
                onChange={handleChangeInputData}
                required
              />
            </div> */}
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-email`}>Role</Label>
              <br />
              <Dropdown
                title={inputData.role}
                items={dropdownItems}
                inputKey="role"
                setInputData={setInputData}
              />
            </div>
            <Password
              handleChangeInputData={handleChangeInputData}
              inputData={inputData}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Sign up'}
          </Button>
        </form>

        <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
          <span className="text-muted-foreground text-xs">Or</span>
        </div>

        <Button variant="outline">Continue with Google</Button>

        <p className="text-muted-foreground text-center text-xs">
          By signing up you agree to our{' '}
          <a className="underline hover:no-underline" href="#">
            Terms
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  )
}

export default Signup
