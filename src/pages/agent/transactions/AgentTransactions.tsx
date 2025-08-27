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

import { useGetTransactionsQuery } from '@/redux/features/agent/agent.api'
import { format } from 'date-fns'

const AgentTransactions: React.FC = () => {
  const [filter, setFilter] = useState<string>('all')

  const { data: transactions } = useGetTransactionsQuery(undefined)

  console.log({ transactions })

  const filteredTransactions =
    transactions?.data ?? filter === 'all'
      ? transactions?.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      : transactions?.data.filter((txn: any) => txn.type === filter) || []

  console.log({ filteredTransactions })

  return (
    <div className="p-6">
      <Card className="shadow-md">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Agent Transactions</CardTitle>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="cash_in">Cash In</SelectItem>
              <SelectItem value="cash_out">Cash Out</SelectItem>
              <SelectItem value="send_money">Send Money</SelectItem>
            </SelectContent>
          </Select>
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
                {filteredTransactions.length > 0 ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  filteredTransactions.map((txn: any) => (
                    <TableRow key={txn._id}>
                      <TableCell>{txn._id}</TableCell>
                      <TableCell className="capitalize">
                        {txn.type.replace('_', ' ')}
                      </TableCell>
                      <TableCell>{txn?.to?.name || '-'}</TableCell>
                      <TableCell className="text-green-600 font-semibold">
                        ৳{txn.amount.toFixed(2)}
                      </TableCell>
                      <TableCell
                        className={
                          txn.status === 'success'
                            ? 'text-green-600 font-medium'
                            : txn.status === 'pending'
                            ? 'text-yellow-600 font-medium'
                            : 'text-red-600 font-medium'
                        }
                      >
                        {txn.status}
                      </TableCell>
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
  )
}

export default AgentTransactions
