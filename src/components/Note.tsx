import React, { useState } from 'react'
import Modal from './Modal'
interface Props {
  id: string
  title: string
  body: string
  handleDelete: (id: string) => void
  handleUpdate: (id: string) => void
}
const Note: React.FC<Props> = ({
  body,
  id,
  title,
  handleDelete,
  handleUpdate,
}) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <div
      key={id}
      className=" flex h-80 max-h-56 w-full max-w-sm flex-col justify-between rounded-lg border-2 border-black"
    >
      <div className="relative">
        <button
          className=" absolute right-2 top-2 rounded-full bg-red-400 px-2 "
          onClick={() => setShowModal(!showModal)}
        >
          x
        </button>
      </div>
      <div className="flex h-10 flex-grow flex-col items-center  px-4 pt-2 pb-1">
        <h1 className=" py-2 text-2xl font-bold">{title}</h1>
        <pre className=" w-full flex-auto overflow-x-auto overflow-y-auto break-words  ">
          {body}
        </pre>
      </div>
      <button
        className=" mx-2 mb-4 rounded-full bg-blue-400 p-2 "
        onClick={() => handleUpdate(id)}
      >
        Update
      </button>
      <Modal
        id={id}
        deleteMethod={handleDelete}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </div>
  )
}

export default Note
