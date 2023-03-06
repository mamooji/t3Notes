import React from 'react'

const UpdateNoteSkeleton: React.FC = () => {
  return (
    <div className=" px-6 lg:px-8">
      <div className="flex animate-pulse flex-col rounded-3xl bg-blue-400 p-4 ">
        <div className=" h-12 w-full rounded-3xl bg-blue-200 text-4xl font-extrabold text-white placeholder-white outline-none placeholder:text-4xl placeholder:font-extrabold" />
        <div className=" my-4 h-60 w-full rounded-3xl bg-blue-200 text-4xl" />
        <button
          type="submit"
          className=" h-10 rounded-full bg-orange-400 py-2 px-4 font-bold text-white duration-500 ease-in-out hover:bg-orange-500"
        />
      </div>
    </div>
  )
}

export default UpdateNoteSkeleton
