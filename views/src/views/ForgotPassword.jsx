import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitLoader } from '../components/Loaders';
import { forgotPassword } from '../services/apis';

function ForgotPassword(props) {

    const navigate = useNavigate();

    const [formFields, setFormFields] = useState({})
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        text: ''   
    })

    function handleInputChange(e){
        setFormFields({...formFields, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await forgotPassword(formFields);
            console.log(response);
            if(response.data){
                setMessage({
                    type:'success',
                    text:'Password reset successful'                
                })
                setTimeout(() => {
                    navigate("/login")               
                }, 1000);
            }            

        } catch (error) {
            setMessage({type:'error', text:error?.response?.data?.data?.message})
        }
        finally{
            setLoading(false)
        }
    }


    return (
        <div className='auth__page relative h-screen w-full flex items-center'>
            <div className='w-4/5 flex items-center mx-auto h-full'>
                <div className='flex auth__left flex-col w-1/2 justify-center justify-around h-full'>
                    <h3 className='section__title font-500 color-darkblue'>
                    Discover exciting alumni events and networking opportunities
                    </h3>
                    <div className='flex flex-col items-start gap-2'>                        
                        <div className='text-lg opacity-5'>Remember Password?</div>
                        <button onClick={()=>navigate("/login")} className="main__btn border__btn">LOGIN</button>
                    </div>

                </div>
                <div className='flex-1 flex justify-center auth__forms'>
                <form onSubmit={handleSubmit} className='contact__form auth__form shadow-3 bg-white rounded-lg p-2 pb-3'>
                    <a href="/" className='text-3xl font-700 logo__gradient'>ALUmnis</a>
                    <h1 className='mt-2 text-xl'>Forgot Password</h1>
                    <p className='opacity-4 mb-2'>
                        Enter your email address and we'll send you a temporary password.
                    </p>
                    
                    {message.text && <div className={`text-center mb-1 rounded-sm message ${message.type === 'error' ? 'badge__error' : 'badge__success'}`}>{message.text}</div>}
                    <div className="form__group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' name="email" placeholder='Your email' onChange={handleInputChange} required/>
                    </div>                
                    
                    <button className='main__btn mt-1 w-full mt-2'>
                        RESET
                        {loading ?
                            <div className="loading">
                                <SubmitLoader/>
                            </div>
                            :""
                        }
                    </button>
                    <div onClick={()=>navigate("/login")} className='justify-center opacity-5 mt-2 redirect__link'>
                    Remember Password? Login
                    </div>
                </form>                   
                </div>

            </div>
            
        </div>
    );
}

export default ForgotPassword;