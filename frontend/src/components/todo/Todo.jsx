import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, removeTodo } from '../../redux/features/todoSlice';


const Todo = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.todo);
  const [text, setText] = useState("");

  const handleAddTodo = (payload) => {
    dispatch(addTodo(payload))
    setText("")
  }

  const handleDeleteTodo = (index) => {
    dispatch(removeTodo(index))
  }

  return (
    <div>
      <h1>Todo</h1>

      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => handleAddTodo(text)} >Add</button>
      <div>
        {data.map((item, index) => {
          return (
            <div key={index} style={{ marginTop: "5px" }} >
              {item}
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => handleDeleteTodo(item)}
              >Delete</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Todo