import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm, SubmitHandler } from 'react-hook-form'
import { CreateNoteInput, createNoteSchema } from '../schema/note.schema'
import { trpc } from '../utils/trpc'
import Note from './Note'

const CreateNote: React.FC = () => {
  const utils = trpc.useContext()
  const notes = trpc.note.findNotesByUserId.useQuery()
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
  const createNote = trpc.note.saveNote.useMutation({
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
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateNoteInput>({
    defaultValues: {
      title: '',
      body: '',
    },
    mode: 'onChange',
    resolver: zodResolver(createNoteSchema),
  })
  const onSubmit: SubmitHandler<CreateNoteInput> = (values) => {
    createNote.mutateAsync({
      title: values.title,
      body: values.body,
    })
    reset()
  }

  const handleDelete = async (id: string) => {
    deleteNote.mutate({ id })
  }
  const handleUpdate = async (id: string) => {
    updateNote.mutate({
      noteId: id,
      title: 'L',
    })
  }
  return (
    <div className=" px-6 lg:px-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col rounded-3xl bg-blue-400 p-4 ">
          <input
            className=" h-12 w-full bg-blue-400 text-4xl font-extrabold text-white placeholder-white outline-none placeholder:text-4xl placeholder:font-extrabold"
            type="text"
            placeholder="Note Title*"
            disabled={isSubmitting}
            {...register('title')}
          />
          {errors.title && (
            <p className=" font-extrabold text-red-400">
              {errors.title.message}
            </p>
          )}

          <textarea
            className=" h-60 w-full bg-blue-400 text-4xl font-extrabold text-white placeholder-white outline-none placeholder:text-4xl placeholder:font-extrabold"
            placeholder="Note Body"
            disabled={isSubmitting}
            {...register('body')}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          >
            Create Note
          </button>
        </div>
      </form>

      {notes.data && (
        <div className="my-4 grid grid-cols-1 gap-4 rounded-3xl bg-blue-200 p-4  sm:grid-cols-2 lg:grid-cols-3">
          {notes.data.map((note) => {
            const { id, body, title } = note
            return (
              <Note
                body={body}
                handleDelete={handleDelete}
                id={id}
                title={title}
                key={id}
                handleUpdate={handleUpdate}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CreateNote
