import React, { useEffect, useRef, useState } from "react";



export function Select({label, name, options, handleChange, selectedValue}){

    const [selectValue, setSelectValue] = useState(selectedValue || "");
    const [showList, setShowList] = useState(false);

    const handleSelectOption = (e)=>{
        setSelectValue(e.target.textContent)
        
        const key = name;
        const value = e.target.textContent;

        handleChange(key, value);
    }

    const selectRef = useRef(null);

    const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setShowList(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    

    return(
        <div ref={selectRef} onClick={()=>setShowList((prev)=>!prev)} className='relative mb-1 w-45 bg-white cursor-pointer rounded-md p-1 select__input'>
            <div>{selectValue || `Select ${label}`}</div>
            {selectValue && <span className='select__label absolute'>{label}</span>}
            {showList &&
            <div className="select__list bg-white absolute flex flex-col p-1 rounded-md">
                {options.map((option, index)=><span onClick={(e)=>handleSelectOption(e, option)} key={index}>{option}</span>)

                }
            </div>}
        </div>
    )
}

export default Select