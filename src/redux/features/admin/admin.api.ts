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

    deleteUser: builder.mutation({
      query: (body) => ({
        url: '/delete-user',
        method: 'PATCH',
        data: body,
      }),
      invalidatesTags: ['User'],
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

    // Approve or suspend an agent
    toggleAgentStatus: builder.mutation({
      query: (userId) => ({
        url: `/admin/agents/${userId}/status`,
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
  useToggleAgentStatusMutation,
  useAddAgentMutation,
  useApproveRejectTransactionMutation,
  useGetUsersQuery,
  useGetWalletsQuery,
  useDeleteUserMutation
} = adminApi
