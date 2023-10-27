import React, { useEffect, useState } from 'react';
import { SubmitLoader } from './Loaders';
import { NavLink } from 'react-router-dom';
import { verifyEmail } from '../services/apis';

function VerifyEmail({email, setIsLogin}) {

    const [emailVerificationCode, setEmailVerificationCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        text: ''    
    })

    const handleChange = (e)=> setEmailVerificationCode(e.target.value);

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        
        try {
            
            const response = await verifyEmail({emailVerificationCode});
            if(response.data.userWithCode){
                setMessage({
                    type:'success',
                    text:'Email verified successfully'
                })
            }
            
        } catch (error) {
            setMessage({type:'error', text:error?.response?.data?.data?.message})
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(message.type === 'success'){
            setTimeout(() => {
                setMessage({type:'', text:''})
                setIsLogin(true)
            }, 2000);
        }
    }, [message])


    return (
        <>
            <form onSubmit={handleSubmit} className='contact__form auth__form signup__form shadow-3 bg-white rounded-lg p-2'>
                <NavLink to="/" className='text-xl font-700 logo__gradient'>ALUmnis</NavLink>
                <h1 className='mt-1 text-xl'>Verify Email</h1>
                <p className='opacity-4 mb-2'>We have sent you a verification code to <b className="color-darkblue">{email}</b></p>
                
                {message.text && <div className={`text-center mb-1 rounded-sm message ${message.type === 'error' ? 'badge__error' : 'badge__success'}`}>{message.text}</div>}
                <div className="form__group">
                    <label htmlFor="emailVerificationCode">Code</label>
                    <input type="text" id="emailVerificationCode" name="emailVerificationCode" placeholder="Enter code" onChange={handleChange} required/>
                </div>
                        
                
                <button className='main__btn mt-1 w-full mt-2 relative'>
                    VERIFY
                    {loading ?
                        <div className="loading">
                            <SubmitLoader/>
                        </div>
                        :""
                    }
                </button>
            </form>

            {message.type === 'success' ?
            <div className='overlay full-center'>
                <SubmitLoader/>
            </div> : ""
            }
        </>
    );
}

export default VerifyEmail;