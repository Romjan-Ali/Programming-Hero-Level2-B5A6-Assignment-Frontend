import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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

import { useGetTransactionsByFilterQuery } from '@/redux/features/transactions/transactions.api'
import { format } from 'date-fns'
import SmartPagination from '@/components/SmartPagination'
import { Input } from '@/components/ui/input'

const AgentTransactions: React.FC = () => {
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
    endDate: dateRange.to === today ? undefined : dateRange.to,
    page: currentPage,
  })

  return (
    <>
      <div className="p-6">
        <Card className="shadow-md">
          <CardHeader className='flex flex-col gap-4'>
            <CardTitle className="text-nowrap">Agent Transactions</CardTitle>
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[360px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="cash_in">Cash In</SelectItem>
                  <SelectItem value="cash_out">Cash Out</SelectItem>
                  <SelectItem value="send_money">Send Money</SelectItem>
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
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions?.data.length > 0 ? (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    transactions?.data.map((txn: any) => (
                      <TableRow key={txn._id}>
                        <TableCell>
                          <Tooltip>
                            <TooltipTrigger>
                              {'...' + txn?._id?.slice(-5)}
                            </TooltipTrigger>
                            <TooltipContent>{txn?._id}</TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="capitalize">
                          {txn.type.replace('_', ' ')}
                        </TableCell>
                        <TableCell>{txn?.to?.name || '-'}</TableCell>
                        <TableCell>৳{txn.amount.toFixed(2)}</TableCell>
                        <TableCell>{txn.status}</TableCell>
                        <TableCell>
                          {format(new Date(txn.createdAt), 'MM/dd/yyyy')}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex mb-8">
        <SmartPagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={transactions?.meta?.totalPage}
        />
      </div>
    </>
  )
}

export default AgentTransactions
