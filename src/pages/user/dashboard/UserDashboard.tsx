import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useWalletQuery } from '@/redux/features/wallet/wallet.api'
import { useGetTransactionsQuery } from '@/redux/features/user/user.api'
import { Link } from 'react-router'

const UserDashboard: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all')
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({})
  const { data: transactions } = useGetTransactionsQuery({
    filterType,
    dateRange,
  })
  const { data: wallet } = useWalletQuery(undefined)

  console.log('transactions', transactions)

  return (
    <div className="p-6 space-y-6">
      {/* Wallet Overview */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Wallet Balance</h2>
            <p className="text-3xl font-bold">
              ৳ {wallet?.data?.balance || '0.00'}
            </p>
          </div>
          <div className="space-x-3">
            <Link to="/user/deposit">
              <Button variant="outline">Deposit</Button>
            </Link>
            <Link to="user/withdraw">
              <Button variant="outline">Withdraw</Button>
            </Link>
            <Link to="/user/send-money">
              <Button variant="outline">Send Money</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

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
          onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
        />
        <Input
          type="date"
          onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
        />
      </div>

      {/* Recent Transactions Preview */}
      <Card className="shadow rounded-xl">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
          <ul className="divide-y">
            {transactions?.data?.slice(0, 5).map((tx: any) => (
              <li key={tx._id} className="py-2 flex justify-between">
                <span>{tx.type.toUpperCase()}</span>
                <span>৳ {tx.amount}</span>
                <span className="text-sm text-gray-500">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
          <Link to="/user/transactions">
            <Button variant="link" className="mt-2 p-0">
              View All Transactions →
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserDashboard
