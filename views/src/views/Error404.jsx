import React from 'react';
import { images } from '../utils/images';
import { useNavigate } from 'react-router-dom';

function Error404(props) {
    const navigate = useNavigate();
    return (
        <div className='full-center h-screen'>

            <div className='full-center flex-col error__container px-2'>
                <img src={images.notFound} alt="" />
                <h1 className='my-1 section__title'>
                    404 Page Not Found
                </h1>
                <p className='opacity-5 text-center'>
                    The page you are looking for does not exist
                </p>
                <button className='main__btn mt-2' onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </div>
    );
}

export default Error404;