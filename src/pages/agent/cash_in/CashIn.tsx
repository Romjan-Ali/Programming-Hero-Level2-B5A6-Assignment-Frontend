import React, { useState } from 'react'

const CashIn: React.FC = () => {
  const [userId, setUserId] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')

  const handleCashIn = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userId || !amount) {
      setMessage('⚠ Please provide User ID and Amount')
      return
    }

    try {
      // Example API call
      const res = await fetch('/api/agent/cash-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, amount: parseFloat(amount) }),
      })

      if (res.ok) {
        setMessage('✅ Cash-In successful!')
        setUserId('')
        setAmount('')
      } else {
        const data = await res.json()
        setMessage(`❌ Failed: ${data.message}`)
      }
    } catch (error) {
      setMessage('❌ Something went wrong!')
    }
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Agent Cash-In</h2>
      <form onSubmit={handleCashIn} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter User ID"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter Amount"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
        >
          Confirm Cash-In
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm font-medium">{message}</p>
      )}
    </div>
  )
}

export default CashIn
