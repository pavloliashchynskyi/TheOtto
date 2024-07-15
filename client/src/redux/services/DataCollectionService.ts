import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataCollectionAPI = createApi({
  reducerPath: "dataCollectionAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  //baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4444" }),
  tagTypes: ["collectedData"],
  endpoints: (build) => ({
    collectUserData: build.mutation({
      query: (dto: any) => ({
        url: "http://localhost:4444/collect-data",
        method: "POST",
        body: dto,
      }),
      transformErrorResponse: (response: any) => response?.data?.data?.err,
      invalidatesTags: ["collectedData"],
    }),
    sendCollectedDataToAPI: build.mutation({
      query: (dto: any) => ({
        url: "https://laas-dev.spvie.com/api/Projects/",
        method: "POST",
        headers: {
          "Authorization-Broker-Code": "60169",
          "Authorization-Broker-Token": "30d2a5a5-a33b-4ad0-8ce0-009b669a56d7",
        },
        body: dto,
      }),
      transformErrorResponse: (response: any) => response.errors,
    }),
    fetchCollectedUserDataFromDB: build.query({
      query: () => ({
        url: "http://localhost:4444/fetch-collected-data",
        method: "GET",
      }),
      transformErrorResponse: (response: any) => response?.data?.data?.err,
      providesTags: () => ["collectedData"],
    }),
  }),
});
