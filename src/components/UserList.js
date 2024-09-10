import React, { useState } from 'react';
import './UserList.css'; 

function UserList() {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
    const [editUser, setEditUser] = useState(null);

    const handleRemove = (email) => {
        const updatedUsers = users.filter(user => user.email !== email);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };

    const handleEditChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value });
    };

    const submitEdit = () => {
        const updatedUsers = users.map(user => {
            if (user.email === editUser.email) {
                return { ...user, name: editUser.name, email: editUser.email };
            }
            return user;
        });
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        setEditUser(null);
    };

    return (
        <div className="user-list-container">
            <h1>User Management</h1>
            <div className="user-grid">
                {users.map((user, index) => (
                    <div key={index} className="user-card">
                        {editUser && editUser.email === user.email ? (
                            <div className="edit-form">
                                <input type="text" name="name" value={editUser.name} onChange={handleEditChange} placeholder="Name"/>
                                <input type="email" name="email" disabled value={editUser.email} onChange={handleEditChange} placeholder="Email"/>
                                <button onClick={submitEdit} className="btn submit-btn">Save</button>
                            </div>
                        ) : (
                            <div className="user-details">
                                <span className="user-name">{user.name}</span>
                                <span className="user-email">{user.email}</span>
                                <div className="actions">
                                    <button onClick={() => setEditUser(user)} className="btn edit-btn">Edit</button>
                                    <button onClick={() => handleRemove(user.email)} className="btn remove-btn">Remove</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserList;