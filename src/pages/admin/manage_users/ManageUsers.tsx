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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useGetUsersQuery } from '@/redux/features/admin/admin.api'
import { toast } from 'sonner'
import { useSoftDeleteUserMutation } from '@/redux/features/user/user.api'

const ManageUsers: React.FC = () => {
  const [search, setSearch] = useState('')
  const [editDialogueOpen, setEditDialogueOpen] = useState(false)
  const [openDialogue, setOpenDialogue] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [formData, setFormData] = useState({ name: '', role: '', isActive: '' })

  const [currentUser, setCurrentUser] = useState(null)

  const { data: users } = useGetUsersQuery({})

  const [softDeleteUser, { isLoading }] = useSoftDeleteUserMutation()

  console.log({ users })

  const handleDelete = async (userId) => {
    try {
      await softDeleteUser(userId).unwrap()
      toast.success('User deleted successfully')
    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong')
    }
    setDeleteId(null)
  }

  const handleEditOpen = (user) => {
    setCurrentUser(user)
    setEditDialogueOpen(true)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRoleSelect = (role: string) => {
    setFormData({ ...formData, role })
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) return

    try {
      await updateUser({ userId: currentUser._id, payload: formData }).unwrap()
      toast.success('User updated successfully')
      setEditDialogueOpen(false)
      setCurrentUser(null)
    } catch (err: any) {
      toast.error(err?.data?.message || 'Update failed')
    }
  }

  return (
    <>
      <Dialog open={editDialogueOpen} onOpenChange={setEditDialogueOpen}>
        <form>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="username"
                  value={formData.email}
                  type="email"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            {/* <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Select Option</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => handleSelect('Option 1')}>
                    Option 1
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSelect('Option 2')}>
                    Option 2
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSelect('Option 3')}>
                    Option 3
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div> */}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      <AlertDialog open={openDialogue} onOpenChange={setOpenDialogue}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure to delete the user?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-gray-800"
              onClick={() => handleDelete(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
                <TableHead>Role</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.data?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user?.wallet?.balance ? `৳ ${user?.wallet?.balance}` : '-'}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        handleEditOpen(user)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setOpenDialogue(true)
                        setDeleteId(user._id)
                      }}
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
    </>
  )
}

export default ManageUsers
