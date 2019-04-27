import React from 'react';
import UserInfo from './UserInfo';
import './profile.css';

const Profile = ({session}) => (
    <div className='profile'>
        <h1 className='profile_title'>Profile</h1>
        <div className='profile_user-info'>
            <UserInfo session={session}/>
        </div>
    </div>
);

export default Profile;