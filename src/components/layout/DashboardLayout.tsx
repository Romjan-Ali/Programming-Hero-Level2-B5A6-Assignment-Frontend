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
import Joyride, {
  type CallBackProps,
  type Placement,
  STATUS,
} from 'react-joyride'

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

  const agentDashboardSteps = [
    {
      target: '.wallet-balance',
      content: 'Here you can see your wallet balance.',
    },
    {
      target: '.cash-actions',
      content:
        'Use these buttons to perform cash-in and cash-out actions for users quickly.',
    },
    {
      target: '.recent-activity',
      content:
        'Here you can see the most recent transactions you have handled.',
    },
    {
      target: '.cash-in',
      content: 'Perform a Cash In to add money to a user’s wallet quickly.',
    },
    {
      target: '.cash-out',
      content: 'Perform a Cash Out to withdraw money from a user’s wallet.',
    },
    {
      target: '.all-transactions',
      content: 'View a complete list of all transactions handled by you.',
    },
    {
      target: '.profile-settings',
      content:
        'Manage your profile, update personal information and password here.',
    },
  ]

  const adminDashboardSteps = [
    {
      target: '.total-users',
      content: 'This section shows the total number of users in the system.',
    },
    {
      target: '.total-agents',
      content: 'Here you can see the total number of active agents.',
    },
    {
      target: '.transaction-overview',
      content:
        'Check the total transactions and overall volume processed in the system.',
    },
    {
      target: '.manage-users',
      content:
        'Manage users: view details, block or unblock accounts as needed.',
    },
    {
      target: '.manage-agents',
      content: 'Manage agents: approve new agents or suspend existing ones.',
    },
    {
      target: '.transactions',
      content:
        'View all transactions handled by the system. Use advanced filters for type, status, and amount.',
    },
    {
      target: '.search-filters',
      content:
        'Use search bars and multiple filters on listing pages with pagination for better usability.',
    },
    {
      target: '.system-settings',
      content:
        'Adjust system fees, transaction limits, or other settings here (optional).',
    },
    {
      target: '.admin-profile',
      content:
        'Manage your admin account settings: update name, email, or password.',
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
      placement: 'left-start',
    },
  ]

  if (userInfo?.data?.role === 'USER') {
    steps = [...steps, ...userDashboardSteps]
  }

  if (userInfo?.data?.role === 'AGENT') {
    steps = [...steps, ...agentDashboardSteps]
  }

  if (userInfo?.data?.role === 'ADMIN') {
    steps = [...steps, ...adminDashboardSteps]
  }

  useEffect(() => {
    const userDashboardTourSeen = localStorage.getItem('userDashboardTourSeen')
    const agentDashboardTourSeen = localStorage.getItem(
      'agentDashboardTourSeen'
    )
    const adminDashboardTourSeen = localStorage.getItem(
      'adminDashboardTourSeen'
    )
    if (userInfo?.data?.role === 'USER' && !userDashboardTourSeen) {
      setRun(true)
    }
    if (userInfo?.data?.role === 'AGENT' && !agentDashboardTourSeen) {
      setRun(true)
    }
    if (userInfo?.data?.role === 'ADMIN' && !adminDashboardTourSeen) {
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
      if (userInfo?.data?.role === 'AGENT') {
        localStorage.setItem('agentDashboardTourSeen', 'true')
      }
      if (userInfo?.data?.role === 'USER') {
        localStorage.setItem('adminDashboardTourSeen', 'true')
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
