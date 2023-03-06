import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CreateNoteInput, createNoteSchema } from '../../schema/note.schema'
import { trpc } from '../../utils/trpc'
import NotesComp from './NotesComp'
import { toast } from 'react-toastify'

const CreateNote: React.FC = () => {
  const utils = trpc.useContext()
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
  const onSubmit: SubmitHandler<CreateNoteInput> = async (values) => {
    try {
      await createNote.mutateAsync({
        title: values.title,
        body: values.body,
      })
      toast.success('Note Created')
      reset()
    } catch (e) {
      console.log(e)
      console.log(createNote)
    }
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
            <p className=" font-extrabold text-orange-400">
              {errors.title.message}
            </p>
          )}
          <hr className=" my-2 h-1 rounded-lg border-none bg-white opacity-40" />
          <textarea
            className=" h-60 w-full bg-blue-400 text-3xl font-extrabold text-white placeholder-white outline-none placeholder:text-3xl placeholder:font-extrabold"
            placeholder="Note Body"
            disabled={isSubmitting}
            {...register('body')}
          />
          {createNote.error && (
            <p className=" font-extrabold text-orange-400">
              {createNote.error.message}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-orange-400 py-2 px-4 font-bold text-white duration-500 ease-in-out hover:bg-orange-500"
          >
            Create Note
          </button>
        </div>
      </form>
      <NotesComp />
    </div>
  )
}

export default CreateNote
