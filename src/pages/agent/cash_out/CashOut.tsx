import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

import { useCashOutMutation } from '@/redux/features/agent/agent.api'

const CashOut: React.FC = () => {
  const [userId, setUserId] = useState('')
  const [amount, setAmount] = useState('')
  const [reference, setReference] = useState('')

  const [cashOut, { isLoading }] = useCashOutMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (userId && parseFloat(amount) > 0) {
      try {
        await cashOut({
          toUserId: userId,
          amount: Number(amount),
          reference,
        }).unwrap()
        setAmount('')
        setReference('')
        toast.success('Cash out successfully')
      } catch (error: any) {
        toast.error(error?.data?.message || 'Something went wrong!')
      }
    } else {
      toast.error('Please provide a valid User ID and Amount.')
    }
  }

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Cash Out from User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User ID */}
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                name="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
              />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (৳)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={10}
                placeholder="Enter Amount"
              />
            </div>

            {/* Reference */}
            <div className="space-y-2">
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                name="reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Reference"
              />
            </div>

            {/* Submit */}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Processing ...' : 'Process Cash Out'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CashOut
