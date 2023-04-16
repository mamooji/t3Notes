import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  type UpdateNoteInput,
  updateNoteSchema,
} from '../../schema/note.schema'

interface Props {
  id: string
  title: string
  body?: string
  onSubmit: (params: UpdateNoteInput) => void
}
const UpdateNote: React.FC<Props> = ({ id, title, body, onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateNoteInput>({
    defaultValues: {
      id: id,
      title: title,
      body: body,
    },
    mode: 'onChange',
    resolver: zodResolver(updateNoteSchema),
  })

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
            className=" h-60 w-full bg-blue-400 text-3xl font-extrabold text-white placeholder-white outline-none placeholder:text-4xl placeholder:font-extrabold"
            placeholder="Note Body"
            disabled={isSubmitting}
            {...register('body')}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-orange-400 py-2 px-4 font-bold text-white duration-500 ease-in-out hover:bg-orange-500"
          >
            Update Note
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateNote
