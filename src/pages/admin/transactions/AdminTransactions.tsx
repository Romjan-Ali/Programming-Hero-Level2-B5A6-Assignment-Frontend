import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Transaction = {
  id: string
  user: string
  type: "deposit" | "withdraw" | "send"
  amount: number
  date: string
}

const AdminTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filtered, setFiltered] = useState<Transaction[]>([])
  const [typeFilter, setTypeFilter] = useState<string>("")
  const [searchUser, setSearchUser] = useState<string>("")

  useEffect(() => {
    // Fetch all transactions (admin can see all users' data)
    const fetchData = async () => {
      const res = await fetch("/api/admin/transactions")
      const data = await res.json()
      setTransactions(data)
      setFiltered(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    let filteredData = transactions

    if (typeFilter) {
      filteredData = filteredData.filter((t) => t.type === typeFilter)
    }

    if (searchUser) {
      filteredData = filteredData.filter((t) =>
        t.user.toLowerCase().includes(searchUser.toLowerCase())
      )
    }

    setFiltered(filteredData)
  }, [typeFilter, searchUser, transactions])

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>All Transactions (Admin)</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <Input
            placeholder="Search by user email or phone"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="w-full md:w-1/3"
          />

          <Select onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-1/4">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="withdraw">Withdraw</SelectItem>
              <SelectItem value="send">Send</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => {
              setSearchUser("")
              setTypeFilter("")
            }}
          >
            Reset
          </Button>
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
              {filtered.length > 0 ? (
                filtered.map((tx) => (
                  <tr key={tx.id} className="hover:bg-accent">
                    <td className="p-2 border">{tx.id}</td>
                    <td className="p-2 border">{tx.user}</td>
                    <td className="p-2 border capitalize">{tx.type}</td>
                    <td className="p-2 border">${tx.amount}</td>
                    <td className="p-2 border">
                      {new Date(tx.date).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2 border text-center text-muted-foreground" colSpan={5}>
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminTransactions
