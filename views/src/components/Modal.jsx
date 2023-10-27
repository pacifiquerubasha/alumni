import React, { useEffect, useRef } from 'react';

function Modal({isOpen, setIsOpen, children}) {

    const modalRef = useRef(null);
    const modalContentRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
            if(isOpen)
                setIsOpen(false);   
        }
    };
    
    useEffect(() => {

        if(isOpen){
            modalRef?.current?.addEventListener('click', handleClickOutside);
            return () => {
              modalRef?.current?.removeEventListener('click', handleClickOutside);
            };
        }

    
    }, [isOpen]);
    return (

        <>
        {isOpen &&

            <div ref={modalRef} className='custom__modal full-center'>
                
                <div ref={modalContentRef} className='modal__content relative p-1 bg-white rounded-md'>
                    <i className='fas fa-times close__modal' onClick={()=>setIsOpen(false)}></i>
                    {children}
                </div>
                
            </div>
        }

        </>
    );
}

export default Modal;