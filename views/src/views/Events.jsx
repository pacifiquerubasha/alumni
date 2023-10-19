import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';

function Events(props) {
    return (
        <>
            <Header/>
            <main>
                <section className="events__banner flex full-center">
                    <div className="events__banner__overlay flex flex-col items-center justify-center">
                        <h1 className='text-5xl font-700 text-white'>Events</h1>
                        <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                    </div>
                </section>
                <section className='py-5 flex events__core px-2'>
                    <div className='w-1/4 events__core--side'>
                        <div className='mb-2'>
                            <h5>DATES</h5>
                            <div className='side__bar--list'>
                                <span>05/12/23</span>
                                <span>12/12/23</span>
                                <span>13/12/23</span>
                                <span>14/12/23</span>                                
                            </div>
                        </div>
                        <div>
                            <h5>LOCATIONS</h5>
                            <div className='side__bar--list'>
                                <span>Online</span>
                                <span>Kigali</span>
                                <span>Nairobi</span>
                                <span>Pamplemousses</span>
                            </div>
                        </div>
                        
                    </div>
                    <div className='flex-1'>

                        <form className='flex gap-2'>
                            <input type="text" placeholder='Search' className='px-2 py-1 flex-1' />
                        </form>
                        <div className='mt-2 flex gap-2 filters'>
                            <button className='active'>
                                <span>All</span>
                            </button>
                            <button>
                                <span>Professional Development</span>
                            </button>
                            <button>
                                <span>Training & Workshops</span>
                            </button>
                            <button>
                                <span>Networking</span>
                            </button>
                        </div>

                        <div className='flex justify-between events__container flex-wrap mt-5'>
                            {new Array(10).fill(0).map((_, i)=>(
                                <div key={i} className=' mb-5'>
                                    <EventCard/>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                    <div className='w-1/4 pl-5 events__core--side'>
                        <div className='mb-2'>
                            <h5>HASHTAGS</h5>
                            <div className='side__bar--list hashtags'>
                                <span>#alc4life</span>
                                <span>#career</span>
                                <span>#celebrate</span>
                                <span>#cometogether</span>
                            </div>
                        </div>
                        <div className='mb-2'>
                            <h5>TOP RSVPS</h5>
                            <div className='side__bar--list'>
                                <span>Career Development</span>
                                <span>Women Empowerment</span>
                            </div>
                        </div>
                        <div>
                            <h5>MY UPCOMING EVENTS</h5>
                            <div className='side__bar--list'>
                                <div className='sidebar__upcoming--events'>
                                    <span className='font-600'>Event 1</span>
                                    <div className='flex gap-1 opacity-5'>
                                        <span>05/12/23</span>
                                        <span>Online</span>
                                    </div>
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

export default Events;