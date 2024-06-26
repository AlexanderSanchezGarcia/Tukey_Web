import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import "../App.jsx";

function Home() {
    const [notes, setNotes] = useState([]);
    const [allNotes, setAllNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [showDashboard, setShowDashboard] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getNotes();
        getAllNotes();
        getUser();
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

    const getAllNotes = () => {
        api
            .get("/api/notes/all/")
            .then((res) => res.data)
            .then((data) => {
                setAllNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const getUser = () => {
        api
            .get("/api/user/")
            .then((res) => res.data)
            .then((data) => {
                setUser(data);
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
                getAllNotes();
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
                getAllNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div className="container">
            <div className="sidebar">
                <nav>
                    <div className="header-logo">
                        <div className="circle"></div>
                        <h2 className="logo-text">TUKEY</h2>
                    </div>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a href="https://www.instagram.com/weare_tukey?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                                <img src="/src/assets/icons/social-network-1.png" alt="Social Media" />
                                Social Media
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/logout">Logout</a>
                        </li>
                    </ul>
                </nav>
                <img src="/src/assets/icons/Tukey_fron.png" alt="Pavito" />
                <button onClick={() => setShowDashboard(!showDashboard)}>
                    {showDashboard ? "Hide Dashboard" : "Show Dashboard"}
                </button>
            </div>
            <div className="content">
                <div className="header">
                    <h2>Notes</h2>
                    {user && <h3>Bienvenido, {user.username}!</h3>}
                </div>
                {showDashboard ? (
                    <div className="home-dashboard">
                        <h2>All Notes</h2>
                        <div className="home-notes-grid">
                            {allNotes.map((note) => (
                                <Note note={note} key={note.id} showDashboard={showDashboard} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="home-dashboard">
                            <h2>My Notes</h2>
                        </div>
                        <div className="home-notes-grid">
                            {notes.map((note) => (
                                <Note note={note} onDelete={deleteNote} key={note.id} showDashboard={showDashboard} />
                            ))}
                        </div>
                        <h2>Create a Note</h2>
                        <form onSubmit={createNote} className="home-create-note-form">
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
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
