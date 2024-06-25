import React from 'react';
import Form from '../components/Form';
import '../styles/login.css';

function Login() {
    return (
        <div className="login-page">
            <nav className="navbar">
                <div className="logo">TUKEY</div>
                <ul className="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/join">Join</a></li>
                </ul>
            </nav>
            <div className="content">
                <div className="image-placeholder">
                    {/* Aquí puedes agregar tu imagen de fondo más tarde */}
                </div>
                <div className="login-form">
                    <Form route="/api/token/" method="login" />
                </div>
            </div>
        </div>
    );
}

export default Login;

