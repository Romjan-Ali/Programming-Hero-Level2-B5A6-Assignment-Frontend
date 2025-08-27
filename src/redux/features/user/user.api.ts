
import { baseApi } from '@/redux/baseApi'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // USER
    getUserInfo: builder.query({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    softDeleteUser: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'PATCH',
        data: { isDeleted: true, isActive: "BLOCKED" },
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation({
      query: (body) => ({
        url: '/user/update-profile',
        method: 'PATCH',
        data: body,
      }),
      invalidatesTags: ['User'],
    }), 
    

    // TRANSACTIONS
    getTransactions: builder.query({
      query: ({ filterType, dateRange }) => {        
        let query = '/transaction/my-history?'
        if (filterType && filterType !== 'all') query += `type=${filterType}&`
        if (dateRange?.from) query += `from=${dateRange.from}&`
        if (dateRange?.to) query += `to=${dateRange.to}`
        console.log('query', query)
        return {
          url: query,
          method: 'GET',
        }
      },
      providesTags: ['Transactions'],
    }),

    deposit: builder.mutation({
      query: (body) => ({
        url: '/wallet/cash-in',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Transactions', 'User'],
    }),

    withdraw: builder.mutation({
      query: (body) => ({
        url: '/wallet/withdraw',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Transactions', 'User'],
    }),

    sendMoney: builder.mutation({
      query: (body) => ({
        url: '/wallet/send-money',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Transactions', 'User'],
    }),
  }),
})

export const {
  useGetUserInfoQuery,
  useUpdateUserMutation,
  useGetTransactionsQuery,
  useDepositMutation,
  useWithdrawMutation,
  useSendMoneyMutation,
  useSoftDeleteUserMutation
} = userApi
