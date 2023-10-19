import React from 'react';
import { images } from '../utils/images';

function EventCard(props) {

    return (
        <div className='card__repeated rounded-lg overflow-hidden'>
            <div className='relative'>
                <img src={images.celebrate} alt="" />
                <div className='card__organisor p-1 pt-2 absolute bottom-0 left-0 text-white w-full font-600 text-xl'>
                    Jordan Peterson
                </div>
            </div>
            <div className='px-2 py-1'>
                <div className='opacity-5'>Sunday, 12 April | 10:00 am</div>
                <h4 className='text-xl'>Event Title</h4>
                <p className='text-md mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quidem.</p>
                <div className='flex gap-1 items-center opacity-5'>
                    <i className='fas fa-map-marker'></i>
                    <span>Location</span>
                </div>   
                <div className='flex justify-between mt-2'>
                    <div className='flex items-center gap-1'>
                        <div className='card__icon'>
                            <i className='fas fa-group'></i>
                        </div>
                        <span>1000+</span>
                    </div>
                    <button className='main__btn border__btn font-400'>
                        RSVP
                    </button>
                
                </div>                             
            </div>

        </div>
    );
}

export default EventCard;