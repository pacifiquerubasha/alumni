import React, {useContext, useEffect, useState} from 'react';
import Select from './CustomSelect';
import { createEvent, updateEvent } from '../services/apis';
import { AppContext } from '../AppContext';
import { useParams } from 'react-router-dom';
import EventDetails from '../views/EventDetails';
import { SubmitLoader } from './Loaders';

function CreateEventForm({eventFormData, setEventFormData, isEdit}) {

    const {id} = useParams();

    const {user} = useContext(AppContext);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        text: ''        
    })

    const handleChange = (e)=>{
        setEventFormData({...eventFormData, [e.target.name]: e.target.value});
    }

    const handleUploadImage = (e)=>{
        setEventFormData({...eventFormData, image: e.target.files[0]});
    }

    const handleChangeCommaSeparated = (e)=>{
        setEventFormData({...eventFormData, [e.target.name]: e.target.value.split(',')});
    }

    const handleSelect = (key, value)=> setEventFormData({...eventFormData, [key]: value});

    const [currentStep, setCurrentStep] = useState(1);

    const eventTypes = [
        'Professional Development',
        'Campus Events',
        'Networking'
    ]

    const handleSubmit = async(e)=>{
        e.preventDefault();
  
        try {
            setLoading(true);
            const data = {
                ...eventFormData, 
                createdBy: user._id
            }
            const token = localStorage.getItem("alumineersToken")

            const response = await createEvent(data, token);
            if(response.data.event){
                setMessage({
                    type: 'success',
                    text: 'Event registration successfull'
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }

            
        } catch (error) {
            setMessage({
                type: 'error',
                text: error?.response?.data?.data?.message
            })            
        }
        finally{            
            setLoading(false);
        }
    }

    const handleUpdate = async(e)=>{
        e.preventDefault();
  
        try {
            setLoading(true);
            const data = {
                ...eventFormData, 
                createdBy: user._id,
            }
            const token = localStorage.getItem("alumineersToken")

            const response = await updateEvent(data, id, token);
            if(response.data.event){
                setMessage({
                    type: 'success',
                    text: 'Event update successfull'
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }

            
        } catch (error) {
            setMessage({
                type: 'error',
                text: error?.response?.data?.data?.message
            })            
        }
        finally{            
            setLoading(false);
        }
    }



    return (
        <form onSubmit={ !isEdit ? handleSubmit : handleUpdate} className='contact__form overflow-y-auto px-1 auth__form signup__form'>
            <h3 className='text-2xl font-500 color-darkblue'>{isEdit ? "Edit" : "Create"} Event</h3>
            <p className='opacity-5 mb-2'>Provide the necessary information about the event</p>
            {message.text && <div className={`text-center mb-1 rounded-sm message ${message.type === 'error' ? 'badge__error' : 'badge__success'}`}>{message.text}</div>}
            {currentStep === 1 ?
            <>
                <div className="form__group">
                    <label htmlFor="title">Event Title</label>
                    <input type="text" id="title" name="title" value={eventFormData.title} placeholder="Event title" onChange={handleChange} required/>
                </div>
                <div className="form__group">
                    <label htmlFor="description">Event Description</label>
                    <textarea id="description" rows={10} name="description" value={eventFormData.description} placeholder="Event description" onChange={handleChange} required/>
                </div>
                <div className="form__group">
                    <label htmlFor="organizer">Event Organizer</label>
                    <input type="text" id="organizer" name="organizer" value={eventFormData.organizer} placeholder="Event Organizer" onChange={handleChange} required/>
                </div>

                <div className='flex justify-end mt-2'>
                    <button onClick={()=>setCurrentStep(2)} type='button' className="main__btn border__btn">
                        NEXT
                    </button>
                </div>
            
            </>

            :

            currentStep === 2 ?

            <>

                <Select handleChange={handleSelect} label="Event type" name="eventType" options={eventTypes} selectedValue={eventFormData.eventType}/>  

                <div className="form__group">
                    <label htmlFor="location">Event Location</label>
                    <input type="text" id="location" name="location" value={eventFormData.location} placeholder="Event location" onChange={handleChange} required/>
                </div>
                <div className="form__group mt-1">
                    <label htmlFor="date">Event Date</label>
                    <input type="date" id="date" name="date" value={eventFormData?.date?.split("T")[0]} placeholder="Event date" onChange={handleChange} required/>
                </div>
                <div className="form__group mt-1">
                    <label htmlFor="time">Event Time</label>
                    <input type="time" id="time" name="time" value={eventFormData.time} placeholder="Event time" onChange={handleChange} required/>
                </div>
                <div className="form__group">
                    <label htmlFor="image">Event Image</label>
                    <input type="file" id="image" name="image" placeholder="Event image" onChange={handleUploadImage} required/>
                </div>

                

                <div className='flex justify-between mt-2'>
                    <button onClick={()=>setCurrentStep(1)} type='button' className="main__btn border__btn btn__gray">
                        PREV
                    </button>
                    <button onClick={()=>setCurrentStep(3)} type='button' className="main__btn border__btn">
                        NEXT
                    </button>
                </div>          
            </>

            :

            <>

                <div className="form__group">
                    <label htmlFor="speakers">Speakers(Eg. Jordan Peterson, Fred Swaniker)</label>
                    <input type="text" id="speakers" name="speakers" value={eventFormData.speakers} placeholder="Event speakers" onChange={handleChangeCommaSeparated} required/>
                </div>
                <div className="form__group">
                    <label htmlFor="sponsors">Sponsors(Eg. MCF, Ministry of Youth)</label>
                    <input type="text" id="sponsors" name="sponsors" value={eventFormData.sponsors?.join(",")} placeholder="Event sponsors" onChange={handleChangeCommaSeparated} required/>
                </div>
                <div className="form__group">
                    <label htmlFor="tags">Tags(Eg. swe, wellness)</label>
                    <input type="text" id="tags" name="tags" value={eventFormData.tags?.join(",")} placeholder="Event tags" onChange={handleChangeCommaSeparated} required/>
                </div>
                <div className="form__group">
                    <label htmlFor="capacity">Capacity</label>
                    <input type="number" id="capacity" name="capacity" value={eventFormData.capacity} placeholder="Event capacity" onChange={handleChange} required/>
                </div>

                

                <div className='flex justify-between mt-2'>
                    <button onClick={()=>setCurrentStep(2)} type='button' className="main__btn border__btn btn__gray">
                        PREV
                    </button>
                    <button onClick={()=>setCurrentStep(3)} type='submit' className="main__btn">
                        {loading ?
                            <SubmitLoader/>
                            :
                            "SUBMIT"
                        }
                    </button>
                </div>          
            </>

            

            }




        </form>
    );
}

export default CreateEventForm;