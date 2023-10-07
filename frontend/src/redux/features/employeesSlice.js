import { apiSlice } from "../api/apiSlice";

export const employeesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeesTable: builder.query({
      query: ({ search, gender, status, sort, page }) =>
        `/employeesTable?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,
    }),
  }),
});

export const { useGetEmployeesTableQuery } = employeesSlice;
