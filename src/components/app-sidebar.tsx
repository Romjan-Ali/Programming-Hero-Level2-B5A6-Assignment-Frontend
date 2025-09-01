import * as React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import Logo from '@/assets/wallex-logo'
import { Link } from 'react-router'
import { getSidebarItems } from '@/utils/getSidebarItems'
import { useUserInfoQuery } from '@/redux/features/auth/auth.api'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined)

  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="items-center">
        <Link to="/">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`${
                          item.title === 'Transactions'
                            ? 'transaction-history'
                            : ''
                        } ${
                          item.title === 'Profile Settings'
                            ? 'profile-settings'
                            : ''
                        } ${item.title === 'Cash In' ? 'cash-in' : ''} ${
                          item.title === 'Cash Out' ? 'cash-out' : ''
                        } ${
                          item.title === 'Transactions'
                            ? 'all-transactions'
                            : ''
                        } ${
                          item.title === 'Settings'
                            ? 'profile-settings'
                            : ''
                        }`}
                      >
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
