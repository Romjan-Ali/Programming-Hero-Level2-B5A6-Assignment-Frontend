import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useDepositMutation } from '@/redux/features/user/user.api'

const Deposit: React.FC = () => {
  const [amount, setAmount] = useState('')
  const [agentId, setAgentId] = useState('')
  const [message, setMessage] = useState('')

  // RTK Query mutation hook
  const [deposit, { isLoading }] = useDepositMutation()

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    try {
      const result = await deposit({ amount: Number(amount) }).unwrap()
      setMessage(`✅ Successfully deposited ৳${result?.data?.amount || amount}`)
      setAmount('')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setMessage(
        error?.data?.message || '❌ Failed to deposit money. Try again.'
      )
    }
  }

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Deposit Money
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDeposit} className="space-y-4">
            <div>
              <Label htmlFor="agentId">Agent ID</Label>
              <Input
                id="agentId"
                type="text"
                placeholder="Enter agent ID"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min={10}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Deposit'}
            </Button>
          </form>
          {message && (
            <p className="text-center mt-4 text-sm font-medium">{message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Deposit
