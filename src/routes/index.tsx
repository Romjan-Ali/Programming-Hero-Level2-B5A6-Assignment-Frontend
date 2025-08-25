import App from '@/App'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { role } from '@/constants/role'
import About from '@/pages/about/About'
import Contact from '@/pages/contact/Contact'
import FaqPage from '@/pages/faq/FaqPage'
import Features from '@/pages/features/Features'
import Home from '@/pages/home/Home'
import Verify from '@/pages/verify/Verify'
import { generateRoutes } from '@/utils/generateRoutes'
import { withAuth } from '@/utils/withAuth'
import { createBrowserRouter, Navigate } from 'react-router'
import { adminSidebarItems } from './adminSidebarItems'
import type { TRole } from '@/types'
import { userSidebarItems } from './userSidebarItems'
import AdminDashboard from '@/pages/admin/dashboard/AdminDashboard'
import AgentDashboard from '@/pages/agent/dashboard/AgentDashboard'
import UserDashboard from '@/pages/user/dashboard/UserDashboard'
import { agentSidebarItems } from './agentSidebarItems'

export const router = createBrowserRouter([
  {
    Component: App,
    path: '/',
    children: [
      {
        Component: Home,
        index: true,
      },
      {
        Component: Features,
        path: '/features',
      },
      {
        Component: Contact,
        path: '/contact',
      },
      {
        Component: FaqPage,
        path: '/faq',
      },
      {
        Component: About,
        path: '/about',
      },
      {
        Component: Verify,
        path: '/verify',
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: '/user',
    children: [
      {
        index: true,
        element: <Navigate to="/user/dashboard" />,
      },
      {
        Component: UserDashboard,
        path: 'dashboard',
      },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.agent as TRole),
    path: '/agent',
    children: [
      {
        index: true,
        element: <Navigate to="/agent/dashboard" />,
      },
      {
        Component: AgentDashboard,
        path: 'dashboard',
      },
      ...generateRoutes(agentSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: '/admin',
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      {
        Component: AdminDashboard,
        path: 'dashboard',
      },
      ...generateRoutes(adminSidebarItems),
    ],
  },
])
