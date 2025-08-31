
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

    changeUserStatus: builder.mutation({
      query: (data) => ({
        url: `user/users/${data.userId}/status`,
        method: 'PATCH',
        data: data.statusData
      }),
      invalidatesTags: ['User']
    }),
  }),
})

export const {
  useGetUserInfoQuery,
  useUpdateUserMutation,
  useDepositMutation,
  useWithdrawMutation,
  useSendMoneyMutation,
  useSoftDeleteUserMutation,
  useChangeUserStatusMutation
} = userApi
