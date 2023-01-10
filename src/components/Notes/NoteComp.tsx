import { Note } from '@prisma/client'
import React, { useState } from 'react'
import { trpc } from '../../utils/trpc'
import Modal from '../Modal'
interface Props {
  note: Note
}
const NoteComp: React.FC<Props> = ({ note }) => {
  const [showModal, setShowModal] = useState(false)
  const { body, createdAt, id, title, updatedAt, userId } = note
  const utils = trpc.useContext()
  const deleteNote = trpc.note.deleteNote.useMutation({
    // async onMutate(notes)
    onMutate: async () => {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.note.findNotesByUserId.cancel()
      // Get the data from the queryCache
      const prevData = utils.note.findNotesByUserId.getData()

      // Optimistically update the data with our new post
      if (prevData) {
        utils.note.findNotesByUserId.setData(prevData)
      }
    },
    onSettled() {
      // Sync with server once mutation has settled
      utils.note.findNotesByUserId.invalidate()
    },
  })
  const updateNote = trpc.note.updateNoteById.useMutation({
    // async onMutate(notes)
    onMutate: async () => {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.note.findNotesByUserId.cancel()
      // Get the data from the queryCache
      const prevData = utils.note.findNotesByUserId.getData()

      // Optimistically update the data with our new post
      if (prevData) {
        utils.note.findNotesByUserId.setData(prevData)
      }
    },
    onSettled() {
      // Sync with server once mutation has settled
      utils.note.findNotesByUserId.invalidate()
    },
  })
  const handleDelete = async (id: string) => {
    try {
      await deleteNote.mutate({ id })
      setShowModal(false)
    } catch (e) {
      console.log(e)
    }
  }
  const handleUpdate = async (id: string) => {
    updateNote.mutate({
      noteId: id,
      title: 'L',
    })
  }

  return (
    <div
      key={id}
      className="mx-auto flex h-80 max-h-56 w-full  transform flex-col justify-between rounded-3xl  bg-blue-400 text-white duration-500 ease-in-out hover:scale-105"
    >
      <div className="flex h-full flex-col p-4">
        <div className="flex w-full justify-between gap-2 ">
          <h1 className="text-4xl font-extrabold ">{title}</h1>
          <button
            className=" h-10 w-10 flex-shrink-0 rounded-full bg-orange-400 pb-1 text-2xl font-extrabold hover:bg-orange-500  "
            onClick={() => setShowModal(!showModal)}
          >
            x
          </button>
        </div>

        <pre className=" w-full flex-auto overflow-hidden  break-words  ">
          {body}
        </pre>
        <button
          className="m-auto  rounded-3xl bg-blue-500 py-2 px-8 hover:bg-blue-600 "
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

export default NoteComp
