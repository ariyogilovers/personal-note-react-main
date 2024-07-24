import React from "react";

// Class NoteInput
class NoteInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            charLimit: 50
        }
        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    // onTitleChangeEventHandler
    onTitleChangeEventHandler(event) {
        const charLimit = 50;
        const newTitle = event.target.value.slice(0, charLimit);

        this.setState({
            title: newTitle,
            charLimit: charLimit - newTitle.length
        });
    }

    // onBodyChangeEventHandler
    onBodyChangeEventHandler(event) {
        this.setState({
            body: event.target.value
        });
    }

    // onSubmitEventHandler
    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNotes(this.state);
        this.setState({
            title: '',
            body: '',
            charLimit: 50
        });
    }

    render() {
        return (
            <form className="note-input__body" onSubmit={this.onSubmitEventHandler}>
                <p className="note-input__title__char-limit">Sisa karakter: {this.state.charLimit}</p>
                <input 
                    type="text" 
                    placeholder="Ini adalah judul..." 
                    className="note-input__title" 
                    value={this.state.title} 
                    onChange={this.onTitleChangeEventHandler} 
                />
                <textarea 
                    placeholder="Tuliskan catatanmu di sini..." 
                    rows="9" 
                    value={this.state.body} 
                    onChange={this.onBodyChangeEventHandler}
                />
                <button type="submit">Buat</button>
            </form>
        );
    }
}

export default NoteInput;