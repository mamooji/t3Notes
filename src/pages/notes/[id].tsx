import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import UpdateNote from '../../components/Notes/UpdateNote'
import { trpc } from '../../utils/trpc'
import { SubmitHandler } from 'react-hook-form'
import { UpdateNoteInput } from '../../schema/note.schema'
import { toast } from 'react-toastify'

const NoteDetail: React.FC = () => {
  const utils = trpc.useContext()
  const router = useRouter()
  const id = router.query.id as string
  const {
    data: note,
    isSuccess,
    isLoading,
  } = trpc.note.findNoteById.useQuery({ noteId: id })

  const updateNote = trpc.note.updateNoteById.useMutation({
    // async onMutate(notes)
    onMutate: async () => {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.note.findNoteById.cancel()
      // Get the data from the queryCache
      const prevData = utils.note.findNoteById.getData()

      // Optimistically update the data with our new post
      if (prevData) {
        utils.note.findNoteById.setData(prevData)
      }
    },
    onSettled() {
      // Sync with server once mutation has settled
      utils.note.findNoteById.invalidate()
    },
  })
  const onSubmit: SubmitHandler<UpdateNoteInput> = async (values) => {
    try {
      updateNote.mutate({
        noteId: values.id,
        title: values.title,
        body: values.body,
      })
      toast.success('Note Updated', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } catch (e) {
      console.log(e)
      console.log(updateNote)
    }
  }
  console.log(updateNote)

  return (
    <Layout>
      {isSuccess ? (
        <UpdateNote
          title={note.title}
          body={note.body}
          id={note.id}
          onSubmit={onSubmit}
        />
      ) : (
        <p className="font-extrabold text-black">Loading...</p>
      )}
    </Layout>
  )
}

export default NoteDetail
