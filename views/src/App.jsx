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


function App() {



  const states = {}

  const Loading = ()=>(
    <div className='loader__container flex w-full h-screen justify-center items-center'>
      <span class="loader"></span>
    </div>
  )

  useEffect(()=>{
    AOS.init();
  }, [])

  return (
    <AppContext.Provider value={{...states}} >
      <React.Suspense fallback={<Loading/>}>
        <BrowserRouter>         
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/events" element={<><Outlet/></>}>
                  <Route path="" element={<Events/>}/>
                  <Route path=":id" element={<EventDetails/> }/>
                </Route>
            </Routes>
        </BrowserRouter>
      </React.Suspense>

    </AppContext.Provider>
  )
}

export default App
