import { useEffect, useState } from "react";
import { useGetTodosQuery, useChangeTodoStatusMutation, useAddTodoMutation, useDeleteTodoMutation, useGetSingleTodoQuery } from "../../redux/features/todoCrudSlice";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const TodoCrud = () => {
  const navigate = useNavigate();

  const [text, setText] = useState("");

  const [open, setOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(true);
    setSelectedId(id)
    // setSelectedStatus(singTodoData?.status === "true" ? true : false)
  };




  const handleClose = () => {
    setOpen(false);
  };

  const { data, isError, error, isFetching, isSuccess } = useGetTodosQuery();

  const { data: singTodoData, isError: singleTodoIsError, error: singleTodoError, isFetching: singleTodoIsFetching, isSuccess: singleTodoIsSuccess } = useGetSingleTodoQuery(selectedId, { skip: !selectedId })

  const [toggleTodo, { isError: toggleIsError, error: toggleError, isFetching: toggleIsFetching, isSuccess: toggleIsSuccess, reset: toggleReset }] = useChangeTodoStatusMutation();

  const [addTodo, { isFetching: addIsFetching, isError: addIsError, error: addError, isSuccess: addIsSuccess, reset: addReset }] = useAddTodoMutation()

  const [deleteTodo, { isFetching: deleteIsFetching, isError: deleteIsError, error: deleteError, isSuccess: deleteIsSuccess, reset: deleteReset }] = useDeleteTodoMutation()

  const [editText, setEditText] = useState("");

  const handleToggle = (item) => {
    toggleTodo({ id: item._id, status: item.status == "true" ? false : true })
  }

  const handleAddTodo = () => {
    addTodo(text)
  }



  const editTextClick = (id) => {
    console.log(id)
  }

  const [selectedStatus, setSelectedStatus] = useState("")

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value)
  }

  console.log("selectedStatus", selectedStatus)

  useEffect(() => {
    if (singTodoData) {
      setEditText(singTodoData?.text)
      setSelectedStatus(singTodoData?.status === "true" ? true : false)
    }
  }, [singTodoData])

  useEffect(() => {
    if (toggleIsError) {
      alert(JSON.stringify(toggleError))
      toggleReset()
    } else if (toggleIsSuccess) {
      alert("successfully toggled status")
      toggleReset()
    }

    if (addIsSuccess) {
      alert("todo added successfully")
      addReset()
      setText("")
    } else if (addIsError) {
      alert(JSON.stringify(addError))
      addReset()
    }

    if (deleteIsError) {
      alert(JSON.stringify(deleteError))
      deleteReset()
    } else if (deleteIsSuccess) {
      alert("todo deleted successfully")
      deleteReset()
    }

  }, [toggleIsError, toggleIsSuccess, addIsSuccess, addIsError, deleteIsError, deleteIsSuccess])




  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <h1>Todo Crud</h1>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "5px" }}>
        <div>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={handleAddTodo} disabled={addIsFetching} >
            {addIsFetching ? "Loading" : "Add"}
          </button>
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
        ) : data?.length == 0 ? (
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
              data?.map(item => (
                <div key={item._id} style={{ display: "flex", justifyContent: "center" }}>
                  {item.text} - {item.status}
                  {toggleIsFetching ? (<div>Loading Toggle</div>) :
                    <button onClick={() => handleToggle(item)} >Toggle Status</button>
                  }
                  <button onClick={() => navigate(`/todo-crud/${item._id}`)}>View</button>
                  <button onClick={() => handleClickOpen(item._id)}>Edit</button>
                  <button onClick={() => deleteTodo({ id: item._id })} disabled={deleteIsFetching} >
                    {deleteIsFetching ? "Loading" : "Delete"}
                  </button>
                </div>
              ))
            }
            {open &&
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  {
                    singleTodoIsFetching ? (
                      <div
                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                      >
                        Loading...
                      </div>
                    ) : singleTodoIsError ? (
                      <div
                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                      >
                        <h4>{singleTodoError.status}</h4>
                      </div>
                    ) : singleTodoIsSuccess ? (
                      <>
                        <h1>Edit Data</h1>
                        <form>
                          <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} required />
                          <select onChange={handleStatusChange} defaultValue={selectedStatus} required>
                            <option value="">Select an option</option>
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                          </select>
                          <button onClick={() => editTextClick(selectedId)}>Edit Text</button>
                        </form>
                      </>
                    ) : ""
                  }
                </DialogContent>
              </Dialog>
            }
          </>
        ) : ""
      }
    </div>
  )
}

export default TodoCrud