import { apiSlice } from "../api/apiSlice";

export const todoCrudSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/newTodo",
      providesTags: ["Todos"],
    }),
    getSingleTodo: builder.query({
      query: (id) => `/newTodo/${id}`,
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (text) => ({
        url: "/newTodo/save",
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["Todos"],
    }),
    changeTodoStatus: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/newTodo/status/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/newTodo/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetSingleTodoQuery,
  useChangeTodoStatusMutation,
  useAddTodoMutation,
  useDeleteTodoMutation,
} = todoCrudSlice;
