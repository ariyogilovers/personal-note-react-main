import React from "react";
// ini class NoteInput
class NoteInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    //ini onTitleChangeEventHandler
    onTitleChangeEventHandler(event) {
        this.setState(() => {
            return {
                title: event.target.value
            }
        })
    }

    // ini onBodyChangeEventHandler
    onBodyChangeEventHandler(event) {
        this.setState(() => {
            return {
                body: event.target.value
            }
        })
    }

    // ini onSubmitEventHandler
    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNotes(this.state);
    }

    render() {
        return (
            <form className="note-input__body" onSubmit={this.onSubmitEventHandler}>
                <p className="note-input__title__char-limit">Sisa karakter: 50</p>
                <input type="text" placeholder="Ini adalah judul..." className="note-input__title" value={this.state.title} onChange={this.onTitleChangeEventHandler}></input>
                <textarea placeholder="Tuliskan catatanmu di sini..." rows="9" value={this.state.body} onChange={this.onBodyChangeEventHandler}></textarea>
                <button type="submit">Buat</button>
            </form>
        )
    }
}

export default NoteInput;