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

export default function DashboardLayout() {
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
            <Outlet />
          </div>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
