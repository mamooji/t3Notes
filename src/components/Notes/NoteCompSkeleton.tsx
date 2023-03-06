import React from 'react'

const NoteCompSkeleton: React.FC = () => {
  return (
    <div className="mx-auto flex h-80 max-h-56 w-full transform  animate-pulse flex-col justify-between rounded-3xl  bg-blue-300 text-white duration-500 ease-in-out hover:scale-105">
      <div className="flex h-full flex-col p-4">
        <div className="flex w-full justify-between gap-2 ">
          <div className="text-4xl font-extrabold " />
          <button className=" h-10 w-10 flex-shrink-0 rounded-full bg-orange-300 pb-1 text-2xl font-extrabold duration-500 ease-in-out hover:bg-orange-500  " />
        </div>
        <div className=" w-full flex-auto overflow-hidden  break-words  "></div>
        <button className="m-auto h-10 w-28  rounded-3xl bg-blue-400 py-2 px-8 duration-500 ease-in-out hover:bg-blue-600 "></button>
      </div>
    </div>
  )
}

export default NoteCompSkeleton
