import React, { useContext, useEffect, useState } from 'react';
import AppWrapper from '../../components/AppWrapper';
import { AppContext } from '../../AppContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { getMyEvents, getMyRegisteredEvents } from '../../services/apis';
import Calendar from 'react-calendar';
import { formatDate } from '../../utils/utils';
import Modal from '../../components/Modal';
import CreateEventForm from '../../components/CreateEventForm';
import { SpinLoader } from '../../components/Loaders';

function MyEvents(props) {
    const {user} = useContext(AppContext);
    const navigate = useNavigate();

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
            title: 'Canceled',
            value: myEvents.reduce((acc, curr)=>{
                if(curr.isCanceled){
                    return acc+1
                }
                return acc
            }, 0)
        }
    ]

    const [loadingEvents, setLoadingEvents] = useState(false);
    const fetchMyEvents = async()=>{
        try {
            setLoadingEvents(true)
            let response = await getMyEvents(user._id)
            if(response?.data?.events){
                const data = response.data.events.sort((a, b)=>new Date(b.date) - new Date(a.date))
                setMyEvents(data)
                console.log(response.data.events)
            }


        } catch (error) {
            console.log(error)
        }
        finally{
            setLoadingEvents(false)
        }
    }

    const [fetchingRSVPs, setFetchingRSVPs] = useState(false);
    const [myRSVPs, setMyRSVPs] = useState([]);

    const fetchMyRSVPs = async()=>{
        try {
            setFetchingRSVPs(true)
            let response = await getMyRegisteredEvents(user._id);
            if(response?.data?.events){
                const data = response.data.events.sort((a, b)=>new Date(b?.eventId?.date) - new Date(a?.eventId?.date))
                setMyRSVPs(data)
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            setFetchingRSVPs(false)
        }
    }

    useEffect(()=>{
        if(user){
            fetchMyEvents();
        }
    }, [user])

    useEffect(()=>{
        if(user){
            fetchMyRSVPs();
        }

    }, [user])
    return (
        <AppWrapper title="MY EVENTS">
            <section className='flex w-full gap-2 mx-auto pt-2 items-start pb-5'>
                <div className='w-3/5 bg-white p-2 rounded-lg'>
                    <div className='flex items-center mb-5 justify-between'>
                        <h3 className='section__title font-500'>My Events</h3>
                        <button onClick={()=>setCreateModal(true)} className="main__btn text-md">Create Event</button>
                    </div>

                    {loadingEvents ?
                    <div className='full-center py-5 loading__events'>
                        <SpinLoader/>
                    </div>
                    :
                    <>
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
                                <div key={event._id} onClick={()=>navigate(`/alumni-events/${event._id}`)} className='w-3/4 cursor-pointer border p-1 rounded-sm my__events-repeated'>
                                    <h5 className='text-xl color-darkblue'>{event.title}</h5>
                                    <p className='opacity-7'>
                                        {event.description}
                                    </p>
                                    <div className='flex mt-1 opacity-5 justify-between'>
                                        <span>{event.location}</span>
                                        <span>{formatDate(event.date)}</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div className='my__event--label mt-1 text-green'>
                                            {new Date((event.date).split(" ")[0]) - new Date() > 0 ? <span className='label__green'>UPCOMING</span> : <span className='label__red'>PAST</span>}
                                        </div>

                                        {event.isCanceled && <span className='text-red'>Canceled</span>}

                                    </div>
                                </div>
                            ))
                            }
                        </div>                    
                    </>
                    }

                </div>
                <div className='w-2/5 bg-white rounded-lg bg-white p-2'>
                    <div className='w-full flex flex-col calendar__sec'>
                        <Calendar onChange={setCalendarDate} value={calendarDate} />
                    </div>
                    <div className='mt-3'>
                        <h3 className='section__subtitle opacity-5 mb-2'>My RSVPs</h3>
                        {fetchingRSVPs ?
                        <div className='full-center py-5 loading__events'>
                            <SpinLoader/>
                        </div>
                        :
                        <div className="flex flex-col gap-2">
                            {myRSVPs.map((event, i)=>(
                                <NavLink to={`/alumni-events/${event?.eventId?._id}`} className={`w-full border p-1/2 rounded-sm border flex gap-2 items-center justify-between my__upcoming--event ${new Date((event?.eventId?.date)?.split(" ")[0]) - new Date() < 0  && "my__past--event"}`}>
                                    <div className='flex items-center gap-1'>
                                        <i className={`fas fa-${event.eventId?.isCanceled ? "times":"check"}-circle text-${event.eventId?.isCanceled?"red":"green"}`}></i>
                                        <h5 className='text-sm ellipsis'>{event?.eventId?.title || ""}</h5>                                   
                                    </div>
                                    <span>{new Date(event?.eventId?.date).toLocaleDateString()}</span>
                                </NavLink>
                            ))
                            }
                        </div>
                        }

                    </div>

                </div>
            </section>
            <Modal
                isOpen={openCreateModal}
                setIsOpen={setCreateModal}
            >
                <CreateEventForm 
                    eventFormData={eventFormData}
                    setEventFormData={setEventFormData}
                />
            </Modal>
            
        </AppWrapper>
    );
}

export default MyEvents;