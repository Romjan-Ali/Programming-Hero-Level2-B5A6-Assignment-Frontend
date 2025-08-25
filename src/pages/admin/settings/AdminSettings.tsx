import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

const AdminSettings: React.FC = () => {
  const [transactionLimit, setTransactionLimit] = useState(50000)
  const [commissionRate, setCommissionRate] = useState(2.5)
  const [isFeatureXEnabled, setIsFeatureXEnabled] = useState(true)

  const handleSave = () => {
    // TODO: Call API to update admin settings
    console.log("Saving settings:", {
      transactionLimit,
      commissionRate,
      isFeatureXEnabled,
    })
  }

  return (
    <Card className="max-w-4xl mx-auto shadow-lg p-6">
      <CardHeader>
        <CardTitle>Admin Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Transaction Limit */}
        <div className="space-y-2">
          <Label htmlFor="transactionLimit">
            Daily Transaction Limit (৳)
          </Label>
          <Input
            id="transactionLimit"
            type="number"
            value={transactionLimit}
            onChange={(e) => setTransactionLimit(Number(e.target.value))}
            className="w-full p-3" // Make input wider
          />
        </div>

        {/* Commission Rate */}
        <div className="space-y-2">
          <Label htmlFor="commissionRate">Commission Rate (%)</Label>
          <Input
            id="commissionRate"
            type="number"
            step="0.1"
            value={commissionRate}
            onChange={(e) => setCommissionRate(Number(e.target.value))}
            className="w-full p-3" // Make input wider
          />
        </div>

        {/* Enable/Disable Features */}
        <div className="flex items-center justify-between">
          <Label htmlFor="featureX">Enable Feature X</Label>
          <Switch
            id="featureX"
            checked={isFeatureXEnabled}
            onCheckedChange={setIsFeatureXEnabled}
          />
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full py-3">
          Save Settings
        </Button>
      </CardContent>
    </Card>
  )
}

export default AdminSettings
