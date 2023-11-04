import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { images } from '../utils/images';
import { useParams } from 'react-router-dom';
import { API_URL, deleteEvent, getOneEvent, handleRegister } from '../services/apis';
import { SpinLoader } from '../components/Loaders';
import { formatDate } from '../utils/utils';

import QRCode from 'react-qr-code';
import { AppContext } from '../AppContext';
import Modal from '../components/Modal';
import CreateEventForm from '../components/CreateEventForm';

function EventDetails(props) {

    const {user} = useContext(AppContext);

    const {id} = useParams();
    const [eventDetails, setEventDetails] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchEventDetails = async()=>{
        try {
            setLoading(true);
            let res = await getOneEvent(id);
            if(res?.data?.event)
                setEventDetails(res.data.event)
            console.log(res?.data?.event)
            
        } catch (error) {
            console.log(error)            
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchEventDetails();
    }, [])

    const [eventFormData, setEventFormData] = useState({});
    const [openUpdateModal, setUpdateModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    
    const handleOpenModal = ()=>{
        setUpdateModal(true);
        setEventFormData(eventDetails);
    }

    const [deleting, setDeleting] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        text: ''        
    })

    const handleDeleteEvent =  async()=>{
        try {
            setDeleting(true);
            let res = await deleteEvent(id);
            if(res?.data){
                setMessage({
                    type: 'success',
                    text: 'Event deleted successfully'
                })
                setTimeout(() => {
                    window.location.href = '/my-events'
                }, 2000);                
            }
                
        } catch (error) {
            console.log(error)            
        }
        finally{
            setDeleting(false);
        }
    }

    const [registering, setRegistering] = useState(false);
    
    const registerEvent = async()=>{
        try {
            setRegistering(true);
            let res = await handleRegister({eventId: id, userId: user._id });
            if(res?.data){
                setTimeout(() => {
                    window.location.reload();
                }, 1000);                
            }
            
        } catch (error) {
            console.log(error)                        
        }
        finally{
            setRegistering(false);
        }

    }

    return (
        <>
            <Header/>
            <main className='main__padding'>

                {loading ?
                    <div className='flex-1 h-screen flex justify-center items-center'>
                        <SpinLoader/>
                    </div>
                    : 

                    <>
                        <section className="details__hero relative">
                            <img src={`${API_URL}/images/${eventDetails.image}`} className='h-full cover' alt="" />
                            <div className='absolute flex w-3/5 rounded-lg event__ticket shadow-2 mx-auto'>
                                <div className='flex-1 ticket__left p-2'>

                                    <div className='flex justify-between items-center'>
                                        <h1 className='text-3xl'>{eventDetails.title}</h1>
                                        <div className='event__category text-right opacity-3 color-darkblue font-700 rounded-md px-1 text-sm'>#{eventDetails?.eventType?.toUpperCase()}</div>
                                    </div>
                                    <div className='mt-2'>
                                        <div className='flex gap-1 items-center opacity-5 mb-1'>
                                            <i className='fas fa-clock'></i>
                                            <span>Date and time</span>
                                        </div>
                                        <span className='text'>{formatDate(eventDetails.date)} &nbsp;&nbsp;|&nbsp;&nbsp; {eventDetails.time}</span>
                                    </div>
                                    <div className='mt-2'>
                                        <div className='flex gap-1 items-center opacity-5 mb-1'>
                                            <i className='fas fa-map-marker'></i>
                                            <span>Location</span>
                                        </div>
                                        <span className='text'>{eventDetails.location}</span>
                                    </div>
                                    <div className='flex mt-4 justify-between'>
                                        {!eventDetails?.attendees?.some((attendee)=>attendee._id === user?._id) ?
                                        <button onClick={registerEvent} className='main__btn'>{registering ? "..." : "RSVP"}</button>
                                        :
                                        <span className='text-green italic'>You have already registered</span>
                                        }


                                        {eventDetails.createdBy === user?._id &&
                                        <div className='flex gap-3 items-center'>
                                            <button onClick={handleOpenModal} className='main__btn border__btn'>EDIT</button>
                                            <i onClick={()=>setOpenDeleteModal(true)} className='fas fa-trash text-2xl color-main cursor-pointer'></i>
                                        </div>
                                        }
                                    </div>

                                </div>
                                <div className="separator full-center"></div>
                                <div className='qrcode__section p-2'>
                                    <QRCode
                                        title={eventDetails.title}
                                        value={`http://localhost:5173/events/${id}`}
                                        fgColor={"rgb(2,3,129)"}
                                        size={"100%"}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className='event__details pb-5 flex items-start'>
                            <div className='flex-1 pr-2'>
                                <h3 className='text-xl mb-2'>Event Description</h3>

                                <div className='flex flex-col gap-2 mb-3'>
                                    <p>
                                        {eventDetails.description}
                                    </p>
                                    
                                </div>

                                <h3 className='text-xl mb-2'>Total RSVPs</h3>
                                <div className='flex mb-3'>
                                    <span className='color-darkblue'>{eventDetails.totalRSVPS}</span>/{eventDetails.capacity}
                                </div>

                                <h3 className='text-xl mb-2'>TAGS</h3>
                                <div className='flex mb-3 gap-2 opacity-5'>
                                    {eventDetails?.tags?.map((tag, i)=><span key={i}>#{tag}</span>)}
                                </div>
                            
                                {eventDetails.agenda && 
                                <>
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
                                </>
                                }

                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='organisor__details py-2 px-2 rounded-md flex flex-col gap-2'>
                                    <div className='flex items-center gap-1'>
                                        <img src={images.africa} alt="" className='profile__rounded shadow-4 rounded-full cover' />
                                        <div className='flex flex-col'>
                                            <span>{eventDetails.organizer}</span>
                                            <span className='opacity-5'>Event Organisor</span>
                                        </div>
                                    </div>

                                    {eventDetails.about && 
                                    <div>
                                        <h5 className=''>About Jordan Peterson</h5>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                                        </p>
                                    </div>}

                                    {eventDetails.contact && 
                                    <div className=''>
                                        <div className='flex gap-1 items-center opacity-5 mb-1'>
                                            <i className='fas fa-envelope'></i>
                                            <span>Contact</span>
                                        </div>
                                        <a href='mailto:jordanpeterson@alumni.com' className='text'>jordanpeterson@alumni.com</a>
                                    </div>
                                    }

                                </div>
                                <div>
                                    <h3>SPEAKERS</h3>
                                    <div className='flex flex-col mt-1 gap-1 opacity-7'>
                                        {eventDetails?.speakers?.map((speaker, i)=>(
                                            <span key={i} className='color-darkblue'>{speaker}</span>
                                        ))

                                        }                                        
                                    </div>
                                </div>
                                <div>
                                    <h3>SPONSORS</h3>
                                    <div className='flex flex-col mt-1 gap-1'>
                                        {eventDetails?.sponsors?.map((sponsor, i)=>(
                                            <span key={i} className='color-main'>{sponsor}</span>
                                        ))
                                        }
                                    </div>
                                </div>

                            </div>

                        </section>                    
                    </>
                }

            </main>
            <Footer/>

            <Modal
                isOpen={openUpdateModal}
                setIsOpen={setUpdateModal}
            >
                <CreateEventForm 
                    eventFormData={eventFormData}
                    setEventFormData={setEventFormData}
                    isEdit={true}
                />
            </Modal>

            <Modal
                isOpen={openDeleteModal}
                setIsOpen={setOpenDeleteModal}
            >
                <div className='p-2 flex flex-col items-center'>
                    {message.text ?
                    
                    <div className={`text-center mb-1 rounded-sm message ${message.type === 'error' ? 'badge__error' : 'badge__success'}`}>{message.text}</div>
                    :
                    <>
                        <i className='fas fa-trash color-main text-2xl opacity-5 mb-1'></i>
                        <h3 className='text-lg font-400'>Are you sure you want to delete this event?</h3>
                        <div className='flex justify-between w-full gap-3 mt-3'>
                            <button onClick={()=>setOpenDeleteModal(false)} className='main__btn border__btn btn__gray'>No</button>
                            <button onClick={handleDeleteEvent} className='main__btn'>
                                {deleting ? "..." : "DELETE"}
                            </button>
                        </div>                    
                    </>
                    
                    }
                </div>
            </Modal>

        </>
    );
}

export default EventDetails;