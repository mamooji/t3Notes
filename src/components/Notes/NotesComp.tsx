import React from 'react'
import NoteComp from './NoteComp'
import { trpc } from '../../utils/trpc'
import { Note } from '@prisma/client'

const NotesComp: React.FC = () => {
  const notes = trpc.note.findNotesByUserId.useQuery()
  if (notes.data?.length === 0) {
    return null
  }
  return (
    <>
      {notes.data && (
        <>
          <div className="mt-4 rounded-full bg-blue-600 p-4 text-center text-3xl font-extrabold text-white">
            Filter
          </div>
          <div className="my-4 grid grid-cols-1 gap-4 rounded-3xl bg-blue-200 p-4  sm:grid-cols-2 lg:grid-cols-3">
            {notes.data.map((note: Note) => {
              return <NoteComp key={note.id} note={note} />
            })}
          </div>
        </>
      )}
    </>
  )
}

export default NotesComp
