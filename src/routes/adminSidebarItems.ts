import AdminDashboard from '@/pages/admin/dashboard/AdminDashboard'
import ManageUsers from '@/pages/admin/manage_users/ManageUsers'
import ManageAgents from '@/pages/admin/manage_agents.tsx/ManageAgents'
import AdminSettings from '@/pages/admin/settings/AdminSettings'
import AdminTransactions from '@/pages/admin/transactions/AdminTransactions'

export const adminSidebarItems = [
  {
    title: 'Admin',
    items: [
      {
        title: 'Dashboard',
        url: '/admin/dashboard',
        component: AdminDashboard,
      },
      {
        title: 'Manage Users',
        url: '/admin/users',
        component: ManageUsers,
      },
      {
        title: 'Manage Agents',
        url: '/admin/agents',
        component: ManageAgents,
      },
      {
        title: 'Transactions',
        url: '/admin/transactions',
        component: AdminTransactions,
      },
      {
        title: 'Settings',
        url: '/admin/settings',
        component: AdminSettings,
      },
    ],
  },
]
