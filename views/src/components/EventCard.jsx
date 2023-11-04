import React, { useContext } from 'react';
import { images } from '../utils/images';
import { NavLink } from 'react-router-dom';
import { formatDate } from '../utils/utils';
import { API_URL } from '../services/apis';
import { AppContext } from '../AppContext';

function EventCard({data}) {

    const {user} = useContext(AppContext);

    const handleOpenRSVPopup = (e)=>{
        e.stopPropagation();
        console.log('RSVP', data);
    }

    return (
        <div className='card__repeated block rounded-lg overflow-hidden'>
            <NavLink to={`/events/${data?._id}`} className='relative'>

                <img src={`${API_URL}/images/${data?.image}` || images.celebrate} alt="" className='cover' />
                
                <div className='card__organisor p-1 pt-2 absolute bottom-0 left-0 text-white w-full font-600 text-xl'>
                    {data?.organizer?.name}
                </div>
            </NavLink>
            <div className='px-2 py-1'>
                <div className='opacity-5'>{formatDate(data?.date)}</div>
                <h4 className='text-xl'>{data?.title}</h4>
                <p className='text-md mb-2'>{data?.organizer?.dabout}</p>
                <div className='flex gap-1 items-center opacity-5'>
                    <i className='fas fa-map-marker'></i>
                    <span>{data?.location}</span>
                </div>   
                <div className='flex justify-between mt-2 items-center'>
                    <div className='flex items-center gap-1'>
                        <div className='card__icon'>
                            <i className='fas fa-group'></i>
                        </div>
                        <span>{data?.totalRSVPS}</span>
                    </div>
                    {data?.attendees?.some((attendee)=>attendee?._id === user?._id) ?
                        <i className='fas fa-check-circle text-green text-xl'></i>
                        :
                        <button onClick={handleOpenRSVPopup} className='main__btn border__btn font-400'>
                            RSVP
                        </button>

                    }
                
                </div>                             
            </div>

        </div>
    );
}

export default EventCard;