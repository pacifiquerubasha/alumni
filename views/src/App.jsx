import React, { useState, useEffect } from 'react'
import './App.css'
import './Media.css'

import {AppContext} from "./AppContext"
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom"
import "@fortawesome/fontawesome-free/css/all.min.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

import 'swiper/css';
import 'swiper/css/pagination';

import Home from './views/Home';
import Events from './views/Events';
import EventDetails from './views/EventDetails';
import Contact from './views/Contact';
import Alumnis from './views/Alumnis';
import 'react-calendar/dist/Calendar.css';
import Auth from './views/Auth';
import { API_URL, getCurrentUser, token } from './services/apis';
import MainApp from './components/MainApp';
// import Chats from './views/Chats';
import Dashboard from './views/app/Dashboard';
import MyEvents from './views/app/MyEvents';
import AlumniEvents from './views/app/AlumniEvents';
import ViewEvent from './views/app/ViewEvent';
import Profile from './views/app/Profile';
import ViewAlumni from './views/app/ViewAlumni';
import News from './views/app/News';
import ViewNews from './views/app/ViewNews';
import Error404 from './views/Error404'


function App() {

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  
  const states = {
    user,
    setUser,
    loadingUser,
    setLoadingUser,
  }

  const Loading = ()=>(
    <div className='loader__container flex w-full h-screen justify-center items-center'>
      <span class="loader"></span>
    </div>
  )

  //Get current user
  const getUser = async()=>{

    setLoadingUser(true)
    try {
      const token = localStorage.getItem("alumneersToken");
      const response = await getCurrentUser(token);
      if(response.data.user){
          setUser(response.data.user)
          console.log(response.data.user)
      }
      
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoadingUser(false)
    }

  }
  useEffect(()=>{
    getUser();
  }, [])

  useEffect(()=>{
    AOS.init();
  }, [])


  return (
    <AppContext.Provider value={{...states}} >
      <React.Suspense fallback={<Loading/>}>
        <BrowserRouter>         
            <Routes>
                <Route path="/login" element={<Auth/>}/>
        
                
                <Route path='/' element={<MainApp/>}>
                  <Route path="" element={<Home/>}/>
                  <Route path="events" element={<><Outlet/></>}>
                    <Route path="" element={<Events/>}/>
                    <Route path=":id" element={<EventDetails/> }/>
                  </Route>
                  <Route path="contact" element={<Contact/>}/>

                  {/* <Route path="chats" element={<Chats/>}/> */}
                  <Route path="dashboard" element={<Dashboard/>}/>
                  <Route path="my-events" element={<MyEvents/>}/>

                  <Route path="alumni-events" element={<AlumniEvents/>}/>
                  <Route path="alumni-events/:id" element={<ViewEvent/>}/>

                  <Route path="alumni" element={<Alumnis/>}/>
                  <Route path="alumni/:id" element={<ViewAlumni/>}/>

                  <Route path="news" element={<News/>}/>
                  <Route path="news/:id" element={<ViewNews/>}/>

                  <Route path="profile" element={<Profile/>}/>
                </Route>

                <Route path="*" element={<Error404/>}/>                

            </Routes>
        </BrowserRouter>
      </React.Suspense>

    </AppContext.Provider>
  )
}

export default App
