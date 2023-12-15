import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SubmitLoader } from './Loaders';
import { signup } from '../services/apis';

function SignupForm({setEmailVerification, setIsLogin}) {

    const [formFields, setFormFields] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        text: ''    
    })


    function handleChange(e){
        setFormFields({...formFields, [e.target.name]: e.target.value});
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    const checkPassword = ()=>{

        //Check if password matches regex
        if(!formFields.password.match(passwordRegex)){
            setMessage({type:'error', text:'Password must be 8-15 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character'})
            return false
        }

        if(formFields.password !== formFields.confirmPassword){
            setMessage({type:'error', text:'Passwords do not match'})
            return false
        }

        return true
    }

    async function handleSubmit(e){
        e.preventDefault();
        
        if(checkPassword()){
            try {
                setLoading(true);
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
        
    }

    useEffect(()=>{
        if(message.text){
            setTimeout(() => {
                setMessage({type:'', text:''})
            }, 5000);
        }
    }, [message])

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


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
                <input type={showPassword ? "text":"password"} id="password" name="password" placeholder="Your Password" onChange={handleChange} required/>
                <i onClick={()=>setShowPassword((prev)=>!prev)} className={`fas fa-${showPassword ? "eye-slash":"eye"} show__pass`}></i>
            </div>
            <div className="form__group relative">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type={showConfirmPassword ? "text":"password"} id="confirmPassword" name="confirmPassword" placeholder="Your Password Confirmation" onChange={handleChange} required/>
                <i onClick={()=>setShowConfirmPassword((prev)=>!prev)} className={`fas fa-${showConfirmPassword ? "eye-slash":"eye"} show__pass`}></i>
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
            <div onClick={()=>setIsLogin(true)} className='justify-center opacity-5 mt-2 redirect__link'>
               Already have an account? Log in
            </div>
        </form>
    );
}

export default SignupForm;