import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateNoteInput, createNoteSchema } from '../schema/note.schema'
const Test: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNoteInput>({
    defaultValues: {
      title: '',
      body: '',
    },
    mode: 'onChange',
    resolver: zodResolver(createNoteSchema),
  })

  const onSubmit: SubmitHandler<CreateNoteInput> = (values) => {
    console.log(values)
  }

  return (
    <div className="flex pt-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col justify-center"
      >
        <input type="text" placeholder="test" />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Test
