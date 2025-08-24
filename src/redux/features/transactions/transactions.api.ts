import { baseApi } from '@/redux/baseApi'
import type {} from '@/types'

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: ({ page = 1, limit = 10, type, startDate, endDate }) => {
        const params = new URLSearchParams()
        params.set('page', String(page))
        params.set('limit', String(limit))
        if (type) params.set('type', type)
        if (startDate) params.set('startDate', startDate)
        if (endDate) params.set('endDate', endDate)

        return {
          url: `/transactions?${params.toString()}`
        }
      },
    }),
  }),
})

export const { useGetTransactionsQuery } = transactionsApi