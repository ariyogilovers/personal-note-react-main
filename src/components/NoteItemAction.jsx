import React from 'react'

const NoteItemAction = ({id, onDelete, onArchive, isArchived, onMove }) => {
  const handleArchive = () => {
    if(isArchived) {
      onMove(id)
    } else {
      onArchive(id)
    }
  }

  return (
    <div className='note-item__action'>
    <button className='note-item__delete-button' onClick={() => onDelete(id)}>Delete</button>
    <button className='note-item__archive-button' onClick={handleArchive} >{isArchived ? 'Pindahkan' : 'Arsip'}</button>
    </div>
  )
}

export default NoteItemAction