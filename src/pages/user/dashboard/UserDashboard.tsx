import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useWalletQuery } from '@/redux/features/wallet/wallet.api'
import { useGetTransactionsByFilterQuery } from '@/redux/features/transactions/transactions.api'
import { Link } from 'react-router'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Itransaction = {
  _id: string
  type:
    | 'top_up'
    | 'withdraw'
    | 'cash_in'
    | 'cash_out'
    | 'send_money'
    | 'payment'
    | 'add_money'
  amount: number
  createdAt: string
}

const UserDashboard: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all')
  const today = new Date().toISOString().split('T')[0]
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({
    from: undefined,
    to: today,
  })

  const { data: transactions } = useGetTransactionsByFilterQuery({
    type: filterType === 'all' ? undefined : filterType,
    startDate: dateRange.from,
    endDate: dateRange.to,
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
              ৳ {wallet?.data?.balance || '-'}
            </p>
          </div>
          <div className="space-x-3">
            <Link to="/user/deposit">
              <Button variant="outline">Deposit</Button>
            </Link>
            <Link to="/user/withdraw">
              <Button variant="outline">Withdraw</Button>
            </Link>
            <Link to="/user/send-money">
              <Button variant="outline">Send Money</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 my-4">
        <Select
          onValueChange={(value) => setFilterType(value === 'all' ? '' : value)}
        >
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="top_up">top_up</SelectItem>
            <SelectItem value="withdraw">withdraw</SelectItem>
            <SelectItem value="cash_in">cash_in</SelectItem>
            <SelectItem value="cash_out">cash_out</SelectItem>
            <SelectItem value="send_money">send_money</SelectItem>
            <SelectItem value="payment">payment</SelectItem>
            <SelectItem value="add_money">add_money</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={dateRange.from}
          onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
          max={dateRange.to}
        />
        <Input
          type="date"
          value={dateRange.to}
          onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
          min={dateRange.from}
          max={today}
        />
      </div>

      {/* Recent Transactions Preview */}
      <Card className="shadow rounded-xl">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
          <ul className="divide-y">
            {transactions?.data?.slice(0, 5).map((tx: Itransaction) => (
              <li key={tx._id} className="py-2 flex justify-between">
                <span>{tx.type}</span>
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
