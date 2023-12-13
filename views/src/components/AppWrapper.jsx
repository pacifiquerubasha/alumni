import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { images } from '../utils/images';
import { AppContext } from '../AppContext';
import { getCurrentUser, API_URL, token } from '../services/apis';


function AppWrapper({title, children}) {

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);

    const navigate = useNavigate();
    const alumniMenuItems = [
        {
            name:"Dashboard",
            link:"/dashboard",
            icon:"fas fa-tachometer"
        },
        {
            name:"Events",
            link:"/alumni-events",
            icon:"fas fa-calendar"
        },
        {
            name:"My Events",
            link:"/my-events",
            icon:"fas fa-calendar-check"
        },        
    ]
    
    const [menuItems, setMenuItems] = useState(alumniMenuItems);

    const getUser = async()=>{

        setLoadingUser(true)
        try {
        const token = localStorage.getItem("alumneersToken");

        const response = await getCurrentUser(token);
        if(response.data.user){
            setUser(response.data.user)
            // Check if user is manager
            if(response?.data?.user.role === "manager"){
                setMenuItems([
                    ...alumniMenuItems,
                    {
                        name:"Alumni",
                        link:"/alumni",
                        icon:"fas fa-users"
                    },
                    {
                        name:"News",
                        link:"/news",
                        icon:"fas fa-newspaper"
                    },
                ])


            }
            else{
                //Check if path has /news or /alumni. If it has redirect to /dashboard
                if(window.location.pathname.includes("/news") || window.location.pathname.includes("/alumni/")){
                    navigate("/dashboard")
                }
            }
            
        }

        else{
            navigate("/login")
        }
        
        } catch (error) {
            console.log(error)
            navigate("/login")
        }
        finally{
            setLoadingUser(false)
        }

    }
    useEffect(()=>{
        getUser();
    }, [])

    


    return (
        <div className=''>
            <div className='app__header w-full flex justify-between shadow-4 items-center px-5'>
                <NavLink to="/" className="text-xl logo__gradient">ALUmineers</NavLink>
                <h3>{title}</h3>
                <NavLink to="/profile">
                    <img src={` ${user?.profilePicture ? `${API_URL}/images/${user?.profilePicture}`: images.user}`} alt="" className='profile__rounded border-main shadow-4 rounded-full cover' />
                </NavLink>
            </div>
            <div className='app__body flex'>
                <div className="app__sidebar w-1/5 h-full">
                    <ul className='flex flex-col gap-1 py-3 px-2'>
                        {menuItems.map((item, i)=>(
                            <li key={i} className=''>
                                <NavLink to={item.link} className="flex items-center gap-3 rounded-md app__menu--item">
                                    <i className={item.icon}></i>
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="app__field overflow-y-auto p-2 flex-1 h-full">
                    {children}  
                </div>
            </div>
        </div>
    );
}

export default AppWrapper;