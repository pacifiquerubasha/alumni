import React, { useContext, useEffect, useState } from 'react';
import AppWrapper from '../../components/AppWrapper';
import { AppContext } from '../../AppContext';
import { images } from '../../utils/images';
import { NavLink } from 'react-router-dom';
import { API_URL, getAllNews, getMyEvents, getRecentActivities, getUpcomingEvents } from '../../services/apis';
import { SubmitLoader } from '../../components/Loaders';
import { formatTime } from '../../utils/utils';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';

function Dashboard(props) {

    const {user} = useContext(AppContext);

    const [loading, setLoading] = useState(false);
    const [news, setNews] = useState([]);

    useEffect(()=>{
        const fetchNews = async()=>{
            try {
                setLoading(true)
                let response = await getAllNews();

                if(response?.data?.news){
                    setNews(response.data.news)
                }    
    
            } catch (error) {
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }

        fetchNews();
    }, [])

    const [loadingUpcoming, setLoadingUpcoming] = useState(false);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    
    useEffect(()=>{
        const fetchEvents = async()=>{
            try {
                setLoadingUpcoming(true)
                const events = await getUpcomingEvents();
                setUpcomingEvents(events?.data?.events);
                console.log(events)
                
            } catch (error) {
                console.log(error)                
            }
            finally{
                setLoadingUpcoming(false)
            }

        }
        fetchEvents();
    }, [])

    const [loadingActivities, setLoadingActivities] = useState(false);
    const [activities, setActivities] = useState([]);

    useEffect(()=>{
        const fetchActivities = async()=>{
            try {
                setLoadingActivities(true)
                const activities = await getRecentActivities(user?._id);
                setActivities(activities?.data?.activities);
                
            } catch (error) {
                console.log(error)                
            }
            finally{
                setLoadingActivities(false)
            }

        }
        fetchActivities();
    }, [])

    const [loadingEvents, setLoadingEvents] = useState(false);
    const [myEvents, setMyEvents] = useState([]);

    const stats = [
        {
            title: 'Total Events',
            value: myEvents.length
        },
        {
            title: 'Total RSVPs',
            value: myEvents.reduce((acc, curr)=>acc+curr.totalRSVPS, 0)
        },
        {
            title: 'Canceled',
            value: myEvents.reduce((acc, curr)=>{
                if(curr.isCanceled){
                    return acc+1
                }
                return acc
            }, 0)
        }
    ]

    useEffect(()=>{
        const fetchMyEvents = async()=>{
            try {
                setLoadingEvents(true)
                let response = await getMyEvents(user._id)
                if(response?.data?.events){
                    const data = response.data.events.sort((a, b)=>new Date(b.date) - new Date(a.date))
                    setMyEvents(data)
                    console.log(response.data.events)
                }
    
    
            } catch (error) {
                console.log(error)
            }
            finally{
                setLoadingEvents(false)
            }
        }
        if(user){
            fetchMyEvents();
        }
    }, [user])
    


    return (
        <AppWrapper title="DASHBOARD">
            <div className='flex flex-col'>

                <div className='flex gap-3'>
                    <div className='w-7/10 flex flex-col gap-2'>
                        <div className='flex items-center justify-between'>
                            <h2 className='font-400'><span className='text-lg opacity-5'>Welcome Back,</span><br/><span className='font-600 text-xl'>{user?.firstName} {user?.lastName}</span></h2>
                        </div>
                        {loading ?

                            <div className='news__banner big__skel rounded-lg skel__anim'></div>
                            :
                            <div className='dash__swiper'>
                                <Swiper 
                                    speed={2000}
                                    autoplay={{
                                        delay: 1500,
                                        disableOnInteraction: false,
                                    }}
                                    loop={true}
                                    pagination={true} 
                                    keyboard={{
                                        enabled: true,
                                    }}
                                    modules={[Keyboard, Pagination, Autoplay, EffectFade]} 
                                    effect="fade"
                                    className="heroSwiper">
                
                                    {
                                        news.map((slide, i)=>(
                                            <SwiperSlide key={i}>
                                                <div className='news__banner isolate flex rounded-lg overflow-hidden relative'>
                                                    <img src={slide.image ? `${API_URL}/images/${slide.image}` : images.celebrate} alt="" className='news__banner--img cover' />
                                                    <div className='news__banner--content flex w-full  flex-col items-start justify-center px-3'>
                                                        <h3 className='text-white text-2xl'>{slide.title}</h3>
                                                        <p className='text-white text-left'>
                                                            {slide.description}
                                                        </p>
                                                        <a href={slide.link} target='_blank' className='mt-2'><button className="main__btn p-1/2 px-3">Visit</button></a>

                                                    </div>
                                                </div> 
                                            </SwiperSlide>
                                        )
                                        )
                                    }
                
                                </Swiper>
                            </div>                                                 
                        }
                        
                    </div>
                    <div className='w-1/4 pt-3'>
                        <h3 className='font-500 mb-2'>Upcomimg Events</h3>
                        {
                            loadingUpcoming ?
                            <div className='dash__loader flex flex-col gap-1'>
                                {new Array(3).fill(0).map((_, i)=>(
                                    <div className={`py-1 bg-white skel__anim flex rounded-md justify-between gap-2 items-center`}>
                                    </div>
                                ))}
                            </div>
                            :
                            <div className='flex flex-col gap-1'>
                                {
                                    upcomingEvents.length === 0 ?
                                        <div className='flex flex-col items-center'>
                                            <img src={images.empty1} className='empty__dash'/>
                                            <span className='opacity-5'>No Upcoming Events</span>
                                        </div>
                                    :
                                    <>
                                        {upcomingEvents.map((event, i)=>(
                                            <NavLink to={`/alumni-events/${event._id}`} className={`dash__event flex justify-between gap-2 items-center`}>
                                                <p className='ellipsis'>{event.title}</p>
                                                <span>{new Date(event.date).getDate()}/{new Date(event.date).getMonth()+1}</span>
                                            </NavLink>
                                        ))}

                                    </>
                                }
                            </div>
                        }
                    </div>
                </div>

                <div className='quick__actions mt-3'>
                    <h5 className="dash__title">Quick Actions</h5>
                    <div className='flex gap-2 mt-1'>
                        <NavLink to="/alumni-events" className={`quick__action--item`}>All Events</NavLink>
                        <NavLink to="/my-events" className={`quick__action--item`}>My Events</NavLink>
                        <NavLink to="/profile" className={`quick__action--item`}>Modify Profile</NavLink>
                        {user?.role === "manager" && <NavLink to="/news" className={`quick__action--item`}>News</NavLink>}
                    </div>
                </div>

                <div className='flex gap-3 mt-5'>
                    <div className='flex-1'>
                        
                        <div>
                            <h5 className="dash__title">Events</h5>
                            {
                                loadingEvents ?
                                <div className='dash__loader flex mt-1 gap-1'>
                                    {new Array(3).fill(0).map((_, i)=>(
                                        <div className={`my__events--stat bg-white skel__anim flex rounded-md w-3/10 py-4 justify-between gap-2 items-center`}>
                                        </div>
                                    ))}
                                </div>
                                :
                                <div className='flex mt-1 gap-2'>
                                    {stats.map((stat, i)=>(
                                        <div className={`my__events--stat overflow-hidden py-2 ev__stat--${i} w-3/10 flex flex-col items-center justify-center`}>
                                            <div className='text-2xl font-500'>{stat.value}</div>
                                            <p>{stat.title}</p>
                                        </div>
                                    ))}                         
                                </div>
                            
                            }
                        </div>
                        
                    </div>
                    <div className='w-1/4 flex flex-col'>
                        <h3 className='font-500 mb-2'>User Activity</h3>
                        {
                            loadingActivities ?
                            <div className='dash__loader flex flex-col gap-1'>
                                {new Array(3).fill(0).map((_, i)=>(
                                    <div className={`py-1 bg-white skel__anim flex rounded-md justify-between gap-2 items-center`}>
                                    </div>
                                ))}
                            </div>
                            :
                            <div className='flex flex-col'>
                                {
                                    activities.length === 0 ?
                                        <div className='flex flex-col items-center'>
                                            <img src={images.empty1} className='empty__dash'/>
                                            <span className='opacity-5'>No Activity yet</span>
                                        </div>
                                    :
                                    <>
                                    {activities.map((activity, i)=>(
                                        <NavLink to={`${activity.path}`} className={`user__activity ${activity.type} `}>
                                            <p>{activity.message}</p>
                                            <span className='opacity-5'>{formatTime(activity.createdAt)}</span>
                                        </NavLink>
                                    ))}
                                    </>
                                }                                
                            </div>
                        }
                    </div>

                </div>






            </div>
            
        </AppWrapper>
    );
}

export default Dashboard;