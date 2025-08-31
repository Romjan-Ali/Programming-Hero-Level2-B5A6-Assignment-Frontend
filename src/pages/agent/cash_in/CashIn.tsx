/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

import { useCashInMutation } from '@/redux/features/agent/agent.api'

const CashIn: React.FC = () => {
  const [recipientIdentifier, setRecipientIdentifier] = useState('')
  const [amount, setAmount] = useState('')
  const [reference, setReference] = useState('')

  const [cashIn, { isLoading }] = useCashInMutation()

  const handleCashIn = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!recipientIdentifier || !amount) {
      toast.error('Please provide User\'s Email or Phone Number and Amount')
      return
    }

    try {
      await cashIn({
        recipientIdentifier,
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
              <Label htmlFor="recipientIdentifier">Email or Phone Number</Label>
              <Input
                id="recipientIdentifier"
                type="text"
                value={recipientIdentifier}
                onChange={(e) => setRecipientIdentifier(e.target.value)}
                placeholder="Enter User's Email or Phone Number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (৳)</Label>
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
