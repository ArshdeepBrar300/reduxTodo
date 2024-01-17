import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { removeTodo, changeStatus, swapTodos } from '../features/todo/todoSlice'
import { useDrag, useDrop } from 'react-dnd'

function Todo() {

  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  const DraggableTodo = ({ todo, index }) => {

    const [, ref, preview] = useDrag({ type: 'TODO', item: { id: todo.id, index }, });
    const [, drop] = useDrop({
      accept: 'TODO', hover: (draggedItem) => {
        if (draggedItem.index !== index) {
          dispatch(swapTodos({ sourceIndex: draggedItem.index, targetIndex: index })); draggedItem.index = index; // Update the index for the dragged item
        }
      },
    });
    return (
      <li draggable={true} ref={node => { ref(drop(node)); preview(node); }} className={` flex justify-around md:justify-between items-center px-1 md:px-4 py-2  w-full  ${todo.status === 'pending' ? 'bg-orange-400' : 'bg-zinc-800'}`} key={todo.id} >

        <div className='flex-col'>
          <div className='text-white w-16 text-ellipsis overflow-hidden md:w-40 font-bold text-lg '>{todo.text}</div>
          <div className={`text-xs w-20 text-ellipsis overflow-hidden  font-semibold ${todo.status == 'completed' && 'text-white'}`}>{todo.date}</div>
        </div>


        <div className='text-white w-20 md:w-60'>
          Status : {todo.status}
        </div>


        <div className='md:w-30  w-24 '>
          <select name="status" className='text-md w-16 md:text-md md:w-32 ' onChange={(e) => {

            dispatch(changeStatus({ id: todo.id, status: e.target.value }))
          }}>
            <option value="Select" disabled selected hidden>Select...</option>
            <option label='Completed' id='completed' value="completed">Completed</option>
            <option id='pending' value="pending" label='Pending'>Pending</option>

          </select>



        </div>




        <button
          onClick={() => {
            console.log(todo.id)

            dispatch(removeTodo({ id: todo.id }))
          }}

          className="text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded text-sm md:text-md md:px-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </li>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div >
        {todos.length == 0 ? <div className='flex justify-center align-middle from-neutral-600 text-sm md:text-xl mt-12 py-4 '> No Tasks Yet !</div> :
          <div className='font-bold text-sm md:text-xl mt-12 py-4 flex justify-start px-0'>Your Tasks</div>}
        <ul className="list-none">
          {todos.map((todo, index) => {
            if (todo.status == 'pending')
              return <DraggableTodo key={todo.id} todo={todo} index={index} />
          })}
          {todos.map((todo, index) => {
            if (todo.status == 'completed')
              return <DraggableTodo key={todo.id} todo={todo} index={index} />
          })}
        </ul>
      </div>
    </DndProvider>
  )
}

export default Todo