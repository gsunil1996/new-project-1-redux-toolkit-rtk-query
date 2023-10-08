import { useSelector, useDispatch } from 'react-redux'

import { useState } from 'react';
import { decrement, increment, incrementAsync, incrementByAmount } from '../../redux/features/counterSlice';
import Todo from '../todo/Todo';

const Counter = () => {
  const { value } = useSelector(state => state.counter);


  const dispatch = useDispatch()
  const [text, setText] = useState(0);

  const handleIncrement = () => {
    dispatch(increment())
  }

  const handleDecrement = () => {
    dispatch(decrement())
  }

  const handleIncrementByPayload = () => {
    dispatch(incrementByAmount(Number(text)))
  }

  const handleAsyncIncrement = () => {
    dispatch(incrementAsync(Number(text)))
  }

  return (
    <div>
      <div>
        <h1>Counter: {value}</h1>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <input type="number" name="" id="" onChange={(e) => setText(e.target.value)} />
        <button onClick={handleIncrementByPayload} >Add</button>
        <button onClick={handleAsyncIncrement} >Add Amount in Async</button>
      </div>
      <hr />
      <div>
        <Todo />
      </div>
    </div>
  )
}

export default Counter