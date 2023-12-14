import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { images } from '../utils/images';
import { API_URL } from '../services/apis';

function Header(props) {

    const {user} = useContext(AppContext);

    const loggedOutItems = [
        {
            name: "Events",
            link: "/events"
        },
        
        {
            name: "Contact",
            link: "/contact"
        },
    ]

    const loggedInItems = [
        {
            name: "Events",
            link: "/events"
        },
        {
            name: "My Events",
            link: "/my-events"
        },
        {
            name: "Chats",
            link: "/chats"
        },
        {
            name: "Alumnis",
            link: "/alumnis"
        },
        {
            name: "Contact",
            link: "/contact"
        },
    ]

    const [menuItems, setMenuItems] = useState(loggedOutItems)


    return (
        <header className='flex z-total justify-between px-5 items-center py-2 fixed w-full bg-white site__header'>
            <div class="toggleContainer">
                <input type="checkbox" id="checkbox1" class="checkbox1 visuallyHidden"/>
                <label for="checkbox1">
                    <div class="hamburger hamburger1">
                        <span class="bar bar1"></span>
                        <span class="bar bar2"></span>
                        <span class="bar bar3"></span>
                        <span class="bar bar4"></span>
                    </div>
                </label>
            </div>     
            <NavLink to="/" className='text-3xl font-700 logo__gradient site__logo'>ALUmineers</NavLink>
            <nav className='mx-auto flex flex-1 justify-between items-center'>
                <ul className='flex items-center gap-3 mx-auto nav__links'>
                    {menuItems.map((item, i)=>(
                        <li key={i}>
                            <NavLink to={item.link}>{item.name}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>  
                      
            {user ?
                <NavLink to="/profile">
                    <img src={` ${user?.profilePicture ? `${API_URL}/images/${user?.profilePicture}`: images.user}`} alt="" className='profile__rounded border-main shadow-4 rounded-full cover' />
                </NavLink>

                :
                <NavLink to="/login" className='main__btn' href="">LOGIN</NavLink>

            }
        </header>
    );
}

export default Header;