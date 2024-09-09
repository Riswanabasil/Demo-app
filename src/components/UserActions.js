import React from 'react';

function UserActions({ user, updateUserList }) {
    const toggleBlock = (email, currentStatus) => {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.map(u => {
            if (u.email === email) {
                return { ...u, blocked: !currentStatus };
            }
            return u;
        });
        localStorage.setItem('users', JSON.stringify(users));
        updateUserList();
    };

    return (
        <div>
            {user.blocked
                ? <button onClick={() => toggleBlock(user.email, user.blocked)}>Unblock</button>
                : <button onClick={() => toggleBlock(user.email, user.blocked)}>Block</button>
            }
            {}
        </div>
    );
}

export default UserActions;