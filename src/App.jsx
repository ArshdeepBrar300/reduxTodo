import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './components/Todo'
import AddTodo from './components/AddTodo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='text-5xl text-gray-700 font-extrabold flex justify-center align-middle'>TASK TRACKER</div>
      <AddTodo />
      <Todo />
    </>
  )
}

export default App
