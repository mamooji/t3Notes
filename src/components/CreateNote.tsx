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
    <div className="px-6 lg:px-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-2  rounded-lg border-2 border-black p-4 ">
          <div>
            <input
              className="w-full outline-none"
              type="text"
              placeholder="Note Title*"
              disabled={isSubmitting}
              {...register('title')}
            />
            {errors.title && (
              <p className=" text-red-400">{errors.title.message}</p>
            )}
          </div>
          <div>
            <textarea
              className=" h-60 w-full outline-none "
              placeholder="Note Body"
              disabled={isSubmitting}
              {...register('body')}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          >
            Create Note
          </button>
        </div>
      </form>
      <div className=" flex flex-wrap justify-center gap-4 pt-4">
        {notes.data &&
          notes.data.map((note) => {
            const { id, body, title } = note
            console.log(body)
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
    </div>
  )
}

export default CreateNote
