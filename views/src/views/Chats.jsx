import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { images } from '../utils/images';
import { AppContext } from '../AppContext';

import io from "socket.io-client"
import { API_URL, getUsers } from '../services/apis';
import Modal from '../components/Modal';


const socket = io.connect(API_URL);

function Chats(props) {
    const {user} = useContext(AppContext);

    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);

    useEffect(()=>{
        const fetchUsers = async()=>{
            try {
                setLoadingUsers(true)
                const response = await getUsers();
                if(response.data.users){
                    const filteredUsers = response?.data?.users.filter((item)=>item._id !== user._id);
                    setUsers(filteredUsers);
                    console.log(filteredUsers)
                }
                
            } catch (error) {
                console.log(error)
            }
            finally{
                setLoadingUsers(false)
            }
        }

        fetchUsers();
    }, [])

    const testMessages = [
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
    
    const sortedMessages = testMessages.sort((a, b)=>new Date(a.date) - new Date(b));

    const [conversations, setConversations] = useState([]);
    const [chatOpen, setChatOpen] = useState(false);
    
    const [messageData, setMessageData] = useState({
        message: "",
        date: "",
        time: "",
        sender: "",
        recepient: ""
    
    })


    const handleSendMessage = ()=>{
        const data = {
            message: "That sounds great! I've been doing the same. We should catch up soon.",
            date: "2023-10-15",
            time: "09:55",
            sender: "653514d0e83623c11c1036c6",
            recepient: "653a243a5711d2689324d63b"
        }
        socket.emit('send__message', data);
    }

    const startConversation = (recepientId)=>{
        const data = {
            senderId:user._id,
            recepientId
        }

        socket.emit('start__conversation', data);
    
    }


    useEffect(() => {
        socket.on("receive__message", (data) => {
          console.log("YYYY", data)
        });
        return () => socket.removeListener('receive__message')
      }, []);



      
    return (
        <>
            <Header/>
            <main className='main__padding bg-whiteorange flex gap-2 px-3 pb-2 chat__page'>
                <div className='w-3/10 relative rounded-lg p-2 mt-2 bg-white flex flex-col'>
                    <div className='flex justify-between items-center mb-2'>
                        <h1>Chats</h1>
                        <button onClick={setModalOpened} className='bg-main text-white flex full-center'>
                            CONNECT
                        </button>
                    </div>
                    <form action="" className='flex items-center gap-1 border-gray p-1/2 rounded-md'>
                        <i className='fas fa-search opacity-5'></i>
                        <input type="text" name="" id="" placeholder='Search' className='border-none flex-1 p-1/2 no-focus'/>
                    </form>

                    {
                        conversations.length === 0 ?
                        <div className='flex flex-col justify-center items-center flex-1'>
                            <img src={images.startChat} alt="" className='w-1/2 h-1/2' />
                            <h5 className='text-center text-lg font-400 text-gray'>No conversations yet</h5>
                        </div>

                        :

                        <div className='mt-1 flex flex-col flex-1 gap-1 overflow-y-auto overflow-x-hidden'>
                            {
                            conversations.map((_, i)=>(
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
                    }


                </div>

                {!chatOpen ?
                    <div className='flex-1 mt-2 flex flex-col full-center gap-3'>
                        <img src={images.connect} alt="" className='closed__chats--img' />
                        <p className='opacity-4'>
                            Alumni: Building bridges through time and forging an unbreakable legacy
                        </p>

                        <h1 className='text-center text-lg font-400 text-gray'>Connect with other ALUmineers today</h1>
                        
                    </div>

                    :

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

                }
            </main>
            <Modal
            isOpen={modalOpened}
            setIsOpen={setModalOpened}            
            >
                <div className='flex flex-col gap-2 users__search--modal'>
                    <h1 className='opacity-5 font-400'>Alumnis</h1>
                    <form className='w-full'>
                        <input type="text" name="" id="" placeholder='Search' className='border-gray w-full p-1/2 rounded-sm'/>
                    </form>
                    <div>
                        {users.map((user)=>(
                            <div onClick={()=>startConversation(user._id)} className='flex items-center gap-1 user__repeated'>
                                <img src={images.user2} alt="" className='small__profile rounded-full cover'/>
                                <p>{user.firstName} {user.lastName}</p>
                            </div>
                        ))                            
                        }
                    </div>                    
                </div>

            </Modal>
        </>
    );
}

export default Chats;