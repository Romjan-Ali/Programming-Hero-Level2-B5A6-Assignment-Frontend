import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

import { useSendMoneyMutation } from '@/redux/features/user/user.api'

const SendMoney = () => {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [reference, setReference] = useState('')
  const [loading, setLoading] = useState(false)

  const [sendMoney] = useSendMoneyMutation()

  const handleSend = async () => {
    if (!recipient.trim()) {
      toast.error('Please enter recipient email or phone')
      return
    }
    if (!amount || Number(amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    setLoading(true)
    try {
      await sendMoney({
        recipientIdentifier: recipient,
        amount: Number(amount),
        reference,
      }).unwrap()

      toast.success(`Successfully sent ৳${amount} to ${recipient}`)
      setRecipient('')
      setAmount('')
    } catch (error) {
      toast.error('Transaction failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Send Money</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Recipient email or phone"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
        <Button className="w-full" onClick={handleSend} disabled={loading}>
          {loading ? 'Processing...' : 'Send Money'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default SendMoney
