import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Calendar from 'react-calendar';
import Modal from '../components/Modal'
import CreateEventForm from '../components/CreateEventForm';
import { getMyEvents } from '../services/apis';
import { AppContext } from '../AppContext';
import { formatDate } from '../utils/utils';

function MyEvents(props) {

    const {user} = useContext(AppContext);

    const [calendarDate, setCalendarDate] = useState(new Date());
    const [openCreateModal, setCreateModal] = useState(false);

    const [eventFormData, setEventFormData] = useState({});

    const [myEvents, setMyEvents] = useState([]);
    const [totalRSVPS, setTotalRSVPs] = useState(0);

    const stats = [
        {
            title: 'Total Events',
            value: myEvents.length
        },
        {
            title: 'Total RSVPs',
            value: myEvents.reduce((acc, curr)=>acc+curr.totalRSVPS, 0)
        },
        {
            title: 'Total Attendees',
            value: 0
        }
    ]

    const fetchMyEvents = async()=>{
        try {
            let response = await getMyEvents(user._id)
            if(response?.data?.events)
                setMyEvents(response.data.events)

        } catch (error) {
            console.log(error)
        };
    }

    useEffect(()=>{
        if(user)
            fetchMyEvents();
    }, [user])


    return (
        <>
            <Header/>
            <main className='main__padding flex flex-col bg-whiteorange'>
                <section className='flex w-4/5 gap-2 mx-auto pt-2 items-start pb-5'>
                    <div className='w-3/5 bg-white p-2 rounded-lg'>
                        <div className='flex items-center mb-5 justify-between'>
                            <h3 className='section__title font-500'>My Events</h3>
                            <button onClick={()=>setCreateModal(true)} className="main__btn text-md">Create Event</button>
                        </div>
                        <div className='flex justify-between'>
                            {stats.map((stat, i)=>(
                                <div className={`my__events--stat overflow-hidden py-2 ev__stat--${i} w-3/10 flex flex-col items-center justify-center`}>
                                    <div className='text-2xl font-500'>{stat.value}</div>
                                    <p>{stat.title}</p>
                                </div>
                            ))}

                        </div>
                        
                        <div className='mt-5 flex flex-wrap gap-2'>
                            {myEvents.map((event, i)=>(
                                <div className='w-3/4 border p-1 rounded-sm my__events-repeated'>
                                    <h5 className='text-xl color-darkblue'>{event.title}</h5>
                                    <p className='opacity-7'>
                                        {event.description}
                                    </p>
                                    <div className='flex mt-1 opacity-5 justify-between'>
                                        <span>{event.location}</span>
                                        <span>{formatDate(event.date)}</span>
                                    </div>
                                    <div className='my__event--label mt-1 text-green'>

                                        {new Date((event.date).split(" ")[0]) - new Date() > 0 ? "UPCOMING" : "PAST"}

                                    </div>
                                </div>
                            ))
                            }
                        </div>

                    </div>
                    <div className='flex-1 bg-white rounded-lg bg-white p-2'>
                        <div className='w-full flex flex-col calendar__sec'>
                            <Calendar onChange={setCalendarDate} value={calendarDate} />
                        </div>
                        <div className='mt-3'>
                            <h3 className='section__subtitle opacity-5 mb-2'>My RSVPs</h3>

                            <div className="flex flex-col gap-2">
                                {new Array(5).fill(0).map((_, i)=>(
                                    <div className={`w-full border p-1 rounded-sm border flex justify-between my__upcoming--event ${i>1 && "my__past--event"}`}>
                                        <h5 className='text-lg'>Event Title</h5>                                        
                                        <span>12 April, 2023</span>
                                    </div>
                                ))
                                }
                            </div>

                        </div>

                    </div>
                </section>
            </main>

            <Footer/>

            <Modal
                isOpen={openCreateModal}
                setIsOpen={setCreateModal}
            >
                <CreateEventForm 
                    eventFormData={eventFormData}
                    setEventFormData={setEventFormData}
                />
            </Modal>
            
        </>
    );
}

export default MyEvents;