import React, { useState } from 'react';
import './RegisterForm.css';  
import { Link } from 'react-router-dom'

function RegisterForm() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        validateInput(e.target.name, e.target.value);
    };

    const validateInput = (name, value) => {
        let tempErrors = {...errors};
        switch (name) {
            case "name":
                tempErrors.name = value.trim() === "" ? "Name is required." : "";
                break;
            case "email":
                const emailRegex = /\S+@\S+\.\S+/;
                tempErrors.email = emailRegex.test(value) ? "" : "Email is not valid.";
                break;
            case "password":
                tempErrors.password = value.length < 6 ? "Password must be at least 6 characters long." : "";
                break;
            case "confirmPassword":
                tempErrors.confirmPassword = value !== user.password ? "Passwords do not match." : "";
                break;
            default:
                break;
        }
        setErrors(tempErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formIsValid()) {
            const { confirmPassword, ...userData } = user;
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration Successful');
            setUser({ name: '', email: '', password: '', confirmPassword: '' }); // Reset form
        } else {
            alert('Please fix the errors in the form');
        }
    };

    const formIsValid = () => {
        const isValid = Object.values(errors).every(x => x === "") && Object.values(user).every(x => x !== "");
        return isValid;
    };

    return (
        <div className="register-form">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                {errors.name && <span className="error">{errors.name}</span>}
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                {errors.email && <span className="error">{errors.email}</span>}
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                {errors.password && <span className="error">{errors.password}</span>}
                <input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                <button type="submit">Register</button>
                <p className="form-link">Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}

export default RegisterForm;
