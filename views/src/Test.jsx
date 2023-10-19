import React, { useEffect, useState } from 'react';

function Test(props) {

    const [jokes, setJokes] = useState([]);
    const [allowFetching, setAllowFetching] = useState(false);


    const handleAllowFetch = ()=>{  
        setAllowFetching(true);
    }

    useEffect(        
        ()=>{

            function fetchJokes(){
                fetch("https://official-joke-api.appspot.com/random_ten")
                .then(response => response.json())
                .then(data => {
                    console.log('fetch data', data);
                    setJokes(data)
                })
            }

            if(allowFetching)
                fetchJokes();
        },         
        [allowFetching]    
    )




    return (
        <div className='flex full-center flex-col gap-2'>


            <div className='text-xl'>
                {jokes.length < 1 ?
                
                    <div>NO JOKES FOR YOU</div>

                    :

                    <div>
                        <div className='mb-5 text-green mt-2 text-500'>WE'VE GOT SOME</div>

                        {jokes.map((joke, index)=>{
                            
                            return (
                                <div key={joke.id} className='flex flex-col gap-2 mb-2'>
                                    <div className='opacity-5'>SETUP: {joke.setup}</div>
                                    <div className='text-500'>PUNCHLINE: {joke.punchline}</div>
                                </div>
                            )
                        })

                        }
                    </div>

                }

            </div>

            <button onClick={handleAllowFetch} className='bg-main'>FETCH JOKES</button>
            
        </div>
    );
}

export default Test;