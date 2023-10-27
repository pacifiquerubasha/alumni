import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { images } from '../utils/images';

function Header(props) {

    const {user} = useContext(AppContext);

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
            link: "/alumnis"
        },
        {
            name: "Contact",
            link: "/contact"
        },
    ]

    useEffect(()=>{
        console.log("UUUUUU", user)
    }, [])


    return (
        <header className='flex z-total justify-between px-5 items-center py-2 fixed w-full bg-white'>
            <NavLink to="/" className='text-3xl font-700 logo__gradient'>ALUmnis</NavLink>
            <nav className='mx-auto flex flex-1 justify-between items-center'>
                <ul className='flex items-center gap-3 mx-auto nav__links'>
                    {menuItems.map((item, i)=>(
                        <li key={i}>
                            <NavLink to={item.link}>{item.name}</NavLink>
                        </li>
                    ))}
                </ul>
                {user ?
                    <div>
                        <img src={images.user} alt="" className='profile__rounded border-main shadow-4 rounded-full cover' />
                    </div>

                    :
                    <NavLink to="/login" className='main__btn' href="">LOGIN</NavLink>

                }
            </nav>            
        </header>
    );
}

export default Header;