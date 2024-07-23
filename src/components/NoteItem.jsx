import React from 'react'
import NoteItemBody from './NoteItemBody'
import NoteItemAction from './NoteItemAction'

const NoteItem = ({id, title, createdAt, body, onDelete, onArchive, onMove, archieved}) => {
  return (
    <div className='note-item'>
        <NoteItemBody title={title} body={body} createdAt={createdAt} />
        <NoteItemAction id={id} onDelete={onDelete}  onArchive={onArchive} onMove={onMove} isArchived={archieved}/>
    </div>
  )
}

export default NoteItem
