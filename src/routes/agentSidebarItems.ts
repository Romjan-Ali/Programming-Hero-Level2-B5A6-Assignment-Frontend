import CashIn from '@/pages/agent/cash_in/CashIn'
import CashOut from '@/pages/agent/cash_out/CashOut'
import AgentDashboard from '@/pages/agent/dashboard/AgentDashboard'
import AgentTransactions from '@/pages/agent/transactions/AgentTransactions'

export const agentSidebarItems = [
  {
    title: 'Agent',
    items: [
      {
        title: 'Dashboard',
        url: '/agent/dashboard',
        component: AgentDashboard,
      },
      {
        title: 'Cash In',
        url: '/agent/cash-in',
        component: CashIn,
      },
      {
        title: 'Cash Out',
        url: '/agent/cash-out',
        component: CashOut,
      },
      {
        title: 'Transactions',
        url: '/agent/transactions',
        component: AgentTransactions
      }
    ],
  },
]
