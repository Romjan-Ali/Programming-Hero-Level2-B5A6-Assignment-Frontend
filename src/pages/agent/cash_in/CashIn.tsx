import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

import { useCashInMutation } from '@/redux/features/agent/agent.api'

const CashIn: React.FC = () => {
  const [userId, setUserId] = useState('')
  const [amount, setAmount] = useState('')
  const [reference, setReference] = useState('')

  const [cashIn, { isLoading }] = useCashInMutation()

  const handleCashIn = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userId || !amount) {
      toast.error('Please provide User ID and Amount')
      return
    }

    try {
      await cashIn({
        toUserId: userId,
        amount: Number(amount),
        reference,
      }).unwrap()
      setAmount('')
      setReference('')
      toast.success('Cash in successfully')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Server connection failed!')
    }
  }

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Cash In to User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCashIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={10}
                placeholder="Enter Amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Reference"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading? "Processing ..." : "Process Cash In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CashIn
