import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Outlet } from 'react-router'
import Footer from './Footer'
import DashboardHeader from './DashboardHeader'

import { useEffect, useState } from 'react'
import Joyride, { type CallBackProps, type Placement, STATUS } from 'react-joyride'

import { useUserInfoQuery } from '@/redux/features/auth/auth.api'

export default function DashboardLayout() {
  const { data: userInfo } = useUserInfoQuery(undefined)

  const [run, setRun] = useState(false)

  const userDashboardSteps = [
    {
      target: '.wallet-balance',
      content: 'Here you can see your wallet balance.',
    },
    {
      target: '.quick-actions',
      content: 'Use quick actions to deposit, withdraw, or send money easily.',
    },
    {
      target: '.transaction-history',
      content: 'View your transaction history with filtering and pagination.',
    },
    {
      target: '.profile-settings',
      content:
        'Manage your profile, update your phone, name, and password here.',
    },
  ]

  let steps: {
    target: string
    title?: string
    content: string
    placement?: Placement
  }[] = [
    {
      target: '.theme-toggle',
      title: 'Theme Toggle',
      content:
        'Switch between light and dark mode according to your preference.',
      placement: 'left',
    },
  ]

  if (userInfo?.data?.role === 'USER') {
    steps = [...steps, ...userDashboardSteps]
  }

  useEffect(() => {
    const userDashboardTourSeen = localStorage.getItem('userDashboardTourSeen')
    if (userInfo?.data?.role === 'USER' && !userDashboardTourSeen) {
      setRun(true)
    }
  }, [userInfo])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data

    // Treat both FINISHED and SKIPPED as finished
    if (
      [STATUS.FINISHED, STATUS.SKIPPED].includes(
        status as 'finished' | 'skipped'
      )
    ) {
      if (userInfo?.data?.role === 'USER') {
        localStorage.setItem('userDashboardTourSeen', 'true')
      }
      setRun(false)
    }
  }

  return (
    <SidebarProvider className="min-h-screen">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 font-bold text-4xl">
          <SidebarTrigger size="lg" className="-ml-1" />
          <DashboardHeader />
        </header>
        <div>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4"
          />
          <div className="m-4 mt-0 flex-1">
            <Joyride
              steps={steps}
              run={run}
              continuous
              showProgress
              showSkipButton
              styles={{
                options: {
                  zIndex: 10000,
                },
              }}
              callback={handleJoyrideCallback}
            />
            <Outlet />
          </div>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
