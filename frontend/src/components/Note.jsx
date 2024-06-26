import React from 'react';
import '../styles/Note.css';

function Note({ note, onDelete, showDashboard }) {
    const formatedDate = new Date(note.created_at).toLocaleDateString('en-US');

    return (
        <div className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p>{formatedDate}</p>
            {!showDashboard && (
                <button onClick={() => onDelete(note.id)}>Delete</button>
            )}
        </div>
    );
}

export default Note;
