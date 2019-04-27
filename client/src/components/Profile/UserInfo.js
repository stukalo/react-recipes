import React from 'react';
import { Link } from 'react-router-dom';

const UserInfo = ({session}) => {
    const formatDate = date => {
        const dateString = new Date(date).toLocaleDateString('en-US');
        const timeString = new Date(date).toLocaleTimeString('en-US');
        return `${dateString} ${timeString}`;
    }

    return (
        <div>
            <h3>User Info</h3>
            <p>Username: {session.getCurrentUser.username}</p>
            <p>Email: {session.getCurrentUser.email}</p>
            <p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>
            <h3>{session.getCurrentUser.username}'s Favorites</h3>
            <ul>
                {session.getCurrentUser.favorites.map(favorite => (
                    <li key={favorite._id}>
                        <Link to={`/recipes/${favorite._id}`}>
                            <p>{favorite.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            {!session.getCurrentUser.favorites.length &&
            <p>
                <strong>You have no favorites currently. Go add some!</strong>
            </p>}
        </div>
    );
}


export default UserInfo;