import { apiSlice } from "../api/apiSlice";

export const todoCrudSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/newTodo",
      // providesTags: ["Todos"],
      providesTags: (result, error, arg) => {
        console.log("getAllTodoResult", result, error, arg);
        return result
          ? [
              ...result.map(({ _id }) => ({ type: "Todos", id: _id })),
              { type: "Todos", id: "LIST" },
            ]
          : [{ type: "Todos", id: "LIST" }];
      },
    }),
    getSingleTodo: builder.query({
      query: (id) => `/newTodo/${id}`,
      // providesTags: ["Todos"],
      providesTags: (result, error, id) => {
        console.log("getSingleTodo", result, error, id);
        return [{ type: "Todos", id }];
      },
    }),
    addTodo: builder.mutation({
      query: (text) => ({
        url: "/newTodo/save",
        method: "POST",
        body: { text },
      }),
      // invalidatesTags: ["Todos"],
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    changeTodoStatus: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/newTodo/status/${id}`,
        method: "PUT",
        body: rest,
      }),
      // invalidatesTags: ["Todos"],
      invalidatesTags: (result, error, arg) => {
        console.log("checkChangeTodo", result, error, arg);
        return [{ type: "Todos", id: arg.id }];
      },
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `newTodo/update/${id}`,
        method: "PUT",
        body: rest,
      }),
      // invalidatesTags: ["Todos"],
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/newTodo/delete/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["Todos"],
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetSingleTodoQuery,
  useChangeTodoStatusMutation,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoCrudSlice;
