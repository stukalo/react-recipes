import React from 'react';
import { NavLink } from 'react-router-dom';
import Signout from './Auth/Signout';

const Navbar = ({ session }) => (
  <nav className='navbar'>
      {session && session.getCurrentUser ?
          <NavbarAuth session={session}/> :
          <NavbarUnAuth/>
      }
  </nav>
);

const NavbarUnAuth = () => (
    <>
        <ul className='navbar_list'>
            <li>
                <NavLink to='/' exact>Home</NavLink>
            </li>
            <li>
                <NavLink to='/search'>Search</NavLink>
            </li>
            <li>
                <NavLink to='/signin'>Singnin</NavLink>
            </li>
            <li>
                <NavLink to='/signup'>Signup</NavLink>
            </li>
        </ul>
    </>
);

const NavbarAuth = ({ session }) => (
      <ul className='navbar_list'>
          <li>
              <NavLink to='/' exact>Home</NavLink>
          </li>
          <li>
              <NavLink to='/search'>Search</NavLink>
          </li>
          <li>
              <NavLink to='/recipe/add'>Add Recipe</NavLink>
          </li>
          <li>
              <NavLink to='/profile'>Profile</NavLink>
          </li>
          <li>
              <Signout/>
          </li>
          <li>
            <h4>Welcome, {session.getCurrentUser.username}</h4>
          </li>
      </ul>
);

export default Navbar;