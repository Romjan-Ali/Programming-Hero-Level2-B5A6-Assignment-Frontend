import { baseApi } from '@/redux/baseApi'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    wallet: builder.query({
      query: () => ({
        url: '/wallet/me',
        method: 'GET',
      }),
      providesTags: ['Transactions'],
    }),
  }),
})

export const {
  useWalletQuery
} = userApi
