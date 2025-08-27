import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

const AdminSettings: React.FC = () => {
  // Sample data for admin settings
  const sampleAdminData = {
    name: 'Admin',
    email: 'admin@gmail.com',
    role: 'ADMIN',
    isActive: 'ACTIVE',
    isVerified: true,
    transactionLimit: 50000,
    commissionRate: 2.5,
    isFeatureXEnabled: true,
  }

  // State to store settings
  const [name, setName] = useState(sampleAdminData.name)
  const [email, setEmail] = useState(sampleAdminData.email)
  const [role, setRole] = useState(sampleAdminData.role)
  const [isActive, setIsActive] = useState(sampleAdminData.isActive === 'ACTIVE')
  const [isVerified, setIsVerified] = useState(sampleAdminData.isVerified)
  const [transactionLimit, setTransactionLimit] = useState(sampleAdminData.transactionLimit)
  const [commissionRate, setCommissionRate] = useState(sampleAdminData.commissionRate)
  const [isFeatureXEnabled, setIsFeatureXEnabled] = useState(sampleAdminData.isFeatureXEnabled)

  const handleSave = () => {
    const updatedSettings = {
      name,
      email,
      role,
      isActive: isActive ? 'ACTIVE' : 'INACTIVE',
      isVerified,
      transactionLimit,
      commissionRate,
      isFeatureXEnabled,
    }

    // Log the updated settings to console (You can replace this with an API call to save data)
    console.log('Saving updated admin settings:', updatedSettings)

    // Optionally, show a success message or perform other actions here
  }

  return (
    <Card className="max-w-4xl mx-auto shadow-lg p-6">
      <CardHeader>
        <CardTitle>Admin Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Admin Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Admin Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3"
          />
        </div>

        {/* Admin Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Admin Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3"
          />
        </div>

        {/* Admin Role */}
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3"
            disabled
          />
        </div>

        {/* Active Status */}
        <div className="flex items-center justify-between">
          <Label htmlFor="isActive">Is Active</Label>
          <Switch
            id="isActive"
            checked={isActive}
            onCheckedChange={setIsActive}
          />
        </div>

        {/* Verified Status */}
        <div className="flex items-center justify-between">
          <Label htmlFor="isVerified">Is Verified</Label>
          <Switch
            id="isVerified"
            checked={isVerified}
            onCheckedChange={setIsVerified}
          />
        </div>

        {/* Transaction Limit */}
        {/* <div className="space-y-2">
          <Label htmlFor="transactionLimit">Daily Transaction Limit (৳)</Label>
          <Input
            id="transactionLimit"
            type="number"
            value={transactionLimit}
            onChange={(e) => setTransactionLimit(Number(e.target.value))}
            className="w-full p-3"
          />
        </div> */}

        {/* Commission Rate */}
        {/* <div className="space-y-2">
          <Label htmlFor="commissionRate">Commission Rate (%)</Label>
          <Input
            id="commissionRate"
            type="number"
            step="0.1"
            value={commissionRate}
            onChange={(e) => setCommissionRate(Number(e.target.value))}
            className="w-full p-3"
          />
        </div> */}

        {/* Enable/Disable Features */}
        {/* <div className="flex items-center justify-between">
          <Label htmlFor="featureX">Enable Feature X</Label>
          <Switch
            id="featureX"
            checked={isFeatureXEnabled}
            onCheckedChange={setIsFeatureXEnabled}
          />
        </div> */}

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full py-3">
          Save Settings
        </Button>
      </CardContent>
    </Card>
  )
}

export default AdminSettings
