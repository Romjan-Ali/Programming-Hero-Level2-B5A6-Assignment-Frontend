/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { format } from 'date-fns'
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

import { toast } from 'sonner'
import { Link } from 'react-router'

import { useWalletQuery } from '@/redux/features/wallet/wallet.api'

import {
  useCashInMutation,
  useCashOutMutation,
} from '@/redux/features/agent/agent.api'

import { useGetTransactionsByFilterQuery } from '@/redux/features/transactions/transactions.api'

const AgentDashboard: React.FC = () => {
  const [recipientIdentifier, setRecipientIdentifier] = useState('')
  const [amount, setAmount] = useState('')
  const [reference, setReference] = useState('')

  const [filterType, setFilterType] = useState<string>('all')

  const {data: wallet} = useWalletQuery(undefined)

  const [cashIn, { isLoading: cashInLoading }] = useCashInMutation()
  const [cashOut, { isLoading: cashOutLoading }] = useCashOutMutation()

  const { data: transactions } = useGetTransactionsByFilterQuery({
    type: filterType === 'all' ? undefined : filterType,
  })

  const handleSubmitCashIn = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!recipientIdentifier || !amount) {
      toast.error("Please provide User's Email or Phone Number and Amount")
      return
    }

    try {
      await cashIn({
        recipientIdentifier,
        amount: Number(amount),
        reference,
      }).unwrap()
      setAmount('')
      setReference('')
      toast.success('Cash in successfully')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Server connection failed!')
    }
  }

  const handleSubmitCashOut = async (e: React.FormEvent) => {
    e.preventDefault()

    if (recipientIdentifier && parseFloat(amount) > 0) {
      try {
        await cashOut({
          recipientIdentifier,
          amount: Number(amount),
          reference,
        }).unwrap()
        setAmount('')
        setReference('')
        toast.success('Cash out successfully')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error?.data?.message || 'Something went wrong!')
      }
    } else {
      toast.error('Please provide a valid User ID and Amount.')
    }
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
            <p className="text-2xl font-bold text-green-600 wallet-balance">
              ৳ {wallet?.data?.balance}
            </p>
          </CardContent>
        </Card>

        {/* Tabs for actions */}
        <Tabs defaultValue="cashin" className="w-full">
          <TabsList className="grid grid-cols-2 w-[300px] mx-auto cash-actions">
            <TabsTrigger value="cashin">Cash In</TabsTrigger>
            <TabsTrigger value="cashout">Cash Out</TabsTrigger>
          </TabsList>

          {/* Cash In */}
          <form onSubmit={handleSubmitCashIn}>
            <TabsContent value="cashin">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Cash In to User</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    value={recipientIdentifier}
                    onChange={(e) => setRecipientIdentifier(e.target.value)}
                    placeholder="Enter User Phone/Email"
                  />
                  <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount (৳)"
                    type="number"
                  />
                  <Input
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="Reference"
                  />
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={cashInLoading}
                  >
                    {cashInLoading ? 'Processing ...' : 'Confirm Cash In'}
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
                  <CardTitle>Cash Out from User</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    value={recipientIdentifier}
                    onChange={(e) => setRecipientIdentifier(e.target.value)}
                    placeholder="Enter User Phone/Email"
                  />
                  <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount (৳)"
                    type="number"
                  />
                  <Input
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="Reference"
                  />
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={cashOutLoading}
                  >
                    {cashOutLoading ? 'Processing ...' : 'Confirm Cash Out'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </form>
        </Tabs>

        {/* Recent Transactions */}

        <Card className="shadow-md recent-activity">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Recent Transactions</CardTitle>
            <Select value={filterType} onValueChange={setFilterType}>
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
            <Table className="overflow-x-auto">
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
          </CardContent>
        </Card>
        <Link to="/agent/transactions">
          <Button variant="link" className="mt-2 p-0 all-transactions">
            View All Transactions →
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default AgentDashboard
