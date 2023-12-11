import React, { useEffect, useState } from 'react';
import AppWrapper from '../../components/AppWrapper';
import { getEvents } from '../../services/apis';
import { SkeletonLoader } from '../../components/Loaders';
import EventCard from '../../components/EventCard';

function AlumniEvents(props) {

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
        <AppWrapper title="ALUMNI EVENTS">
            <div>  
                <div>
                    <h1 className=''>Events</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, iste.
                    </p>                
                </div>  
                <div className='flex events__container gap-3 flex-wrap mt-5'>                            
                    {loading ?

                        <>
                            {new Array(4).fill(0).map((_, i)=>(
                                <div key={i} className='app__events--skeleton'>
                                    <SkeletonLoader/>                                    
                                </div> 
                            ))}
                        </>
                        :

                        <>
                            {events.map((event, i)=>(
                                <div key={i} className='app__events'>
                                    <EventCard data={event} isApp={true}/>
                                </div>
                            ))}
                        
                        </>
                    
                    }
                    
                
                    
                </div>          
            </div>
            
        </AppWrapper>
    );
}

export default AlumniEvents;