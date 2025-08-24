import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface User {
  _id: string
  name: string
  email: string
  phone: string
  role: 'user' | 'agent' | 'admin'
  balance: number
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    // Simulated API call (replace with real fetch)
    setUsers([
      {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        role: 'user',
        balance: 500,
      },
      {
        _id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '0987654321',
        role: 'agent',
        balance: 2000,
      },
      {
        _id: '3',
        name: 'Admin',
        email: 'admin@example.com',
        phone: '1111111111',
        role: 'admin',
        balance: 10000,
      },
    ])
  }, [])

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u._id !== id))
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search)
  )

  return (
    <Card className="w-full p-4 shadow-lg rounded-2xl">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Search by name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/3"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>${user.balance}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ManageUsers
