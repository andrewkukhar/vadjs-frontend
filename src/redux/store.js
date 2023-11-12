import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import emailsApi from "../services/emails";
import djsApi from "../services/djs";

const store = configureStore({
  reducer: {
    [emailsApi.reducerPath]: emailsApi.reducer,
    [djsApi.reducerPath]: djsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(emailsApi.middleware)
      .concat(djsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
