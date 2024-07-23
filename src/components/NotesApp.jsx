import React from "react";
import NoteHeader from "./NoteHeader";
import NoteInput from "./NoteInput";
import NotesList from "./NotesList";
import NoteArchivedList from "./NoteArchivedList";
import { getInitialData, showFormattedDate } from "../utils/index.js";

// ini class NotesApp
class NotesApp extends React.Component {

    // ini constructor
    constructor(props) {
        super(props);
        this.state = {
            notes: getInitialData(),
            archiveNotes: []
        }
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onAddNotesHandler = this.onAddNotesHandler.bind(this);
        this.onMoveHandler = this.onMoveHandler.bind(this);
    }


    // ini onDeleteHandler by id
    onDeleteHandler(id) {
        const notes = this.state.notes.filter((note) => note.id !== id);
        this.setState({ notes });

        const updatedArchivedNotes = this.state.archiveNotes.filter(
            (note) => note.id !== id
          );
          this.setState({ archiveNotes: updatedArchivedNotes });
    }

    // ini onArchiveHandler by id
    onArchiveHandler(id) {
        this.setState((prevState) => {
            const updatedNotes = prevState.notes.filter((note) => note.id !== id);
            const archivedNote = prevState.notes.find((note) => note.id === id);
            const updatedArchivedNotes = [...prevState.archiveNotes, archivedNote]; 
        
            return {
                notes: updatedNotes,
                archiveNotes: updatedArchivedNotes 
            };
        });
    }

    // ini onMoveHandler by id
    onMoveHandler(id) {
        this.setState((prevState) => {
            const updatedNotes = prevState.notes.map((note) => {
                if (note.id === id) {
                    return {
                        ...note,
                        archived: true,
                    };
                }
                return note;
            });
    
            const movedNote = prevState.notes.find((note) => note.id === id);
    
            return {
                notes: updatedNotes,
                archiveNotes: [...prevState.archiveNotes, movedNote],
            };
        });
    }

    // ini onAddNotesHandler by title, body
    onAddNotesHandler({title, body}) {
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title: title,
                        body: body,
                        createdAt: +new Date(),
                        archived: false,
                    }
                ]
            }
        })
    }

    render() {
        return (
            <>
            <NoteHeader />
            <div className='note-app__body'>
            <div className='note-input'>
            <h2>Buat catatan</h2>
            <NoteInput addNotes={this.onAddNotesHandler} />
            </div>
            <h2>Catatan Aktif</h2>
            <NotesList notes={this.state.notes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler}/>
            <h2>Arsip</h2>
            <NoteArchivedList archivedNotes={this.state.archiveNotes} onDelete={this.onDeleteHandler} onMove={this.onMoveHandler} />
            </div>
            </>
        )
    }
}

export default NotesApp;