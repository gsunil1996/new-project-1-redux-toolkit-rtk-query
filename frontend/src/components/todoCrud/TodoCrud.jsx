
import { useEffect, useState } from "react";
import { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useGetSingleTodoQuery, useUpdateTodoMutation } from "../../redux/features/todoCrudSlice";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';


const TodoCrud = () => {
  const navigate = useNavigate();


  const [text, setText] = useState("");


  const [open, setOpen] = useState(false);


  const [selectedId, setSelectedId] = useState(null);


  const { data, isError, error, isFetching, isSuccess } = useGetTodosQuery();


  const { data: singTodoData, isError: singleTodoIsError, error: singleTodoError, isFetching: singleTodoIsFetching, isSuccess: singleTodoIsSuccess } = useGetSingleTodoQuery(selectedId, { skip: !selectedId })


  console.log("singTodoData", singTodoData)


  const [addTodo, { isFetching: addIsFetching, isError: addIsError, error: addError, isSuccess: addIsSuccess, reset: addReset }] = useAddTodoMutation()


  const [deleteTodo, { isFetching: deleteIsFetching, isError: deleteIsError, error: deleteError, isSuccess: deleteIsSuccess, reset: deleteReset }] = useDeleteTodoMutation()


  const [updateTodo, { isLoading: updateLoader, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError, reset: updateReset }] = useUpdateTodoMutation();


  const [editText, setEditText] = useState("");


  const handleAddTodo = () => {
    addTodo(text)
  }


  const [selectedStatus, setSelectedStatus] = useState(true)


  const handleStatusChange = (e) => {
    setSelectedStatus(JSON.parse(e.target.value));
  }


  const handleClickOpen = (id) => {
    setOpen(true);
    setSelectedId(id)
  };


  const handleClose = () => {
    setOpen(false);
    setSelectedStatus(true)
  };


  const handleUpdate = (e) => {
    e.preventDefault();
    updateTodo({ id: selectedId, text: editText, status: selectedStatus })
  }


  useEffect(() => {
    if (singTodoData) {
      setEditText(singTodoData?.text)
    }
  }, [singTodoData])


  useEffect(() => {


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


    if (isUpdateError) {
      alert(JSON.stringify(updateError))
      updateReset()
    } else if (isUpdateSuccess) {
      alert("todo updated successfully")
      updateReset()
      setOpen(false);
    }


  }, [addIsSuccess, addIsError, deleteIsError, deleteIsSuccess, isUpdateError, isUpdateSuccess])








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


                  <button onClick={() => navigate(`/todo-crud/${item._id}`)}>View</button>
                  <button onClick={() => handleClickOpen(item._id)}>Edit</button>
                  <button onClick={() => deleteTodo({ id: item._id })} disabled={deleteIsFetching} >
                    {deleteIsFetching ? "Loading" : "Delete"}
                  </button>
                </div>
              ))
            }


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
                  ) : singleTodoIsSuccess && singTodoData != undefined ? (
                    <>
                      <h1>Edit Data</h1>
                      <form onSubmit={handleUpdate}>
                        <input type="text" defaultValue={singTodoData?.status === "true" ? true : false} value={editText} onChange={(e) => setEditText(e.target.value)} required />
                        <select onChange={handleStatusChange} required>
                          <option value={true}>true</option>
                          <option value={false}>false</option>
                        </select>
                        <button type="submit" disabled={updateLoader}>{updateLoader ? <div>Loading...</div> : "Edit Text"}</button>
                      </form>
                    </>
                  ) : ""
                }
              </DialogContent>
            </Dialog>
          </>
        ) : ""
      }
    </div>
  )
}


export default TodoCrud
