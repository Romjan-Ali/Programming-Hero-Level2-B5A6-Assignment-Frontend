import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { format } from 'date-fns'

import { useGetTransactionsByFilterQuery } from '@/redux/features/transactions/transactions.api'
import SmartPagination from '@/components/SmartPagination'

const UserTransactions = () => {
  const [filterType, setFilterType] = useState<string>('all')

  const today = new Date().toISOString().split('T')[0]
  
  const [dateRange, setDateRange] = useState<{
    from: string | undefined
    to: string | undefined
  }>({
    from: undefined,
    to: today,
  })

  const [currentPage, setCurrentPage] = useState(1)

  const { data: transactions } = useGetTransactionsByFilterQuery({
    type: filterType === 'all' ? undefined : filterType,
    startDate: dateRange.from,
    endDate: dateRange.to,
    page: currentPage,
  })

  console.log({ transactions })

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    const parsed = new Date(dateString)
    return isNaN(parsed.getTime())
      ? 'Invalid Date'
      : format(parsed, 'MM/dd/yyyy')
  }

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
            placeholder="From"
            value={dateRange.from}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, from: e.target.value }))
            }
            max={dateRange.to}
          />
          <Input
            type="date"
            placeholder="To"
            value={dateRange.to}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, to: e.target.value }))
            }
            min={dateRange.from}
            max={today}
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
            {transactions?.data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No transactions found.
                </td>
              </tr>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              transactions?.data.map((t: any) => (
                <tr
                  key={t._id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="px-4 py-2">{formatDate(t.createdAt)}</td>
                  <td className="px-4 py-2">{t.type}</td>
                  <td className="px-4 py-2">৳{t.amount}</td>
                  <td className="px-4 py-2">{t?.to?.name || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardContent>

      <div className="flex p-4">
        <SmartPagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={transactions?.meta?.totalPage}
        />
      </div>
    </Card>
  )
}

export default UserTransactions
