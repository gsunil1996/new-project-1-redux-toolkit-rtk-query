import { useGetSingleTodoQuery } from "../../redux/features/todoCrudSlice"
import { useParams, useNavigate } from "react-router-dom";

const SingleTodo = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isSuccess, isError, error, isFetching } = useGetSingleTodoQuery(id);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <h1>Todo Details</h1>
          <button onClick={() => navigate(-1)} >Back</button>
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
        ) : isSuccess ? (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {data?.text} - {data.status}
            </div>
          </>
        ) : ""
      }
    </div>
  )
}

export default SingleTodo