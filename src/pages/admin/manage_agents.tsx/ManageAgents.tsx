import React, { useState } from 'react'
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import {
  useGetUsersQuery,
  useToggleAgentStatusMutation,
} from '@/redux/features/admin/admin.api'
import { toast } from 'sonner'
import {
  useSoftDeleteUserMutation,
} from '@/redux/features/user/user.api'

const ManageAgents: React.FC = () => {
  const [search, setSearch] = useState('')
  const [activeStatus, setActiveStatus] = useState<boolean | undefined>(
    undefined
  )
  console.log({ activeStatus })
  const [openDialogue, setOpenDialogue] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery({
    role: 'AGENT',
    isApproved: activeStatus,
    searchTerm: search || undefined,
  })

  const [toggleAgentStatus, { isLoading: isUserStatusUpdating }] =
    useToggleAgentStatusMutation()

  const [softDeleteUser, { isLoading }] = useSoftDeleteUserMutation()
  console.log(isLoading)

  console.log({ users })

  const handleDelete = async (userId: string) => {
    try {
      await softDeleteUser(userId).unwrap()
      toast.success('Agent deleted successfully')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong')
    }
    setDeleteId(null)
  }

  const handleStatusClick = async (userId: string) => {
    console.log("userId", userId)
    try {
      const result = await toggleAgentStatus( userId ).unwrap()
      if (result.success) {
        toast.success('User status changed successfully')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong')
    }
  }

  return (
    <>
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
              onClick={() => handleDelete(deleteId as string)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card className="w-full p-4 shadow-lg rounded-2xl">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Manage Agents</h2>

          <div className="flex justify-between items-center mb-4 gap-4">
            <Input
              placeholder="Search by name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
            <Select
              onValueChange={(value) =>
                setActiveStatus(
                  value === 'approved'
                    ? true
                    : value === 'suspend'
                    ? false
                    : undefined
                )
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Active Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Active Status</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="suspend">Not Aproved</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.data?.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                users?.data?.map((user: any) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger>
                          {'...' + user?._id?.slice(-5)}
                        </TooltipTrigger>
                        <TooltipContent>{user?._id}</TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || '-'}</TableCell>
                    <TableCell>
                      {user?.wallet?.balance
                        ? `৳ ${user?.wallet?.balance}`
                        : '-'}
                    </TableCell>
                    <TableCell className="capitalize">
                      {user?.isApproved ? 'Approved' : 'Suspended'}
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        className="cursor-pointer"
                        size="sm"
                        variant="outline"
                        disabled={isUserStatusUpdating}
                        onClick={() => handleStatusClick(user._id)}
                      >
                        {isUserStatusUpdating
                          ? '...'
                          : user?.isApproved
                          ? 'Suspend'
                          : 'Approve'}
                      </Button>
                      <Button
                        className="cursor-pointer"
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-400">
                    No user found.
                  </TableCell>
                </TableRow>
              )}
              {isLoadingUsers && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-400">
                    Loading ...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

export default ManageAgents
