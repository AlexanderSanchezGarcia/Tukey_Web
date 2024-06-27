import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";
function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-page" style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <img
                src="src/assets/background.jpg"
                alt="background"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 100,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'blur(13px)',
                    zIndex: -1,
                }}
            />
            <div className="form-container" style={{ position: 'relative', zIndex: 1, marginLeft: '50px' }}>
                <h2>START FOR FREE</h2>
                <h3>{name === "login" ? "Log In" : "Create new account"}</h3>
                <p>Already a Member? <a href="/login">Log In</a></p>
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        className="form-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    {loading && <LoadingIndicator />}
                    <button className="form-button" type="submit">
                        {name === "login" ? "Log In" : "Sign In"}
                    </button>
                </form>
              
            </div>
            <img
                src="src/assets/tukey.png"
                alt="new-image"
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '150px',
                    height: '150px', 
                    zIndex: 1,
                }}
            />
            <div style={{ position: 'absolute', top: 0, left: 0, padding: '20px', zIndex: 1, display: 'flex', alignItems: 'center' }}>
                <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#ff69b4',
                    marginRight: '10px',
                }}></div>
                <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                    TUKEY
                </span>
            </div>
        </div>
    );
}

export default Form;