import { useGetUsersListQuery } from "../../redux/features/usersSlice"

const UsersList = () => {
  const { data, isFetching, isSuccess, isError, error, refetch } = useGetUsersListQuery();

  return (
    <div>
      {
        isFetching ? (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            Loading...
          </div>
        ) : isError ? (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <h4>{error.message}</h4>
          </div>
        ) : data?.data?.length == 0 ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1>No Data Found</h1>
          </div>
        ) : isSuccess ? (
          <>
            {
              data?.data?.map(item =>
                <ul key={item.id}>
                  <li>{item.first_name}</li>
                </ul>
              )
            }
            <button onClick={() => refetch()} >Refresh</button>
          </>
        ) : ""
      }
    </div>
  )
}

export default UsersList