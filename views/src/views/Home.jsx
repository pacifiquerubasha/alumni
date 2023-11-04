import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { How_It_Works } from '../utils/content';
import { images } from '../utils/images';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { getEvents } from '../services/apis';

function Home(props) {

    const objectives = [
        {
            title: "Connect",
            description: "Unite alumni to nurture lifelong connections that withstand time and distance.",
            icon: "fas fa-network-wired"
        },
        {
            title: "Empower",
            description: "Elevate careers through resources, workshops, and networking opportunities for professional growth.",
            icon: "fas fa-lightbulb"
        },
        {
            title: "Celebrate",
            description: "Relive and cherish campus memories through organized events and gatherings.",
            icon: "fas fa-glass-cheers"
        }
    ]

    const insights = [
        {
            title: "Total Alumni Members",
            value: "1000+",
            icon: "fas fa-group"
        },
        {
            title: "Events Organized",
            value: "1000+",
            icon: "fas fa-calendar"
        },
        {
            title: "Feedback Received",
            value: "1000+",
            icon: "fas fa-comments"
        },
        {
            title: "Alumni Success Stories",
            value: "1000+",
            icon: "fas fa-user-check"
        },
    ]

    const categories = [
        {
            title: "Professional Development",
            description: "Enhance your career with events focused on professional growth. From skill-building workshops to industry insights, these events are tailored to help alumni excel in their respective fields.",
            icon: "fas fa-network-wired"
        },
        {
            title: "Networking",
            description: "Forge valuable connections through networking events. Meet alumni with similar interests and goals, expand your professional network, and discover new opportunities for collaboration.",
            icon: "fas fa-network-wired"
        },
        {
            title: "Campus Events",
            description: "Relive the nostalgia of your campus days by participating in these events. From reunions to campus tours, these gatherings offer a chance to reminisce and create new memories on familiar grounds.",
            icon: "fas fa-network-wired"
        },
    ]

    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchEvents = async()=>{
            setLoading(true)
            const events = await getEvents();

            const upcoming = events?.data?.events.filter(event=>new Date(event.date) >= new Date());
            setUpcomingEvents(upcoming);

            setLoading(false)
 
        }

        fetchEvents();

    }, [])


    return (
        <>
            <Header/>
            <main>
                <section className="hero full-center flex-col">
                    <div className="container  relative w-3/5 mx-auto text-center flex flex-col items-center gap-2">
                        <h1 className='text-7xl color__darkblue'>
                            Rediscover Your Alma Mater, Reconnect, Relive.
                        </h1>
                        <p className='text-xl'>Connecting alumni, forging futures. Join our vibrant community to reconnect, grow, and create lasting memories.</p>

                        <div className="flex items-center gap-5 mt-5">
                            <button className='px-2 main__btn text-xl font-500'>Explore Events</button>
                            <button className='px-2 main__btn border__btn text-xl font-500'>Join Us</button>
                        </div>
                     

                    </div>
                    <div className='w-3/5 mt-5'>
                        <img src={images.hero} alt="" />
                    </div>
                </section>

                <section className='py-5 flex flex-col relative about__us'>
                    <div className='w-3/4 mx-auto mb-7'>
                        <p className="section__subtitle left__div text-2xl font-600">
                            Welcome to the hub for our alumni community, where we reconnect, 
                            collaborate, and create lasting memories. Our mission is to provide a 
                            space for alumni to come together, share experiences, and stay engaged with our alma mater.
                        </p>
                    </div>

                    <div className='w-3/4 mx-auto flex justify-end mt-7'>
                        <p className="section__subtitle right__div text-lg">
                            Our story began years ago when we first set foot on campus.
                             The friendships and knowledge we gained continue to shape us today. 
                             The alumni group was founded to carry these experiences forward.
                        </p>
                    </div>

                </section>

                <section className='py-5 flex flex-col gap-1 items-center'>
                    <h3 className="section__title"> Our Objectives </h3>
                    <p className="section__subtitle">
                        Our Commitment to You: Unlocking Opportunities, Cultivating Connections, and Nurturing Memories.
                    </p>

                    <div className='how__works full-center gap-3 w-3/4 mt-5'>
                        {objectives.map((objective, i)=>(
                            <div key={i} className='how__repeated'>
                                <i className={`${objective.icon} text-3xl color-main`}></i>
                                <h4 className='text-xl mt-1 mb-2 color-main'>{objective.title}</h4>
                                <p>{objective.description}</p>
                            </div>
                        ))}                        

                    </div>

                </section>

                <section className='py-5 flex'>
                    <div className="container mb-5 w-3/4 flex mx-auto items-center">
                        <div className='flex-1 section__celebrate relative'>
                            <img src={images.celebrate} alt="" className='rounded-lg' />
                        </div>
                        
                        <div className='flex-1 pl-3'>
                            <h3 className="section__title mb-2">{How_It_Works.title}</h3>
                            <p className='mb-3'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit quaerat error corporis reiciendis, iste vero obcaecati fugit pariatur accusamus quidem dolor tempore consequatur voluptas non, totam ipsa placeat tempora tenetur illo aperiam quasi assumenda reprehenderit! Molestiae quidem quas quis in placeat harum, mollitia optio sit aperiam maxime laudantium eveniet repellat.
                            </p>
                            <button className='px-2 main__btn text-lg font-500'>Explore Events</button>
                        </div>
                    </div>
                </section>

                <section className='py-5 flex flex-col gap-1 items-center'>
                    <h3 className="section__title"> Platform Insights </h3>
                    <div className="flex w-3/4 justify-between mt-5">
                        {insights.map((insight, i)=>(
                            <div className='flex items-center gap-1'>
                                <i className={`${insight.icon} text-7xl logo__gradient`}></i>
                                <div>
                                    <h4 className='text-4xl'>{insight.value}</h4>
                                    <p>{insight.title}</p>
                                </div>
                            </div>
                        ))}                       

                    </div>
                </section>

                <section className='py-5 flex'>
                    <div className="container w-3/4 flex mx-auto items-center">
                        <div className='flex-1'>
                            <h3 className="section__title mb-2">Event categories</h3>
                            <ul className='flex flex-col gap-2'>
                                {categories.map((category, i)=>(
                                    <li key={i} className='flex flex-col gap-1'>
                                        <div className='flex gap-1'>
                                            <div className='check__rounded'>
                                                <i className='fas fa-check'></i>
                                            </div>
                                            <div className='text-xl color-darkblue font-500'>{category.title}</div>
                                        </div>
                                        <p>
                                            {category.description}
                                        </p>
                                    </li>

                                ))

                                }
                                
                            </ul>
                        </div>
                        <div className='flex-1'>
                            <img src={images.categories} alt="" />
                        </div>
                    </div>
                </section>

                <section className='flex flex-col py-5 items-center'>
                    <div className='w-3/4 flex items-center justify-between mb-4'>
                        <h3 className="section__title">Upcoming Events</h3>
                        <NavLink to="/" className="flex items-center gap-1 color-main text-xl">More events <i className='fas fa-arrow-right'></i></NavLink>
                    </div>
                    <div className='flex w-3/4 mx-auto justify-between'>
                        
                        {upcomingEvents?.map((event, i)=>(
                            <div key={event._id} className='w-3/10'>
                                <EventCard data={event}/>
                            </div>
                        ))}


                    </div>
                </section>


            </main>

            <Footer/>
            
        </>
    );
}

export default Home;