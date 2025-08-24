import React, { useState } from 'react'

const CashOut: React.FC = () => {
  const [formData, setFormData] = useState({
    userId: '',
    amount: '',
  })

  const [message, setMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate API call
    if (formData.userId && parseFloat(formData.amount) > 0) {
      setMessage(
        `Successfully processed Cash Out of ৳${formData.amount} for User ID: ${formData.userId}`
      )
      setFormData({ userId: '', amount: '' })
    } else {
      setMessage('Please provide valid User ID and Amount.')
    }
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Cash Out (Agent)
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User ID
          </label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="Enter User ID"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount (৳)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition"
        >
          Process Cash Out
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="mt-4 text-center text-sm font-medium text-gray-700">
          {message}
        </p>
      )}
    </div>
  )
}

export default CashOut
