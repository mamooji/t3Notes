import React, { useState } from 'react'
import NoteComp from './NoteComp'
import { trpc } from '../../utils/trpc'
import { Note } from '@prisma/client'
import useDebounce from '../../utils/useDebounce'
const getNotes = (search: string) => {
  return trpc.note.findNotesByUserId.useQuery({ text: search })
}
const NotesComp: React.FC = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const notes = getNotes(debouncedSearch)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  return (
    <>
      <div className="mt-4 flex items-center justify-between rounded-full bg-blue-600 p-4 text-center text-3xl font-extrabold text-white">
        Filter
        <input
          type="text"
          id="search-filter"
          value={search}
          onChange={handleSearch}
          placeholder="search"
          className=" overflow-hidden rounded-full bg-blue-300 p-2 outline-none placeholder:pl-2 placeholder:text-white"
        />
      </div>
      <div className="my-4 grid grid-cols-1 gap-4 rounded-3xl bg-blue-200 p-4  sm:grid-cols-2 lg:grid-cols-3">
        {notes.data ? (
          notes.data.map((note: Note) => {
            return <NoteComp key={note.id} note={note} />
          })
        ) : notes.isLoading ? (
          <p className="font-extrabold text-white">Loading</p>
        ) : null}
      </div>
    </>
  )
}

export default NotesComp
