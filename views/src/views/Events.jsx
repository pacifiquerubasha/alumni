import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { getEvents } from '../services/apis';
import { SkeletonLoader } from '../components/Loaders';

function Events(props) {

    const [allEvents, setAllEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const [dates, setDates] = useState([]);
    const [locations, setLocations] = useState([]);

    const getUniqueDates = (events)=>{
        const dates = events.map(event=>new Date(event.date).toLocaleDateString());
        const uniqueDates = [...new Set(dates)];
        setDates(uniqueDates);
    }

    const getUniqueLocations = (events)=>{
        const locations = events.map(event=>event.location);
        const uniqueLocations = [...new Set(locations)];
        setLocations(uniqueLocations);
    }

    useEffect(()=>{
        const fetchEvents = async()=>{
            setLoading(true)
            const events = await getEvents();
            setAllEvents(events?.data?.events);
            setEvents(events?.data?.events);
            setLoading(false)
            
            getUniqueDates(events?.data?.events);
            getUniqueLocations(events?.data?.events);

        }

        fetchEvents();

    }, [])

    return (
        <>
            <Header/>
            <main className='main__padding bg-whiteorange all__events'>
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
                                {loading ?
                                <div>LOADING...</div>
                                :
                                <>
                                {dates.map((date, i)=><span>{date}</span>)}
                                
                                </>
                                }                              
                            </div>
                        </div>
                        <div>
                            <h5>LOCATIONS</h5>
                            <div className='side__bar--list'>
                            {loading ?
                                <div>LOADING...</div>
                                :
                                <>
                                {locations.map((location, i)=><span>{location}</span>)}
                                
                                </>
                                }    
                            </div>
                        </div>
                        
                    </div>
                    <div className='flex-1'>

                        <form className='flex gap-2'>
                            <input type="text" placeholder='Search' className='px-2 py-1 flex-1' />
                        </form>
                        <div className='mt-2 flex gap-2 filters'>
                            <button className='active'>
                                <span>ALL</span>
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
                            
                            {loading ?

                                <>
                                    {new Array(4).fill(0).map((_, i)=>(
                                        <div key={i} className='mb-5'>
                                            <SkeletonLoader/>                                    
                                        </div> 
                                    ))}
                                </>
                                :

                                <>
                                    {events.map((event, i)=>(
                                        <div key={i} className=' mb-5'>
                                            <EventCard data={event}/>
                                        </div>
                                    ))}
                                
                                </>
                            
                            }
                            
                        
                            
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
                                <div className='sidebar__upcoming--events bg-white'>
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