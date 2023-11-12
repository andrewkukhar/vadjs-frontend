import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const djsApi = createApi({
  reducerPath: "djApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/djs/`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("x-auth-token", token);
      }
      return headers;
    },
  }),
  tagTypes: ["DJ", "Events"],
  endpoints: (builder) => ({
    fetchDjData: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: ["DJ"],
    }),
    updateUserProfile: builder.mutation({
      query: ({ userId, profileData }) => ({
        url: `/${userId}/update`,
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["DJ"],
    }),
    updateUserProfileImage: builder.mutation({
      query: ({ userId, file }) => {
        const formData = new FormData();
        formData.append("image", file);
        return {
          url: `/${userId}/update-image`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["DJ"],
    }),
    fetchAllDjUpcomingEvents: builder.query({
      query: () => "/all-gigs",
      providesTags: ["Events"],
    }),
  }),
});

export const {
  useFetchDjDataQuery,
  useUpdateUserProfileMutation,
  useUpdateUserProfileImageMutation,
  useFetchAllDjUpcomingEventsQuery,
} = djsApi;

export default djsApi;
