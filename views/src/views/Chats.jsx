import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { images } from '../utils/images';

function Chats(props) {

    const messages = [
        {
          message: "Hey, how's it going?",
          date: "2023-10-15 09:30 AM",
          sent: true,
        },
        {
          message: "Hi there! I'm good, thanks. How about you?",
          date: "2023-10-15 09:35 AM",
          sent: false,
        },
        {
          message: "I'm doing well too, thanks for asking!",
          date: "2023-10-15 09:40 AM",
          sent: true,
        },
        {
          message: "What have you been up to lately?",
          date: "2023-10-15 09:45 AM",
          sent: true,
        },
        {
          message: "I've been studying for our upcoming exams and enjoying some time with friends.",
          date: "2023-10-15 09:50 AM",
          sent: false,
        },
        {
          message: "That sounds great! I've been doing the same. We should catch up soon.",
          date: "2023-10-15 09:55 AM",
          sent: true,
        },
        {
          message: "Definitely! Let's plan something for the weekend.",
          date: "2023-10-15 10:00 AM",
          sent: false,
        },
        {
            message: "That sounds great! I've been doing the same. We should catch up soon.",
            date: "2023-10-15 09:55 AM",
            sent: true,
          },
      ];
    
      const sortedMessages = messages.sort((a, b)=>new Date(a.date) - new Date(b));
      
      
    return (
        <>
            <Header/>
            <main className='main__padding bg-whiteorange flex gap-2 px-3 pb-2 chat__page'>
                <div className='w-3/10 relative rounded-lg p-2 mt-2 bg-white flex flex-col'>
                    <div className='flex justify-between items-center mb-2'>
                        <h1>Chats</h1>
                        <button className='bg-main text-white flex full-center'>
                            CONNECT
                        </button>
                    </div>
                    <form action="" className='flex items-center gap-1 border-gray p-1/2 rounded-md'>
                        <i className='fas fa-search opacity-5'></i>
                        <input type="text" name="" id="" placeholder='Search' className='border-none flex-1 p-1/2 no-focus'/>
                    </form>

                    <div className='mt-1 flex flex-col flex-1 gap-1 overflow-y-auto overflow-x-hidden'>
                        {
                         new Array(5).fill(0).map((_, i)=>(
                            <div className={`flex  gap-2 chat__repeated rounded-md cursor-pointer ${i=== 0 ? "active" : ""}`}>
                                <div className="chat__profile rounded-full overflow-hidden shrink-0">
                                    <img src={images.user} alt="" className='cover w-full h-full' />
                                </div>
                                <div className='w-7/10 flex flex-col justify-between'>
                                    <h5 className='font-700 text-lg'>John Doe</h5>
                                    <p className='text-sm text-gray ellipsis'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                                </div>
                                <div className='flex flex-col justify-between items-center w-1/10'>
                                    <h5 className='font-700'>11:00</h5>
                                    <div className='unread__tag'>2</div>
                                </div>

                            </div>
                         ))
                        }

                    </div>

                    

                </div>
                <div className='flex-1 mt-2 bg-white rounded-md relative flex flex-col '>
                    <div className="chat__header bg-white rounded-md shadow-3 p-1 flex items-center gap-2">
                        <div className="chat__header--profile rounded-full overflow-hidden shrink-0">
                            <img src={images.user} alt="" className='cover w-full h-full' />
                        </div>
                        <div className='flex-1 flex flex-col justify-between'>
                            <h5 className='font-700 text-lg'>John Doe</h5>
                            <p className='text-sm text-gray ellipsis'>Online</p>
                        </div>
                        <i className='fas fa-ellipsis-vertical text-xl'></i>
                    </div>

                    <div className='px-1 messages__core overflow-y-auto flex-1'>
                        {
                            sortedMessages.map((message, i)=>{
                                const nextMessageAlsoSent = i+1 < sortedMessages.length ? sortedMessages[i+1].sent : (!message.sent);

                                return(
                                <div className={` ${message.sent ? "message__sent flex-row-reverse" : "message__received"}  pt-1 mb-1 flex items-end gap-1`}>
                                    <div className={`chat__message--profile rounded-full overflow-hidden shrink-0`}>
                                        <img src={images.user} className={`cover w-full h-full ${message.sent ? `${nextMessageAlsoSent ? "hidden" : ""}` : `${!nextMessageAlsoSent ? "hidden" : ""}` } `} />
                                    </div>
                                    <div className="message__body p-1">
                                        {message.message}
                                    </div>
                                </div>
                                )
                            })
                        }
                        

                    </div>
                    <form action="" className='flex px-2 py-1 items-center gap-2 chat__form w-full blurry-background'>
                        <input type="text" className='flex-1 p-1 border' placeholder='Message'/>
                        <i className='fas fa-send bg-main p-1 rounded-md text-white'></i>
                    </form>

                </div>
            </main>
            {/* <Footer/> */}
        </>
    );
}

export default Chats;