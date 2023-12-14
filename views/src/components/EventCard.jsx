import React, { useContext, useState } from 'react';
import { images } from '../utils/images';
import { NavLink, useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/utils';
import { API_URL, handleRegister } from '../services/apis';
import { AppContext } from '../AppContext';

function EventCard({data, isApp}) {

    const {user} = useContext(AppContext);
    const navigate = useNavigate();

    const [registering, setRegistering] = useState(false);
    
    const registerEvent = async()=>{
        if(!user){
            navigate("/login")
            return;
        }
        
        try {
            setRegistering(true);
            let res = await handleRegister({eventId: data._id, userId: user._id });
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

    const clickLink = isApp ? "alumni-events" : "events"

    return (
        <div className='card__repeated block rounded-lg overflow-hidden flex flex-col'>
            <NavLink to={`/${clickLink}/${data?._id}`} className='relative'>

                <img src={`${API_URL}/images/${data?.image}` || images.celebrate} alt="" className='cover' />
                
                <div className='card__organisor p-1 pt-2 absolute bottom-0 left-0 text-white w-full font-600 text-xl'>
                    {data?.organizer?.name}
                </div>
            </NavLink>
            <div className='px-2 py-1 flex flex-col flex-1'>
                <div className='opacity-5'>{formatDate(data?.date)}</div>
                <h4 className='text-xl'>{data?.title}</h4>
                <p className='text-md mb-2'>{data?.organizer?.dabout}</p>
                <div className='flex gap-1 items-center opacity-5'>
                    <i className='fas fa-map-marker'></i>
                    <span>{data?.location}</span>
                </div>   
                <div className='flex flex-1 justify-between mt-2 items-end'>
                    <div className='flex items-center gap-1'>
                        <div className='card__icon'>
                            <i className='fas fa-group'></i>
                        </div>
                        <span>{data?.totalRSVPS}</span>
                    </div>
                    
                    {data?.attendees?.some((attendee)=>attendee?._id === user?._id) ?
                        <>
                        {data.isCanceled ? 
                            <i className='fas fa-times-circle text-red text-xl'></i> :
                            <i className='fas fa-check-circle text-green text-xl'></i>
                        }
                        </>
                        :
                        <button onClick={registerEvent} className='main__btn border__btn font-400'>
                            {registering ? "..." : "RSVP"}
                        </button>

                    }
                
                </div>                             
            </div>

        </div>
    );
}

export default EventCard;