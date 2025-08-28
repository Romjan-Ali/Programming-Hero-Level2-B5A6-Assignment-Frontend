import { baseApi } from "@/redux/baseApi"

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    cashIn: builder.mutation({
      query: (body) => ({
        url: "/wallet/cash-in",
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["Transactions"],
    }),

    cashOut: builder.mutation({
      query: (body) => ({
        url: "/wallet/cash-out",
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
})

export const {
  useCashInMutation,
  useCashOutMutation,
} = agentApi
