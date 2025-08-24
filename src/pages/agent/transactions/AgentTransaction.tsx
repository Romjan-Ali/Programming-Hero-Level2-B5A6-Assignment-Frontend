import React, { useEffect, useState } from 'react'

interface Transaction {
  id: string
  type: 'cash_in' | 'cash_out' | 'send_money'
  amount: number
  customer: string
  date: string
  status: 'success' | 'pending' | 'failed'
}

const AgentTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    // Example: fetch agent transactions from API
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/agent/transactions') // Replace with your backend endpoint
        const data = await response.json()
        setTransactions(data)
      } catch (error) {
        console.error('Error fetching transactions:', error)
      }
    }

    fetchTransactions()
  }, [])

  const filteredTransactions =
    filter === 'all'
      ? transactions
      : transactions.filter((txn) => txn.type === filter)

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Agent Transactions</h2>

      {/* Filter */}
      <div className="mb-4 flex gap-2">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All</option>
          <option value="cash_in">Cash In</option>
          <option value="cash_out">Cash Out</option>
          <option value="send_money">Send Money</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((txn) => (
                <tr key={txn.id} className="text-center">
                  <td className="p-2 border">{txn.id}</td>
                  <td className="p-2 border capitalize">
                    {txn.type.replace('_', ' ')}
                  </td>
                  <td className="p-2 border">{txn.customer}</td>
                  <td className="p-2 border text-green-600 font-semibold">
                    ${txn.amount.toFixed(2)}
                  </td>
                  <td
                    className={`p-2 border ${
                      txn.status === 'success'
                        ? 'text-green-600'
                        : txn.status === 'pending'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {txn.status}
                  </td>
                  <td className="p-2 border">{txn.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 border text-center" colSpan={6}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AgentTransactions
