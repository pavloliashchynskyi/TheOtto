import { configureStore } from "@reduxjs/toolkit";
import { dataCollectionAPI } from "./services/DataCollectionService";

export const store = configureStore({
  reducer: { [dataCollectionAPI.reducerPath]: dataCollectionAPI.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dataCollectionAPI.middleware),
});
