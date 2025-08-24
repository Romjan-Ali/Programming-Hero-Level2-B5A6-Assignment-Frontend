import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-lg">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <h2 className="text-xl font-semibold">1,240</h2>
            </div>
            <Users className="w-10 h-10 text-blue-500" />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-gray-500 text-sm">Total Agents</p>
              <h2 className="text-xl font-semibold">45</h2>
            </div>
            <Users className="w-10 h-10 text-green-500" />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-gray-500 text-sm">Transactions</p>
              <h2 className="text-xl font-semibold">12,530</h2>
            </div>
            <ArrowUpRight className="w-10 h-10 text-purple-500" />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-gray-500 text-sm">System Balance</p>
              <h2 className="text-xl font-semibold">$456,890</h2>
            </div>
            <Wallet className="w-10 h-10 text-orange-500" />
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manage Users */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Manage Users</h3>
            <Button className="w-full mb-2">View All Users</Button>
            <Button variant="outline" className="w-full">
              Block/Unblock User
            </Button>
          </CardContent>
        </Card>

        {/* Manage Agents */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Manage Agents</h3>
            <Button className="w-full mb-2">View All Agents</Button>
            <Button variant="outline" className="w-full">
              Add New Agent
            </Button>
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Transactions</h3>
            <Button className="w-full mb-2">View All Transactions</Button>
            <Button variant="outline" className="w-full">
              Approve Pending
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-600 border-b">
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
                <td className="p-2 flex items-center gap-1 text-red-600">
                  <ArrowDownRight size={16} /> Withdraw
                </td>
                <td className="p-2">$200</td>
                <td className="p-2 text-yellow-600">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
