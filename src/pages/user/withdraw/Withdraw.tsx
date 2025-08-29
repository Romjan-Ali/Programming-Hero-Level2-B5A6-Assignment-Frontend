import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useWithdrawMutation } from '@/redux/features/user/user.api'

const Withdraw = () => {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const [withdraw] = useWithdrawMutation()

  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    setLoading(true)
    try {
      const result = await withdraw({ amount: Number(amount) }).unwrap()
      if (result?.success) {
        toast.success(`Successfully withdrawn ৳${amount}`)
      } else {
        toast.error(result?.message || "Something went wrong")
      }
      setAmount('')
    } catch (error) {
      toast.error('Withdrawal failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Withdraw Money</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min={10}
        />
        <Button className="w-full" onClick={handleWithdraw} disabled={loading}>
          {loading ? 'Processing...' : 'Withdraw'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default Withdraw
