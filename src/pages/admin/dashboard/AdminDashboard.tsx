import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Wallet, ArrowUpRight } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { useGetUsersQuery } from '@/redux/features/admin/admin.api'
import { useGetWalletsQuery } from '@/redux/features/admin/admin.api'
import { useGetTransactionsQuery } from '@/redux/features/admin/admin.api'
import { Link } from 'react-router'

const AdminDashboard: React.FC = () => {
  const { data: users } = useGetUsersQuery({ role: 'USER' })
  const { data: agents } = useGetUsersQuery({ role: 'AGENT' })
  const { data: admins } = useGetUsersQuery({ role: 'ADMIN' })
  const { data: wallets } = useGetWalletsQuery('')
  const { data: transactions } = useGetTransactionsQuery({ limit: '10' })

  console.log({ users, agents, admins, wallets, transactions })

  return (
    <div className="p-6 min-h-screen bg-background text-foreground">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center justify-between p-6 total-users">
            <div>
              <p className="text-muted-foreground text-sm">Total Users</p>
              <h2 className="text-xl font-semibold">
                {users?.meta?.total ? users?.meta?.total : '-'}
              </h2>
            </div>
            <Users className="w-10 h-10 text-blue-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6 total-agents">
            <div>
              <p className="text-muted-foreground text-sm">Total Agents</p>
              <h2 className="text-xl font-semibold">
                {agents?.meta?.total ? agents?.meta?.total : '-'}
              </h2>
            </div>
            <Users className="w-10 h-10 text-green-500" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center justify-between p-6 total-transactions">
            <div>
              <p className="text-muted-foreground text-sm">Transactions</p>
              <h2 className="text-xl font-semibold">
                {transactions?.meta?.total ? transactions?.meta?.total : '-'}
              </h2>
            </div>
            <ArrowUpRight className="w-10 h-10 text-purple-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6 system-balance">
            <div>
              <p className="text-muted-foreground text-sm">System Balance</p>
              <h2 className="text-xl font-semibold">
                {wallets?.meta?.totalBalance
                  ? wallets?.meta?.totalBalance
                  : '-'}
              </h2>
            </div>
            <Wallet className="w-10 h-10 text-orange-500" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <Card>
          <CardContent className="p-4 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-muted-foreground border-b">
                  <th className="p-2">ID</th>
                  <th className="p-2">User</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  transactions?.data?.map((transaction: any) => (
                    <tr key={transaction._id} className="border-b">
                      <td className="p-2">
                        <Tooltip>
                          <TooltipTrigger>
                            {'...' + transaction?._id?.slice(-5)}
                          </TooltipTrigger>
                          <TooltipContent>{transaction?._id}</TooltipContent>
                        </Tooltip>
                      </td>
                      <td className="p-2">
                        <Tooltip>
                          <TooltipTrigger>
                            {transaction?.from?.name
                              ? transaction?.from?.name
                              : '-'}
                          </TooltipTrigger>
                          <TooltipContent>
                            <div>
                              From:{' '}
                              {transaction?.from?.name
                                ? transaction?.from?.name
                                : '-'}
                            </div>
                            <div>
                              To:{' '}
                              {transaction?.from?.name
                                ? transaction?.to?.name
                                : '-'}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </td>
                      <td className="p-2 flex items-center gap-1">
                        {transaction?.type}
                      </td>
                      <td className="p-2">৳ {transaction?.amount}</td>
                      <td className="p-2">{transaction?.status}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Link to="/admin/transactions">
          <Button variant="link" className="mt-2 p-0">
            View All Transactions →
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboard
