import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

// Example type
type Transaction = {
  id: string
  type: 'deposit' | 'withdraw' | 'send' | 'receive'
  amount: number
  date: string
  recipient?: string
}

const UserTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filterType, setFilterType] = useState<string>('all')
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: '',
    to: '',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Fetch or mock transactions
  useEffect(() => {
    const mockData: Transaction[] = [
      { id: '1', type: 'deposit', amount: 5000, date: '2025-08-22' },
      {
        id: '2',
        type: 'send',
        amount: 1500,
        date: '2025-08-21',
        recipient: 'user@example.com',
      },
      { id: '3', type: 'withdraw', amount: 2000, date: '2025-08-20' },
      {
        id: '4',
        type: 'receive',
        amount: 3000,
        date: '2025-08-19',
        recipient: 'friend@example.com',
      },
      { id: '5', type: 'deposit', amount: 1000, date: '2025-08-18' },
      {
        id: '6',
        type: 'send',
        amount: 2500,
        date: '2025-08-17',
        recipient: 'user2@example.com',
      },
    ]
    setTransactions(mockData)
  }, [])

  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    const matchType = filterType === 'all' || t.type === filterType
    const matchDate =
      (!dateRange.from || new Date(t.date) >= new Date(dateRange.from)) &&
      (!dateRange.to || new Date(t.date) <= new Date(dateRange.to))
    return matchType && matchDate
  })

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const displayedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <Card className="w-full max-w-4xl mx-auto my-4">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle className="text-xl font-bold">Transaction History</CardTitle>

        <div className="flex flex-wrap gap-4 items-center">
          <Select
            onValueChange={(value) => setFilterType(value)}
            defaultValue="all"
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="withdraw">Withdraw</SelectItem>
              <SelectItem value="send">Send</SelectItem>
              <SelectItem value="receive">Receive</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            placeholder="From"
            value={dateRange.from}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, from: e.target.value }))
            }
          />
          <Input
            type="date"
            placeholder="To"
            value={dateRange.to}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, to: e.target.value }))
            }
          />
        </div>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Recipient</th>
            </tr>
          </thead>
          <tbody>
            {displayedTransactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No transactions found.
                </td>
              </tr>
            ) : (
              displayedTransactions.map((t) => (
                <tr
                  key={t.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="px-4 py-2">
                    {format(new Date(t.date), 'yyyy-MM-dd')}
                  </td>
                  <td className="px-4 py-2 capitalize">{t.type}</td>
                  <td className="px-4 py-2">৳{t.amount}</td>
                  <td className="px-4 py-2">{t.recipient || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardContent>

      <div className="flex justify-between items-center p-4">
        <Button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </Card>
  )
}

export default UserTransactions
