import React from 'react';
import Header from "../components/Header"
import Footer from "../components/Footer"
import { images } from '../utils/images';


function Contact(props) {
    return (
        <>
            <Header/>
            <main className='main__padding'>
                <section className="details__hero relative flex contact__page">
                    <img src={images.morning} className='h-full cover contact__bg' alt="" />
                    <div className="absolute flex items-start w-3/5 contact__content mx-auto">
                        <form action="" className='contact__form w-3/5 shadow-3 bg-white rounded-lg p-2'>
                            <h1 className='mb-2 text-2xl opacity-5'>CONTACT US</h1>
                            <div className="form__group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id='name' placeholder='Your name'/>
                            </div>
                            <div className="form__group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id='email' placeholder='Your email'/>
                            </div>
                            <div className="form__group">
                                <label htmlFor="message">Message</label>
                                <textarea name="" id="message" cols="30" rows="5" placeholder='Your message'></textarea>
                            </div>
                            <button className='main__btn'>SUBMIT</button>
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