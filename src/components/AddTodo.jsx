import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'
function AddTodo() {

  const [input, setInput] = React.useState('')
  const [date, setDate] = React.useState('')

  const dispatch = useDispatch()
  const addTodoHandler = (e) => {
    e.preventDefault()
    console.log(date);
    if (date == '') return;
    dispatch(addTodo({ text: input, status: 'pending', date: new Date(date).toISOString().split('T')[0] }))
    setInput('')
    setDate('')
  }
  return (
    <form onSubmit={addTodoHandler} className=" mt-12 flex-col md:flex-row md:justify-center md:align-middle">

      <input
        type="text"
        className="bg-gray-800 rounded md:rounded-l-md border md:h-14 border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3  leading-8 transition-colors duration-200 ease-in-out w-full   "
        placeholder="Enter a Task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className='mt-2 customDatePickerWidth w-full flex-col bg-slate-200 px-2 '  >

        <DatePicker className='h-10 mb-2 mt-2 w-full block bg-slate-200 ' wrapperClassName="datepicker" value={`${date != '' ? new Date(date).toISOString().split('T')[0] : 'Choose Date'}`} dateFormat="yyyy-mm-dd" selected={date} onChange={(date) => { setDate(date); console.log('1'); }} />

      </div>




      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 md:h-14 py-1 px-3 m-0 focus:outline-none hover:bg-indigo-600  rounded md:rounded-r-md text-lg w-full  mt-2 "
      >
        Add Task
      </button>
    </form>
  )
}

export default AddTodo