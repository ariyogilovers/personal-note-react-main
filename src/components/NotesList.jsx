import React from 'react'
import NoteItem from './NoteItem'

// ini const NotesList nya
const NotesList = ({notes, onDelete, onArchive }) => {

  return (
    <div className='notes-list'>
    {
        notes.map((note) => (
            <NoteItem 
                key={note.id}
                id={note.id}
                createdAt={note.createdAt}
                archived={note.archived}
                onDelete={onDelete}
                onArchive={onArchive}
                {...note} />
        ))
    }
    </div>
  )
}

export default NotesList