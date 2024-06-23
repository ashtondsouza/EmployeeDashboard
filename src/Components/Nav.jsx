import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  const activeClass = 'bg-[#3b024c]';

  return (
    <>
      <ul className='flex flex-col justify-around bg-[#1c0134] h-screen fixed w-[300px] text-[#f5eded] text-3xl'>
        <li><h1 className='text-5xl'>AstraCoop©</h1></li>
        <li>
          <NavLink 
            to="/development" 
            className={({ isActive }) => isActive ? activeClass : ''}
          >
            {({ isActive }) => (
              <div className={`p-4 ${isActive ? activeClass : ''}`}>
                Home
              </div>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? activeClass : ''}
            end 
          >
            {({ isActive }) => (
              <div className={`p-4 ${isActive ? activeClass : ''}`}>
                Employees
              </div>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/development" 
            className={({ isActive }) => isActive ? activeClass : ''}
          >
            {({ isActive }) => (
              <div className={`p-4 ${isActive ? activeClass : ''}`}>
                Location
              </div>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/development" 
            className={({ isActive }) => isActive ? activeClass : ''}
          >
            {({ isActive }) => (
              <div className={`p-4 ${isActive ? activeClass : ''}`}>
                Pricing
              </div>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/development" 
            className={({ isActive }) => isActive ? activeClass : ''}
          >
            {({ isActive }) => (
              <div className={`p-4 ${isActive ? activeClass : ''}`}>
                About us
              </div>
            )}
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Nav;
