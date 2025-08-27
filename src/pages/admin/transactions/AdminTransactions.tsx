import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useGetTransactionsQuery } from '@/redux/features/admin/admin.api'
import { format } from 'date-fns'
import SmartPagination from '@/components/SmartPagination'

const AdminTransactions = () => {
  const [typeFilter, setTypeFilter] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [entries, setEntries] = useState('10')
  const [searchTerm, setSearchTerm] = useState('')

  const { data: transactions, isLoading: isTransactionsLoading } = useGetTransactionsQuery({
    searchTerm: searchTerm || undefined,
    type: typeFilter || undefined,
    limit: entries,
    page: currentPage,
  })

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    const parsed = new Date(dateString)
    return isNaN(parsed.getTime())
      ? 'Invalid Date'
      : format(parsed, 'MM/dd/yyyy')
  }

  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
            <Input
              placeholder="Search by name / email / type / status / reference"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3"
            />

            <Select
              onValueChange={(value) =>
                setTypeFilter(value === 'all' ? '' : value)
              }
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

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('')
                setTypeFilter('')
              }}
            >
              Reset
            </Button>

            <Select onValueChange={setEntries}>
              <SelectTrigger className="w-full md:w-1/4">
                <SelectValue placeholder={`${entries} entries`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 entries</SelectItem>
                <SelectItem value="25">25 entries</SelectItem>
                <SelectItem value="50">50 entries</SelectItem>
                <SelectItem value="100">100 entries</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-muted text-left">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">User</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.data?.length > 0 ? (
                  transactions?.data?.map((tx: any) => (
                    <tr key={tx._id} className="hover:bg-accent">
                      <td className="p-2 border">
                        <Tooltip>
                          <TooltipTrigger>
                            {'...' + tx?._id?.slice(-5)}
                          </TooltipTrigger>
                          <TooltipContent>{tx?._id}</TooltipContent>
                        </Tooltip>
                      </td>
                      <td className="p-2 border">
                        <Tooltip>
                          <TooltipTrigger>
                            {tx?.from?.name ? tx?.from?.name : '-'}
                          </TooltipTrigger>
                          <TooltipContent>
                            <div>
                              From: {tx?.from?.name ? tx?.from?.name : '-'}
                            </div>
                            <div>To: {tx?.from?.name ? tx?.to?.name : '-'}</div>
                          </TooltipContent>
                        </Tooltip>
                      </td>
                      <td className="p-2 border">{tx.type || ''}</td>
                      <td className="p-2 border">${tx.amount || ''}</td>
                      <td className="p-2 border">
                        {formatDate(tx?.createdAt) || ''}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="p-2 border text-center text-muted-foreground"
                      colSpan={5}
                    >
                      {isTransactionsLoading ? 'Loading ...' : 'No transactions found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <SmartPagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={transactions?.meta?.totalPage}
      />
    </>
  )
}

export default AdminTransactions
