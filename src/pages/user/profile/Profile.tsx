import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const Profile = () => {
  const [name, setName] = useState('John Doe')
  const [phone, setPhone] = useState('017XXXXXXXX')
  const [password, setPassword] = useState('')

  const handleUpdate = () => {
    // Simulate API call to update profile
    console.log({ name, phone, password })
    toast.success('Profile updated successfully!')
    setPassword('') // Clear password field after update
  }

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-medium">
            Phone
          </label>
          <Input
            id="phone"
            placeholder="Enter your phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          className="mt-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white"
          onClick={handleUpdate}
        >
          Update Profile
        </Button>
      </CardContent>
    </Card>
  )
}

export default Profile
