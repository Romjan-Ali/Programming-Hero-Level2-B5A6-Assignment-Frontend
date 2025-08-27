/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/layout/ModeToggler'
import { useLogoutMutation } from '@/redux/features/auth/auth.api'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

export default function DashboardHeader() {
  const [logout, { isLoading }] = useLogoutMutation(undefined)

  const handleClickLogout = async () => {
    try {
      await logout(undefined).unwrap()
      toast.success('Sign out successfully')
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong")
      console.log(err)
    }
  }
  return (
    <header className="border-b px-4 md:px-6 w-full">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2"></div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={handleClickLogout}
            className='cursor-pointer'
          >
            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Sign out'}
          </Button>
        </div>
      </div>
    </header>
  )
}
