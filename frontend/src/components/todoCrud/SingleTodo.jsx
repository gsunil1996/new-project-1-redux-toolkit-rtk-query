import { useEffect } from "react";
import { useChangeTodoStatusMutation, useGetSingleTodoQuery } from "../../redux/features/todoCrudSlice"
import { useParams, useNavigate } from "react-router-dom";


const SingleTodo = () => {


  const { id } = useParams();
  const navigate = useNavigate();


  const { data, isSuccess, isError, error, isFetching } = useGetSingleTodoQuery(id);


  const [toggleTodo, { isError: toggleIsError, error: toggleError, isFetching: toggleIsFetching, isSuccess: toggleIsSuccess, reset: toggleReset }] = useChangeTodoStatusMutation();


  const handleToggle = () => {
    toggleTodo({ id, status: data.status == "true" ? false : true })
  }


  useEffect(() => {
    if (toggleIsError) {
      alert(JSON.stringify(toggleError))
      toggleReset()
    } else if (toggleIsSuccess) {
      alert("successfully toggled status")
      toggleReset()
    }
  }, [toggleIsError, toggleIsSuccess,])


  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <h1>Todo Details</h1>
          <button onClick={() => navigate(-1)} >Back</button>
          {toggleIsFetching ? (<div>Loading Toggle</div>) :
            <button onClick={handleToggle} >Toggle Status</button>
          }
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
