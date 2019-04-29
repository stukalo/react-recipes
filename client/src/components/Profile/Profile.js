import React from 'react';
import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';
import withAuth from '../withAuth';
import './profile.css';

const Profile = ({session}) => (
    <div className='profile'>
        <h1 className='profile_title'>Profile</h1>
        <div className='profile_user-info'>
            <UserInfo session={session}/>
            <UserRecipes username={session.getCurrentUser.username}/>
        </div>
    </div>
);

export default withAuth(session => session && session.getCurrentUser)(Profile);