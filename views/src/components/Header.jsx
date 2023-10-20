import React from 'react';
import { NavLink } from 'react-router-dom';

function Header(props) {

    const menuItems = [
        {
            name: "Events",
            link: "/events"
        },
        {
            name: "My Events",
            link: "/my-events"
        },
        {
            name: "Alumnis",
            link: "/features"
        },
        {
            name: "Contact",
            link: "/contact"
        },
    ]


    return (
        <header className='flex z-total justify-between px-5 items-center py-2 fixed w-full bg-white'>
            <NavLink to="/" className='text-3xl font-700 logo__gradient'>ALUmnis</NavLink>
            <nav className='mx-auto flex flex-1 justify-between'>
                <ul className='flex items-center gap-3 mx-auto nav__links'>
                    {menuItems.map((item, i)=>(
                        <li key={i}>
                            <NavLink to={item.link}>{item.name}</NavLink>
                        </li>
                    ))}
                </ul>
                <a className='main__btn' href="">LOGIN</a>
            </nav>            
        </header>
    );
}

export default Header;