import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SubmitLoader } from './Loaders';
import { signup } from '../services/apis';

function SignupForm({setEmailVerification}) {

    const [formFields, setFormFields] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        text: ''    
    })


    function handleChange(e){
        setFormFields({...formFields, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await signup(formFields);
            if(response.data.user){
                setEmailVerification(response.data.user.email)
            }
            
        } catch (error) {
            setMessage({type:'error', text:error?.response?.data?.data?.message})
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(message.text){
            setTimeout(() => {
                setMessage({type:'', text:''})
            }, 5000);
        }
    }, [message])



    return (
        <form onSubmit={handleSubmit} className='contact__form auth__form signup__form shadow-3 bg-white rounded-lg p-2'>
            <NavLink to="/" className='text-xl font-700 logo__gradient'>ALUmnis</NavLink>
            <h1 className='mt-1 text-xl'>Signup</h1>
            <p className='opacity-4 mb-2'>Get Started - Sign Up and Connect with Alumni Today.</p>
            
            {message.text && <div className={`text-center mb-1 rounded-sm message ${message.type === 'error' ? 'badge__error' : 'badge__success'}`}>{message.text}</div>}
            <div className="form__group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder="Your First Name" onChange={handleChange} required/>
            </div>
            <div className="form__group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Your Last Name" onChange={handleChange} required/>
            </div>
            <div className="form__group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Your Username" onChange={handleChange} required/>
            </div>
            <div className="form__group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Your Email" onChange={handleChange} required/>
            </div>
            <div className="form__group relative">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Your Password" onChange={handleChange} required/>
                <i className='fas fa-eye show__pass'></i>
            </div>
            <div className="form__group relative">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Your Password Confirmation" onChange={handleChange} required/>
                <i className='fas fa-eye show__pass'></i>
            </div>

            
            
            <button className='main__btn mt-1 w-full mt-2 relative'>
                SIGN UP
                {loading ?
                    <div className="loading">
                        <SubmitLoader/>
                    </div>
                    :""
                }
            </button>
        </form>
    );
}

export default SignupForm;