import React, { useState } from 'react'
import NoteComp from './NoteComp'
import { trpc } from '../../utils/trpc'
import { type Note } from '@prisma/client'
import useDebounce from '../../utils/useDebounce'
import NoteCompSkeleton from './NoteCompSkeleton'
const getNotes = (search: string, filter: string) => {
  return trpc.note.findNotesByUserId.useQuery({ searchString: search, filter })
}
const NotesComp: React.FC = () => {
  const filterOptions = ['desc', 'asc']
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string>('desc')
  const debouncedSearch = useDebounce(search, 500)
  const notes = getNotes(debouncedSearch, filter)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const loadingNotes = [0, 1, 2, 3, 4]
  return (
    <>
      <div className="mt-4 flex items-center justify-between rounded-full bg-blue-600 p-4 text-center text-3xl font-extrabold text-white">
        Filter
        <select
          name="sort"
          className=" rounded-full border-none bg-blue-300 p-2 capitalize text-white focus:border-none focus:outline-none "
          onChange={(e) => {
            setFilter(e.target.value)
          }}
        >
          {filterOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
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
        {notes.isLoading
          ? loadingNotes.map((idx) => {
              return <NoteCompSkeleton key={idx} />
            })
          : notes?.data?.map((note: Note) => {
              return <NoteComp key={note.id} note={note} />
            })}
      </div>
    </>
  )
}

export default NotesComp
