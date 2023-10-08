import { useGetUsersListQuery } from "../../redux/features/usersSlice"

const UsersList = () => {
  const { data, isFetching, isSuccess, isError, error, refetch } = useGetUsersListQuery();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <h1>Users List</h1>
          <button onClick={() => refetch()} >Refetch Data</button>
        </div>
      </div>
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
            <h4>{error.status}</h4>
          </div>
        ) : data?.data?.length == 0 ? (
          <div
            style={{
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
                <ul key={item.id} style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}>
                  <li>{item.first_name}</li>
                </ul>
              )
            }
          </>
        ) : ""
      }
    </div>
  )
}

export default UsersList