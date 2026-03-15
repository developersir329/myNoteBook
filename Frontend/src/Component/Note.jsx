import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from '../context/Auth'
import NoteCard from './NoteCard';
function Note() {
  let {myNotes,getmynotes} = useAuthState();
  useEffect(()=>{
    getmynotes();
  },[myNotes])
  return (
    <>
   <div className="mx-auto pt-12 px-6 max-w-xl text-center">
        <h1 className="text-3xl capitalize pb-10 font-bold dark:text-gray-800 sm:text-5xl">
          Your Notes on cloud <br />
          <strong className="font-bold text-red-700 p-3 sm:block">
            {" "}
            - safe and secure{" "}
          </strong>
        </h1>
        <Link
          to="/createnote"
          className="px-6 py-3 text-lg font-semibold rounded dark:bg-rose-600 dark:text-gray-50"
        >
          Create Notes
        </Link>
      </div>
      <div className="px-6 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <h1 className="text-3xl pb-10 font-bold leading-none max-md:text-xl">
          Your <span className="text-rose-500">Notes</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 inline"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </h1>
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
          {myNotes.length > 0 ? myNotes.map((elm)=>{
            return <NoteCard title={elm.title} description={elm.description}/>
          }) : ""}
        </div>
      </div>
    </>
  )
}

export default Note