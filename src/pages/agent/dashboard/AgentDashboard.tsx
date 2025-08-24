import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const AgentDashboard: React.FC = () => {
  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-2xl space-y-6"> {/* ✅ Center + Limit Width */}
        {/* Wallet Balance */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">৳ 20,500</p>
          </CardContent>
        </Card>

        {/* Tabs for actions */}
        <Tabs defaultValue="cashin" className="w-full">
          <TabsList className="grid grid-cols-2 w-[300px] mx-auto">
            <TabsTrigger value="cashin">Cash In</TabsTrigger>
            <TabsTrigger value="cashout">Cash Out</TabsTrigger>
          </TabsList>

          {/* Cash In */}
          <TabsContent value="cashin">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Cash In for User</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Enter User Phone/Email" />
                <Input placeholder="Amount (৳)" type="number" />
                <Button className="w-full">Confirm Cash In</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cash Out */}
          <TabsContent value="cashout">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Cash Out Request</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Enter User Phone/Email" />
                <Input placeholder="Amount (৳)" type="number" />
                <Button className="w-full">Confirm Cash Out</Button>
              </CardContent>
            </Card>
          </TabsContent>
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
                      tx.type === 'Cash In'
                        ? 'text-green-600'
                        : 'text-red-600'
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
