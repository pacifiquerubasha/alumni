import React from 'react';
import Header from "../components/Header"
import Footer from "../components/Footer"
import { images } from '../utils/images';
import { useState } from 'react';
import { sendContact } from '../services/apis';
import { SubmitLoader } from '../components/Loaders';


function Contact(props) {

    const [formFields, setFormFields] = useState({});

    const handleInputChange = (e)=>{
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        text: ''
    })

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);

            const response = await sendContact(formFields);
            console.log("ERROR", response);
            if(response){
                setMessage({
                    type: 'success',
                    text: 'Message sent successfully'
                })
            }            

        } catch (error) {
            setMessage({
                type: 'error',
                text: 'Something went wrong'
            })            
        }
        finally{
            setLoading(false);
        }
    }


    return (
        <>
            <Header/>
            <main className='main__padding'>
                <section className="details__hero relative flex contact__page">
                    <img src={images.morning} className='h-full cover contact__bg' alt="" />
                    <div className="absolute flex items-start w-3/5 contact__content mx-auto">
                        <form onSubmit={handleSubmit} className='contact__form w-3/5 shadow-3 bg-white rounded-lg p-2'>
                            <h1 className='mb-2 text-2xl opacity-5'>CONTACT US</h1>
                            {message.text && <div className={`text-center mb-1 p-1/2 w-3/4 rounded-sm message ${message.type === 'error' ? 'badge__error' : 'badge__success'}`}>{message.text}</div>}
                            <div className="form__group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id='name' name='name' onChange={handleInputChange} placeholder='Your name'/>
                            </div>
                            <div className="form__group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id='email' name='email' onChange={handleInputChange} placeholder='Your email'/>
                            </div>
                            <div className="form__group">
                                <label htmlFor="message">Message</label>
                                <textarea name="message" id="message" onChange={handleInputChange} cols="30" rows="5" placeholder='Your message'></textarea>
                            </div>
                            <button className='main__btn contact__btn'>
                                SUBMIT
                                {loading ?
                                <div className="loading">
                                    <SubmitLoader/>
                                </div>
                                :""
                            }
                            </button>
                        </form>

                        <div className='contact__information bg-darkblue p-3  flex flex-col gap-5'>
                            <div className="flex gap-2 items-center">
                                <i className="text-2xl opacity-7 fas fa-map-marker-alt"></i>
                                <div>
                                    <h5 className='text-xl opacity-5 font-400'>Address</h5>
                                    <p>123, Main Road, New York, USA</p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <i className="text-2xl opacity-7 fas fa-phone-alt"></i>
                                <div>
                                    <h5 className='text-xl opacity-5 font-400'>Phone</h5>
                                    <p>+012 345 6789</p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <i className="text-2xl opacity-7 fas fa-envelope"></i>
                                <div>
                                    <h5 className='text-xl opacity-5 font-400'>Email</h5>
                    
                                    <p>
                                        <a href="mailto:
                                        info@alumnis.com" className='color-whiteorange'>info@alumnis.com</a>
                                    </p>
                                </div>
                            </div>


                        </div>
                        
                    </div>
                </section>
            </main>
            <Footer/>
            
        </>
    );
}

export default Contact;