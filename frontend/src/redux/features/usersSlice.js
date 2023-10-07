import { usersApi } from "../api/usersApiSlice";

export const userSlice = usersApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: () => "/users",
    }),
  }),
});

export const { useGetUsersListQuery } = userSlice;
