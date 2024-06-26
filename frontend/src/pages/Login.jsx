import React from 'react';
import Form from '../components/Form';
import '../styles/login.css';

function Login() {
    return (
        <div className="login-page">
            <div className="login-content">
                <div className="login-image-placeholder">
                    <img
                        src="src/assets/background.jpg"
                        alt="background"
                        className="login-background-image"
                    />
                </div>
                <div className="login-form-container" style={{ marginRight: '100px', marginLeft: 'auto' }}>
                    <div className="login-form-wrapper">
                        <Form route="/api/token/" method="login" />
                    </div>
                </div>
            </div>
            <img
                src="src/assets/tukey.png"
                alt="new-image"
                className="login-corner-image"
            />
            <div className="login-header">
                <div className="login-circle"></div>
                <span className="login-logo-text">TUKEY</span>
            </div>
        </div>
    );
}

export default Login;
