import axiosBaseQuery from '@/redux/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['User', 'Transactions'],
  endpoints: (builder) => ({
    // USER
    getUserInfo: builder.query({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
      providesTags: ['User'],
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
        let query = '/transaction?'
        if (filterType && filterType !== 'all') query += `type=${filterType}&`
        if (dateRange?.from) query += `from=${dateRange.from}&`
        if (dateRange?.to) query += `to=${dateRange.to}`
        return {
          url: query,
          method: 'GET',
        }
      },
      providesTags: ['Transactions'],
    }),
    deposit: builder.mutation({
      query: (body) => ({
        url: '/transaction/deposit',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Transactions', 'User'],
    }),
    withdraw: builder.mutation({
      query: (body) => ({
        url: '/transaction/withdraw',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Transactions', 'User'],
    }),
    sendMoney: builder.mutation({
      query: (body) => ({
        url: '/transaction/send-money',
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
} = userApi
