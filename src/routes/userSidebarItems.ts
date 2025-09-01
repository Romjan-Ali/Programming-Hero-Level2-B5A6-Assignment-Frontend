import UserDashboard from '@/pages/user/dashboard/UserDashboard'
import Deposit from '@/pages/user/deposit/Deposit'
import Profile from '@/pages/user/profile/Profile'
import SendMoney from '@/pages/user/send_money/SendMoney'
import UserTransactions from '@/pages/user/transactions/UserTransactions'
import Withdraw from '@/pages/user/withdraw/Withdraw'

export const userSidebarItems = [
  {
    title: 'User',
    items: [
      {
        title: 'Dashboard',
        url: '/user/dashboard',
        component: UserDashboard,
      },
      {
        title: 'Deposit',
        url: '/user/deposit',
        component: Deposit,
      },
      {
        title: 'Withdraw',
        url: '/user/withdraw',
        component: Withdraw,
      },
      {
        title: 'Send Money',
        url: '/user/send-money',
        component: SendMoney,
      },
      {
        title: 'Transactions',
        url: '/user/transactions',
        component: UserTransactions,
      },
      {
        title: 'Profile Settings',
        url: '/user/profile-settings',
        component: Profile,
      },
    ],
  },
]
