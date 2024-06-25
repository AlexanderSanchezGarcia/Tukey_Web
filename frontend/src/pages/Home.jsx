import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div className="container">
            <div className="sidebar">
                <nav>
                    <h2>TUKEY</h2>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a href="#">Blog</a>
                        </li>
                        <li className="nav-item">
                            <a href="#">
                                <img src="/src/assets/icons/post.png" alt="Projects" />
                                Projects
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#">
                                <img src="/src/assets/icons/newspaper.png" alt="News" />
                                News
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#">Browse New Channels</a>
                        </li>
                        <li className="nav-item">
                            <a href="#">
                                <img src="/src/assets/icons/social-network-1.png" alt="Social Media" />
                                Social Media
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#">
                                <img src="/src/assets/icons/share.png" alt="Share" />
                                Share profile
                            </a>
                        </li>
                    </ul>
                </nav>
                <img src="/src/assets/icons/Tukey_fron.png" alt="Pavito" />
            </div>
            <div className="content">
                <div className="header">
                    <h2>Notes</h2>
                    <div className="search-container">
                        <input type="text" className="search-input" placeholder="Search" />
                    </div>
                </div>
                <div className="notes-grid">
                    {notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))}
                </div>
                <h2>Create a Note</h2>
                <form onSubmit={createNote} className="create-note-form">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default Home;
