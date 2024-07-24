import React from "react";
import NoteHeader from "./NoteHeader";
import NoteInput from "./NoteInput";
import NotesList from "./NotesList";
import NoteArchivedList from "./NoteArchivedList";
import { getInitialData, showFormattedDate } from "../utils/index.js";

// Class NotesApp
class NotesApp extends React.Component {
    // Constructor
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

    // onDeleteHandler by id
    onDeleteHandler(id) {
        const notes = this.state.notes.filter((note) => note.id !== id);
        const updatedArchivedNotes = this.state.archiveNotes.filter((note) => note.id !== id);
        this.setState({ notes, archiveNotes: updatedArchivedNotes });
    }

    // onArchiveHandler by id
    onArchiveHandler(id) {
        this.setState((prevState) => {
            const updatedNotes = prevState.notes.filter((note) => note.id !== id);
            const archivedNote = prevState.notes.find((note) => note.id === id);
            if (!archivedNote) return null;
            const updatedArchivedNotes = [...prevState.archiveNotes, archivedNote];
            return {
                notes: updatedNotes,
                archiveNotes: updatedArchivedNotes
            };
        });
    }

    // onMoveHandler by id
    onMoveHandler(id) {
        this.setState((prevState) => {
            const movedNote = prevState.notes.find((note) => note.id === id);
            if (!movedNote) return null;
            const updatedNotes = prevState.notes.filter((note) => note.id !== id);
            const updatedArchivedNotes = [...prevState.archiveNotes, movedNote];
            return {
                notes: updatedNotes,
                archiveNotes: updatedArchivedNotes
            };
        });
    }

    // onAddNotesHandler by title, body
    onAddNotesHandler({ title, body }) {
        const currentTimestamp = +new Date();
        const formattedDate = showFormattedDate(currentTimestamp);

        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: currentTimestamp,
                        title: title,
                        body: body,
                        createdAt: formattedDate,
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
                    {this.state.notes.length > 0 ? (
                        <NotesList notes={this.state.notes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} />
                    ) : (
                        <p>Tidak ada catatan</p>
                    )}
                    <h2>Arsip</h2>
                    {this.state.archiveNotes.length > 0 ? (
                        <NoteArchivedList archivedNotes={this.state.archiveNotes} onDelete={this.onDeleteHandler} onMove={this.onMoveHandler} />
                    ) : (
                        <p>Tidak ada arsip</p>
                    )}
                </div>
            </>
        )
    }
}

export default NotesApp;
