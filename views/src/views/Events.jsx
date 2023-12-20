import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { getEvents, getUpcomingEvents } from '../services/apis';
import { SkeletonLoader } from '../components/Loaders';
import { images } from '../utils/images';

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

    const [eventsToShow, setEventsShow] = useState([]);

    useEffect(()=>{
        const fetchEvents = async()=>{
            setLoading(true)
            const events = await getUpcomingEvents();
            setAllEvents(events?.data?.events);
            setEvents(events?.data?.events);
            setEventsShow(events?.data?.events);
            setLoading(false)
            
            getUniqueDates(events?.data?.events);
            getUniqueLocations(events?.data?.events);

        }

        fetchEvents();

    }, [])

    const [currentFilter, setCurrentFilter] = useState("All");
    const handleFilter = (filter)=>{
        setCurrentFilter(filter);

        if(filter === "All"){
            setEventsShow(allEvents);        
            return;
        }

        const filteredEvents = allEvents.filter(event=>event.eventType === filter);
        setEventsShow(filteredEvents);
    }

    const filters = [
        "All",
        "Professional Development",
        "Campus Events",
        "Networking"
    ]


    const handleSearch = (e)=>{

        const timeout = setTimeout(()=>{
            const search = e.target.value.toLowerCase();
            const filteredEvents = allEvents.filter(event=>{
                return event.title.toLowerCase().includes(search) || event.description.toLowerCase().includes(search)
            });
            setEventsShow(filteredEvents);
        }, 1000)

        return ()=>clearTimeout(timeout);

    }
    

    return (
        <>
            <Header/>
            <main className='main__padding bg-whiteorange all__events'>
                <section className="events__banner flex full-center">
                    <div className="events__banner__overlay flex flex-col items-center justify-center">
                        <h1 className='text-5xl font-700 text-white'>Events</h1>
                        <p className='text-white text-center px-2'>
                            Explore upcoming events happening in our community.                            
                        </p>
                    </div>
                </section>
                <section className='py-5 flex events__core px-2'>
                    <div className='w-1/4 events__core--side'>
                        {
                            eventsToShow.length > 0 ?

                            <>
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
                            </>:""
                        
                        }
                        
                    </div>
                    <div className='flex-1 events__middle'>

                        <form className='flex gap-2 search__event'>
                            <input type="text" placeholder='Search' className='px-2 py-1 flex-1' onChange={handleSearch} />
                        </form>
                        <div className='mt-2 flex gap-2 filters'>
                            {
                                filters.map((filter, i)=>(
                                    <button onClick={()=>handleFilter(filter)} className={currentFilter === filter ? 'active' : ''}>
                                        <span>{filter}</span>
                                    </button>
                                ))
                            }
                            
                        </div>


                        <div className='flex  gap-2 events__container flex-wrap mt-5'>
                            
                            {loading ?

                                <>
                                    {new Array(4).fill(0).map((_, i)=>(
                                        <div key={i} className='mb-5 ev__card'>
                                            <SkeletonLoader/>                                    
                                        </div> 
                                    ))}
                                </>
                                :

                                <>
                                    {eventsToShow.length === 0 ?
                                    <div className='flex flex-col items-center'>
                                        <img src={images.empty1} className='empty__dash'/>
                                        <span className='opacity-5'>No Upcoming Events</span>
                                    </div>
                                    :

                                    <>
                                        {events.map((event, i)=>(
                                            <div key={i} className='ev__card mb-5'>
                                                <EventCard data={event}/>
                                            </div>
                                        ))}                                    
                                    </>
                                    
                                    }
                                
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