import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useUserInfoQuery } from '@/redux/features/auth/auth.api'
import { useEditProfileMutation } from '@/redux/features/admin/admin.api'
import { toast } from 'sonner'

const AdminSettings: React.FC = () => {  
  const { data: userInfo } = useUserInfoQuery(undefined)
  console.log({userInfo})
  const [name, setName] = useState(userInfo?.data?.name || '')
  const [email, setEmail] = useState(userInfo?.data?.email || '')  

  const [editProfile, { isLoading }] = useEditProfileMutation()

  const handleSave = async () => {
    try {
      const result = await editProfile({name, email}).unwrap()

      toast.success(result?.message)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any){
      toast.error(err.data.message)
    }
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
            value={userInfo?.data?.email}
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
            value={userInfo?.data?.role}
            className="w-full p-3"
            disabled
          />
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full py-3" disabled={isLoading}>
          {isLoading ? "Save Settings" : "Loading ..."}
        </Button>
      </CardContent>
    </Card>
  )
}

export default AdminSettings
