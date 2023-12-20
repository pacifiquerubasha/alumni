import React, {useContext, useEffect, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import VerifyEmail from '../components/VerifyEmail';
import { AppContext } from '../AppContext';
import { token } from '../services/apis';

function Auth(props) {


    const [isLogin, setIsLogin] = useState(true);
    const [emailVerification, setEmailVerification] = useState(null);

    useEffect(()=>{

    }, [])

    return (
        <div className='auth__page relative h-screen w-full flex items-center'>
            <div className='w-4/5 flex items-center mx-auto h-full'>
                <div className='flex auth__left flex-col w-1/2 justify-center justify-around h-full'>
                    <h3 className='section__title font-500 color-darkblue'>
                    Discover exciting alumni events and networking opportunities
                    </h3>
                    <div className='flex flex-col items-start gap-2'>
                        {isLogin?
                            <>
                                <div className='text-lg opacity-5'>Don't have an account yet?</div>
                                <button onClick={()=>setIsLogin(false)} className="main__btn border__btn">SIGN UP</button>
                            </>
                            :
                            <>
                                <div className='text-lg opacity-5'>Already have an account?</div>
                                <button onClick={()=>setIsLogin(true)} className="main__btn border__btn">LOGIN</button>
                            </>
                        }

                    </div>

                </div>
                <div className='flex-1 flex justify-center auth__forms'>
                        {isLogin ?<LoginForm setIsLogin={setIsLogin}/> : 
                            !emailVerification ?
                            <SignupForm setEmailVerification={setEmailVerification} setIsLogin={setIsLogin}/>
                            :
                            <VerifyEmail email={emailVerification} setIsLogin={setIsLogin}/>
                        }                    
                </div>

            </div>
            
        </div>
    );
}

export default Auth;