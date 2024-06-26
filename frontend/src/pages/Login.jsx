import React from 'react';
import Form from '../components/Form';
import '../styles/login.css';

function Login() {
    return (
        <div className="login-page">
            <div className="content">
                <div className="image-placeholder">
                    <img
                        src="src/assets/background.jpg"
                        alt="background"
                        className="background-image"
                    />
                </div>
                <div className="login-form-container" style={{ marginRight: '100px', marginLeft: 'auto' }}>
                    <div className="form-wrapper">
                        <Form route="/api/token/" method="login" />
                    </div>
                </div>
            </div>
            <img
                src="src/assets/tukey.png"
                alt="new-image"
                className="corner-image"
            />
            <div className="header">
                <div className="circle"></div>
                <span className="logo-text">TUKEY</span>
            </div>
        </div>
    );
}

export default Login;
