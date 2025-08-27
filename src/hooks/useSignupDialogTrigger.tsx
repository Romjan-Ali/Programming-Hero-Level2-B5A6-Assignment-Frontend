import { useEffect, useState } from 'react'

export const useSignupDialogTrigger = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  useEffect(() => {
    console.log({ isDialogOpen })
  }, [isDialogOpen])

  return {
    isDialogOpen,
    openDialog,
    closeDialog,
    setIsDialogOpen,
  }
}
