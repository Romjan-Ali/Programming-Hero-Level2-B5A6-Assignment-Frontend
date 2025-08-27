import { baseApi } from '@/redux/baseApi'

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch users using query
    getUsers: builder.query({
      query: (filter) => ({
        url: '/user/all-users',
        method: 'GET',
        params: filter,
      }),
      providesTags: ['User', 'Agent', 'Admin'],
    }),

    // Fetch wallets using query
    getWallets: builder.query({
      query: (filter) => ({
        url: '/admin/wallets',
        method: 'GET',
        params: filter,
      }),
      providesTags: ['Wallet'],
    }),

    // Fetch all transactions
    getTransactions: builder.query({
      query: (filter) => ({
        url: '/admin/transactions',
        method: 'GET',
        params: filter,
      }),
      providesTags: ['Transactions'],
    }),

    // Block or unblock a user
    toggleUserStatus: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}/toggle-status`,
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),

    // Add a new agent
    addAgent: builder.mutation({
      query: (body) => ({
        url: '/admin/agents',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Agent'],
    }),

    // Approve or reject a transaction
    approveRejectTransaction: builder.mutation({
      query: (transactionId) => ({
        url: `/admin/transactions/${transactionId}/approve-reject`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Transactions'],
    }),
  }),
})

export const {
  useGetTransactionsQuery,
  useToggleUserStatusMutation,
  useAddAgentMutation,
  useApproveRejectTransactionMutation,
  useGetUsersQuery,
  useGetWalletsQuery,
} = adminApi
