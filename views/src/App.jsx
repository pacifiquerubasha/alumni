import React, { useState, useEffect } from 'react'
import './App.css'
import {AppContext} from "./AppContext"
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom"
import "@fortawesome/fontawesome-free/css/all.min.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './views/Home';
import Events from './views/Events';
import EventDetails from './views/EventDetails';
import Contact from './views/Contact';
import Alumnis from './views/Alumnis';
import 'react-calendar/dist/Calendar.css';
import MyEvents from './views/MyEvents';
import Auth from './views/Auth';
import { API_URL, getCurrentUser } from './services/apis';
import MainApp from './components/MainApp';
import Chats from './views/Chats';
import Profile from './views/Profile';


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
      const response = await getCurrentUser();
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

                  <Route path="chats" element={<Chats/>}/>
                  <Route path="contact" element={<Contact/>}/>
                  <Route path="alumnis" element={<Alumnis/>}/>
                  <Route path="my-events" element={<MyEvents/>}/>
                  <Route path="profile" element={<Profile/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
      </React.Suspense>

    </AppContext.Provider>
  )
}

export default App
