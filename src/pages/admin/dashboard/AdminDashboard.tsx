import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react'

import { useGetUsersQuery } from '@/redux/features/admin/admin.api'
import { useGetWalletsQuery } from '@/redux/features/admin/admin.api'
import { useGetTransactionsQuery } from '@/redux/features/admin/admin.api' 

const AdminDashboard: React.FC = () => {
  const { data: users } = useGetUsersQuery({ role: 'USER' })
  const { data: agents } = useGetUsersQuery({ role: 'AGENT' })
  const { data: admins } = useGetUsersQuery({ role: 'ADMIN' })
  const { data: wallets } = useGetWalletsQuery('')
  const { data: transactions } = useGetTransactionsQuery('')

  console.log({ users, agents, admins, wallets, transactions })

  return (
    <div className="p-6 min-h-screen bg-background text-foreground">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-muted-foreground text-sm">Total Users</p>
              <h2 className="text-xl font-semibold">{users?.meta?.total}</h2>
            </div>
            <Users className="w-10 h-10 text-blue-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-muted-foreground text-sm">Total Agents</p>
              <h2 className="text-xl font-semibold">{agents?.meta?.total}</h2>
            </div>
            <Users className="w-10 h-10 text-green-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-muted-foreground text-sm">Transactions</p>
              <h2 className="text-xl font-semibold">{transactions?.meta?.total}</h2>
            </div>
            <ArrowUpRight className="w-10 h-10 text-purple-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-muted-foreground text-sm">System Balance</p>
              <h2 className="text-xl font-semibold">{wallets?.meta?.totalBalance}</h2>
            </div>
            <Wallet className="w-10 h-10 text-orange-500" />
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Manage Users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full">View All Users</Button>
            <Button variant="outline" className="w-full">
              Block/Unblock User
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Manage Agents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full">View All Agents</Button>
            <Button variant="outline" className="w-full">
              Add New Agent
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full">View All Transactions</Button>
            <Button variant="outline" className="w-full">
              Approve Pending
            </Button>
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
                <tr className="border-b">
                  <td className="p-2">TX-1001</td>
                  <td className="p-2">John Doe</td>
                  <td className="p-2 flex items-center gap-1 text-green-600">
                    <ArrowUpRight size={16} /> Deposit
                  </td>
                  <td className="p-2">$500</td>
                  <td className="p-2 text-green-600">Completed</td>
                </tr>
                <tr>
                  <td className="p-2">TX-1002</td>
                  <td className="p-2">Jane Smith</td>
                  <td className="p-2 flex items-center gap-1 text-yellow-600">
                    <ArrowDownRight size={16} /> Withdraw
                  </td>
                  <td className="p-2">$200</td>
                  <td className="p-2 text-yellow-600">Pending</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
