import React from 'react'
import NoteComp from './NoteComp'
import { trpc } from '../../utils/trpc'
import { Note } from '@prisma/client'

const NotesComp: React.FC = () => {
  const notes = trpc.note.findNotesByUserId.useQuery()
  return (
    <>
      {notes.data && (
        <div className="my-4 grid grid-cols-1 gap-4 rounded-3xl bg-blue-200 p-4  sm:grid-cols-2 lg:grid-cols-3">
          {notes.data.map((note: Note) => {
            const { id, body, title } = note
            return <NoteComp body={body} id={id} title={title} key={id} />
          })}
        </div>
      )}
    </>
  )
}

export default NotesComp
