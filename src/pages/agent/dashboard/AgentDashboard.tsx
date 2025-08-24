import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

import {
  useCashInMutation,
  useCashOutMutation,
} from '@/redux/features/agent/agent.api'
import { useWalletQuery } from '@/redux/features/wallet/wallet.api'

const AgentDashboard: React.FC = () => {
  const [cashInUserId, setCashInUserId] = useState('')
  const [cashInAmount, setCashInAmount] = useState('')
  const [cashInReference, setCashInReference] = useState('')

  const [cashOutUserId, setCashOutUserId] = useState('')
  const [cashOutAmount, setCashOutAmount] = useState('')
  const [cashOutReference, setCashOutReference] = useState('')

  const [cashIn] = useCashInMutation()
  const [cashOut] = useCashOutMutation()
  const { wallet } = useWalletQuery(undefined)

  const handleSubmitCashIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ cashInUserId, cashInAmount, cashInReference })
  }

  const handleSubmitCashOut = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-2xl space-y-6">
        {/* Wallet Balance */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">৳ {}</p>
          </CardContent>
        </Card>

        {/* Tabs for actions */}
        <Tabs defaultValue="cashin" className="w-full">
          <TabsList className="grid grid-cols-2 w-[300px] mx-auto">
            <TabsTrigger value="cashin">Cash In</TabsTrigger>
            <TabsTrigger value="cashout">Cash Out</TabsTrigger>
          </TabsList>

          {/* Cash In */}
          <form onSubmit={handleSubmitCashIn}>
            <TabsContent value="cashin">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Cash In for User</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    value={cashInUserId}
                    onChange={(e) => setCashInUserId(e.target.value)}
                    placeholder="Enter User Phone/Email"
                  />
                  <Input
                    value={cashInAmount}
                    onChange={(e) => setCashInAmount(e.target.value)}
                    placeholder="Amount (৳)"
                    type="number"
                  />
                  <Input
                    value={cashInReference}
                    onChange={(e) => setCashInReference(e.target.value)}
                    placeholder="Reference"
                  />
                  <Button className="w-full" type="submit">
                    Confirm Cash In
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </form>

          {/* Cash Out */}
          <form onSubmit={handleSubmitCashOut}>
            <TabsContent value="cashout">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Cash Out Request</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    value={cashOutUserId}
                    onChange={(e) => setCashOutUserId(e.target.value)}
                    placeholder="Enter User Phone/Email"
                  />
                  <Input
                    value={cashOutAmount}
                    onChange={(e) => setCashOutAmount(e.target.value)}
                    placeholder="Amount (৳)"
                    type="number"
                  />
                  <Input
                    value={cashOutReference}
                    onChange={(e) => setCashOutReference(e.target.value)}
                    placeholder="Reference"
                  />
                  <Button className="w-full" type="submit">
                    Confirm Cash Out
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </form>
        </Tabs>

        {/* Recent Transactions */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { id: 1, type: 'Cash In', amount: 2000, user: '017XXXXXXXX' },
                { id: 2, type: 'Cash Out', amount: 1500, user: '018XXXXXXXX' },
              ].map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between p-2 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{tx.type}</p>
                    <p className="text-sm text-gray-500">{tx.user}</p>
                  </div>
                  <p
                    className={`font-bold ${
                      tx.type === 'Cash In' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    ৳ {tx.amount}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AgentDashboard
