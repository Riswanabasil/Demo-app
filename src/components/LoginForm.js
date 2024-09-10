import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css';  

function LoginForm() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            validateInput(e.target.name, e.target.value);
        }
    };

    const validateInput = (name, value) => {
        let tempErrors = { ...errors };
        switch (name) {
            case "email":
                const emailRegex = /\S+@\S+\.\S+/;
                tempErrors.email = emailRegex.test(value) ? "" : "Email is not valid.";
                break;
            case "password":
                tempErrors.password = value ? "" : "Password is required.";
                break;
            default:
                break;
        }
        setErrors(tempErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateInput('email', credentials.email);
        validateInput('password', credentials.password);
        if (formIsValid()) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === credentials.email && user.password === credentials.password);
            if (user) {
                navigate('/users');
            } else {
                alert('Invalid credentials');
            }
        } else {
            alert('Please fix the errors before submitting.');
        }
    };

    const formIsValid = () => {
        const isValid = Object.values(errors).every(x => x === "") && Object.values(credentials).every(x => x !== "");
        return isValid;
    };

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                {errors.email && <span className="error">{errors.email}</span>}
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                {errors.password && <span className="error">{errors.password}</span>}
                <button type="submit">Login</button>
                <p className="form-link">Don't have an account? <Link to="/register">Sign up</Link></p>
            </form>
        </div>
    );
}

export default LoginForm;
