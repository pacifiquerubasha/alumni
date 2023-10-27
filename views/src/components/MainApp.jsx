import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { SpinLoader, SubmitLoader } from './Loaders';
import { Outlet } from 'react-router-dom';

function MainApp(props) {

    const {loadingUser} = useContext(AppContext);

    return (
        <>

        {loadingUser ? 
            <div className='loader__container bg-whiteorange flex w-full h-screen justify-center items-center'>
                <SpinLoader/>
            </div>
            :
            <Outlet/>
        }
            
        </>
    );
}

export default MainApp;