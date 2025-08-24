import React, { useState } from 'react'

const AdminSettings: React.FC = () => {
  const [transactionLimit, setTransactionLimit] = useState(50000)
  const [commissionRate, setCommissionRate] = useState(2.5)
  const [isFeatureXEnabled, setIsFeatureXEnabled] = useState(true)

  const handleSave = () => {
    // TODO: Call API to update admin settings
    console.log('Saving settings:', {
      transactionLimit,
      commissionRate,
      isFeatureXEnabled,
    })
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>

      {/* Transaction Limit */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">
          Daily Transaction Limit (৳)
        </label>
        <input
          type="number"
          value={transactionLimit}
          onChange={(e) => setTransactionLimit(Number(e.target.value))}
          className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Commission Rate */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">
          Commission Rate (%)
        </label>
        <input
          type="number"
          value={commissionRate}
          onChange={(e) => setCommissionRate(Number(e.target.value))}
          step="0.1"
          className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Enable/Disable Features */}
      <div className="mb-5 flex items-center gap-3">
        <input
          type="checkbox"
          checked={isFeatureXEnabled}
          onChange={(e) => setIsFeatureXEnabled(e.target.checked)}
          className="w-5 h-5"
        />
        <label className="text-sm font-medium">Enable Feature X</label>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        Save Settings
      </button>
    </div>
  )
}

export default AdminSettings
