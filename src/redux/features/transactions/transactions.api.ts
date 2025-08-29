import { baseApi } from '@/redux/baseApi'

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionsByFilter: builder.query({
      query: ({ page = 1, limit = 10, type, startDate, endDate }) => {
        const params = new URLSearchParams()
        params.set('page', String(page))
        params.set('limit', String(limit))
        if (type) params.set('type', type)
        if (startDate) params.set('startDate', startDate)
        if (endDate) params.set('endDate', endDate)

        console.log('params', params.toString())

        return {
          url: `/transaction/my-history?${params.toString()}`,
          method: 'GET',
        }
      },
      providesTags: ['Transactions']
    }),
  }),
})

export const { useGetTransactionsByFilterQuery } = transactionsApi
