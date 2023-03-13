import { Note } from '@prisma/client'
import React, { useState } from 'react'
import { trpc } from '../../utils/trpc'
import { useRouter } from 'next/router'
import Modal from '../Modal'
import { toast } from 'react-toastify'
import DeleteIcon from '../Icons/DeleteIcon'
import EditIcon from '../Icons/EditIcon'
import CopyIcon from '../Icons/CopyIcon'
interface Props {
  note: Note
}
const NoteComp: React.FC<Props> = ({ note }) => {
  const [showModal, setShowModal] = useState(false)
  const { body, createdAt, id, title, updatedAt, userId } = note
  const utils = trpc.useContext()
  const router = useRouter()
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/notes/' + id)
  }
  const handleDelete = async (id: string) => {
    try {
      await deleteNote.mutate({ id })
      setShowModal(false)
      toast.success('Note Deleted')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div
      key={id}
      className="mx-auto flex h-80 max-h-56 w-full transform flex-col justify-between rounded-3xl  bg-blue-400 text-white duration-500 ease-in-out hover:scale-105"
    >
      <div className="flex h-full flex-col p-4">
        <div className="flex w-full items-start justify-between gap-2 ">
          <h1 className="text-4xl font-extrabold ">{title}</h1>
          <button onClick={() => setShowModal(!showModal)}>
            <DeleteIcon />
          </button>
        </div>

        <pre className=" w-full flex-auto overflow-hidden  break-words  ">
          {body}
        </pre>
        <div className="flex w-full items-center justify-between pt-1">
          <button onClick={handleClick}>
            <EditIcon />
          </button>
          <p className="text-sm font-extrabold ">
            {createdAt.toLocaleDateString('en-US')}
          </p>
          <button
            onClick={() => {
              navigator.clipboard
                .writeText(title + '\n' + body)
                .then(() => {
                  toast.success('Note Copied')
                })
                .catch(() => {
                  toast.error('Unable to Copy to clipboard')
                })
            }}
          >
            <CopyIcon />
          </button>
        </div>
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
