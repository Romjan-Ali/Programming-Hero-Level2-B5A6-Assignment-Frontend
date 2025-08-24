import React, { useState } from 'react'
import { useGetTransactionsQuery } from '@/redux/features/transactions/transactions.api'
import { useUserInfoQuery } from '@/redux/features/auth/auth.api'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const UserDashboard: React.FC = () => {
  const { data: user } = useUserInfoQuery(undefined)
  const [filterType, setFilterType] = useState<string>('all')
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({})
  const { data: transactions } = useGetTransactionsQuery({
    filterType,
    dateRange,
  })

  return (
    <div className="p-6 space-y-6">
      {/* Wallet Overview */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Wallet Balance</h2>
            <p className="text-3xl font-bold">
              ৳ {user?.walletBalance || '0.00'}
            </p>
          </div>
          <div className="space-x-3">
            <Button>Deposit</Button>
            <Button variant="secondary">Withdraw</Button>
            <Button variant="outline">Send Money</Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions + Tabs */}
      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        {/* Transactions */}
        <TabsContent value="transactions">
          <div className="flex gap-4 my-4">
            <select
              className="border rounded-md px-2 py-1"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="deposit">Deposit</option>
              <option value="withdraw">Withdraw</option>
              <option value="send">Send</option>
            </select>
            <Input
              type="date"
              onChange={(e) =>
                setDateRange({ ...dateRange, from: e.target.value })
              }
            />
            <Input
              type="date"
              onChange={(e) =>
                setDateRange({ ...dateRange, to: e.target.value })
              }
            />
          </div>          

          {/* Recent Transactions Preview */}
          <Card className="shadow rounded-xl">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                Recent Transactions
              </h3>
              <ul className="divide-y">
                {transactions?.data?.slice(0, 5).map((tx: any) => (
                  <li key={tx._id} className="py-2 flex justify-between">
                    <span>{tx.type.toUpperCase()}</span>
                    <span>৳ {tx.amount}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(tx.date).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
              <Button variant="link" className="mt-2 p-0">
                View All Transactions →
              </Button>
            </CardContent>
          </Card>

        </TabsContent>

        {/* Profile */}
        <TabsContent value="profile">
          <Card className="shadow rounded-xl">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Update Profile</h3>
              <Input defaultValue={user?.name} placeholder="Full Name" />
              <Input defaultValue={user?.phone} placeholder="Phone" />
              <Input type="password" placeholder="New Password" />
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default UserDashboard
