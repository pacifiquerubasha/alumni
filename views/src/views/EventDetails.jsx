import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { images } from '../utils/images';

function EventDetails(props) {

    return (
        <>
            <Header/>
            <main className='main__padding'>
                <section className="details__hero relative">
                    <img src={images.morning} className='h-full cover' alt="" />
                    <div className='absolute flex w-3/5 rounded-lg event__ticket shadow-2 mx-auto'>
                        <div className='flex-1 ticket__left p-2'>

                            <div className='flex justify-between items-center'>
                                <h1 className='text-3xl'>Event Title</h1>
                                <div className='event__category opacity-3 color-darkblue font-700 rounded-md px-1 text-sm'>#PROFESSIONAL DEVELOPMENT</div>
                            </div>
                            <div className='mt-2'>
                                <div className='flex gap-1 items-center opacity-5 mb-1'>
                                    <i className='fas fa-clock'></i>
                                    <span>Date and time</span>
                                </div>
                                <span className='text'>Sunday, 12 April &nbsp;&nbsp;|&nbsp;&nbsp; 10:00 am</span>
                            </div>
                            <div className='mt-2'>
                                <div className='flex gap-1 items-center opacity-5 mb-1'>
                                    <i className='fas fa-map-marker'></i>
                                    <span>Location</span>
                                </div>
                                <span className='text'>Pamplemousses, Mauritius</span>
                            </div>
                            <button className='main__btn mt-4'>RSVP</button>

                        </div>
                        <div className="separator full-center"></div>
                        <div className='qrcode__section p-2'>
                            <img src={images.qrcode} alt="" />
                        </div>
                    </div>
                </section>

                <section className='event__details pb-5 flex items-start'>
                    <div className='flex-1 pr-2'>
                        <h3 className='text-xl mb-2'>Event Description</h3>

                        <div className='flex flex-col gap-2 mb-3'>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, perspiciatis animi numquam voluptates expedita eum deserunt facere magni! Rerum exercitationem sint blanditiis quidem laudantium explicabo, magni repellat veniam consequuntur illum!
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum repudiandae blanditiis dolore cum assumenda labore. Atque, commodi esse. Quae libero fuga id ea vel officia aliquam minus doloribus ducimus, quos fugiat est cum nihil sint harum error, optio animi aspernatur quod. Harum cum obcaecati eaque.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum repudiandae blanditiis dolore cum assumenda labore. Atque, commodi esse. Quae libero fuga id ea vel officia aliquam minus doloribus ducimus, quos fugiat est cum nihil sint harum error, optio animi aspernatur quod. Harum cum obcaecati eaque.
                            </p>

                        </div>

                        <h3 className='text-xl mb-2'>Agenda</h3>
                        <div className='flex flex-col gap-1'>
                            {new Array(4).fill(0).map((_, i)=>(
                            <div key={i} className=''>                            
                                <span className='opacity-5'>10:00 - 10:15</span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, explicabo!</p>
                            </div>
                            ))
                            }
                        </div>


                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='organisor__details py-2 px-2 rounded-md flex flex-col gap-2'>
                            <div className='flex items-center gap-1'>
                                <img src={images.africa} alt="" className='profile__rounded shadow-4 rounded-full cover' />
                                <div className='flex flex-col'>
                                    <span>Jordan Peterson</span>
                                    <span className='opacity-5'>Event Organisor</span>
                                </div>
                            </div>
                            <div>
                                <h5 className=''>About Jordan Peterson</h5>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                                </p>
                            </div>
                            <div className=''>
                                <div className='flex gap-1 items-center opacity-5 mb-1'>
                                    <i className='fas fa-envelope'></i>
                                    <span>Contact</span>
                                </div>
                                <a href='mailto:jordanpeterson@alumni.com' className='text'>jordanpeterson@alumni.com</a>
                            </div>

                        </div>
                        <div>
                            <h3>SPEAKERS</h3>
                            <div className='flex flex-col mt-1 gap-1 opacity-7'>
                                <span className='color-darkblue'>Matt Walsh - <span className='opacity-5'>Daily Wire</span></span>
                                <span className='color-darkblue'>Andrew Tate - <span className='opacity-5'>Top G</span></span>
                            </div>
                        </div>
                        <div>
                            <h3>SPONSORS</h3>
                            <div className='flex flex-col mt-1 gap-1'>
                                <span className='color-main'>African Leadership University</span>
                                <span className='color-main'>ALX Ventures</span>
                            </div>
                        </div>

                    </div>

                </section>
            </main>
            <Footer/>
        </>
    );
}

export default EventDetails;