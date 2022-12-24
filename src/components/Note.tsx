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
      className="mx-auto flex h-80 max-h-56 w-full  transform flex-col justify-between rounded-3xl  bg-blue-400 text-white duration-500 ease-in-out hover:scale-110"
    >
      <div className="flex h-full flex-col p-4">
        <div className="flex w-full justify-between gap-2">
          <h1 className="text-4xl font-extrabold ">{title}</h1>
          <button
            className=" h-10 w-10 flex-shrink-0 rounded-full bg-red-400 pb-1 text-2xl font-extrabold hover:bg-red-500  "
            onClick={() => setShowModal(!showModal)}
          >
            x
          </button>
        </div>

        <pre className=" w-full flex-auto overflow-x-auto overflow-y-auto break-words  ">
          {body}
        </pre>
        <button
          className="m-auto  rounded-3xl bg-blue-400 py-2 px-8 "
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
    </div>
  )
}

export default Note
