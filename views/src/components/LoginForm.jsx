import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { login } from '../services/apis';
import { SubmitLoader } from './Loaders';

function LoginForm(props) {

    const {user, setUser} = useContext(AppContext);
    const navigate = useNavigate();

    const [formFields, setFormFields] = useState({})
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        text: ''   
    })


    function handleInputChange(e){
        setFormFields({...formFields, [e.target.name]: e.target.value})
    }

    const handleShowPass = ()=>setShowPass((prev)=>!prev);

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await login(formFields);
            if(response.data.user){
                setUser(response.data.user)
                setMessage({
                    type:'success',
                    text:'Login successful'                
                })
                // localStorage.setItem("alumniToken", response.data.token);
                navigate("/")                
            }
            
        } catch (error) {
            setMessage({type:'error', text:error?.response?.data?.data?.message})
        }
        finally{
            setLoading(false)
        }
    }


        
     



    return (
        <form onSubmit={handleSubmit} className='contact__form auth__form shadow-3 bg-white rounded-lg p-2 pb-3'>
            <NavLink to="/" className='text-3xl font-700 logo__gradient'>ALUmnis</NavLink>
            <h1 className='mt-2 text-xl'>Welcome to ALUmnis</h1>
            <p className='opacity-4 mb-2'>Ready to connect with your alumni community? Sign in now!</p>
            
            {message.text && <div className={`text-center mb-1 rounded-sm message ${message.type === 'error' ? 'badge__error' : 'badge__success'}`}>{message.text}</div>}
            <div className="form__group">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' name="email" placeholder='Your email' onChange={handleInputChange} required/>
            </div>
            <div className="form__group relative">
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name="password" placeholder='Your password' onChange={handleInputChange} required/>
                <i className='fas fa-eye show__pass'></i>
            </div>
            <div className="flex items-center justify-between">
                <NavLink href="" className="color-darkblue">Forgot password?</NavLink>
            </div>
           
            
            <button className='main__btn mt-1 w-full mt-2'>
                LOGIN
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

export default LoginForm;