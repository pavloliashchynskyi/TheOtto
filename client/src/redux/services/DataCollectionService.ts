import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataCollectionAPI = createApi({
  reducerPath: "dataCollectionAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4444" }),
  endpoints: (build) => ({
    collectUserData: build.mutation({
      query: (dto: any) => ({
        url: "/collect-data",
        method: "POST",
        body: dto,
      }),
      transformErrorResponse: (response: any) => response.data.data.err,
    }),
  }),
});
