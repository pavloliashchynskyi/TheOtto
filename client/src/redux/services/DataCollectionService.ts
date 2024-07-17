import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CollectFormType } from "../../types/collectDataTypes";

export const dataCollectionAPI = createApi({
  reducerPath: "dataCollectionAPI",
  baseQuery: fetchBaseQuery({}),
  tagTypes: ["collectedData"],
  endpoints: (build) => ({
    collectUserData: build.mutation({
      query: (dto: CollectFormType) => ({
        url: "http://localhost:4444/collect-data",
        method: "POST",
        body: dto,
      }),
      transformErrorResponse: (response: any) => response?.data?.data?.err,
      invalidatesTags: ["collectedData"],
    }),
    sendCollectedDataToAPI: build.mutation({
      query: (dto: any) => {
        return {
          url: "https://cors-anywhere.herokuapp.com/https://laasb2c-dev.spvie.com/api/Products/ComputeIndividualProjectPrice",
          method: "POST",
          headers: {
            "Authorization-Broker-Code": 60169,
            "Authorization-Broker-Token": "30d2a5a5-a33b-4ad0-8ce0-009b669a56d7",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dto),
        };
      },
      transformErrorResponse: (response: any) => {
        return response.errors;
      },
    }),

    fetchCollectedUserDataFromDB: build.query({
      query: ({ limit = 10, offset = 0 }: { limit?: number; offset?: number }) => ({
        url: "http://localhost:4444/fetch-collected-data",
        method: "GET",
        params: {
          limit,
          offset,
        },
      }),
      transformErrorResponse: (response: any) => response?.data?.data?.err,
      providesTags: () => ["collectedData"],
    }),
  }),
});
