import React from 'react'
import NoteItem from './NoteItem'

const NoteArchivedList = ({archivedNotes, onDelete, onMove }) => {
  return (
    <div className='notes-list'>
    {
        archivedNotes.map((arNote) => (
            <NoteItem 
                key={arNote.id}
                id={arNote.id}
                createdAt={arNote.createdAt}
                archived={arNote.archived}
                onDelete={onDelete}
                onMove={onMove}
                {...arNote} />
        ))
    }
    </div>
  )
}

export default NoteArchivedList