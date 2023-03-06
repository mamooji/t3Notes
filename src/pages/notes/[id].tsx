import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import UpdateNote from '../../components/Notes/UpdateNote'
import { trpc } from '../../utils/trpc'
import { SubmitHandler } from 'react-hook-form'
import { UpdateNoteInput } from '../../schema/note.schema'
import { toast } from 'react-toastify'
import UpdateNoteSkeleton from '../../components/Notes/UpdateNoteSkeleton'
import { NextPage } from 'next'

const NoteDetail: NextPage = () => {
  const utils = trpc.useContext()
  const router = useRouter()
  const id = router.query.id as string
  const {
    data: note,
    isSuccess,
    isLoading,
    isError,
  } = trpc.note.findNoteById.useQuery(
    { noteId: id },
    {
      onError: (e) => {
        toast.error(e.message)
      },
    }
  )

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
      toast.success('Note Updated')
    } catch (e) {
      console.log(e)
      toast.error('Could not update note')
      console.log(updateNote)
    }
  }
  useEffect(() => {
    console.log({ isLoading, isError, isSuccess })
  }, [isLoading, isError, isSuccess])

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
        <UpdateNoteSkeleton />
      )}
    </Layout>
  )
}

export default NoteDetail
