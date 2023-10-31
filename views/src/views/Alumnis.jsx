import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { images } from '../utils/images';
import Calendar from 'react-calendar';

function Alumnis(props) {

    //Alumni stats including total alumnis, total job titles, total companies, total deleted. Shouls be an array of objects(icon, total, label)
    const stats = [
        {
            icon: "fas fa-users",
            total: 100,
            label: "Alumnis"
        },
        {
            icon: "fas fa-briefcase",
            total: 100,
            label: "Job Titles"
        },
        {
            icon: "fas fa-building",
            total: 100,
            label: "Companies"
        },
        {
            icon: "fas fa-trash",
            total: 100,
            label: "Deleted"
        },
    ]

    const [calendarDate, setCalendarDate] = useState(new Date());

    return (
        <>
            <Header/>
            <main className="main__padding bg-whiteorange flex flex-col">
                <section className="stats w-4/5 mx-auto">
                    <div className='flex mb-2'>
                        {stats.map((stat, i)=>(
                            <div className="stats__card flex items-center gap-2 px-2 py-2 w-1/5">
                                <div className="stats__card--icon rounded-md">
                                    <i className={`${stat.icon} text-2xl`}></i>
                                </div>
                                <div className="stats__card--content">
                                    <h4 className='text-4xl color-main'>{stat.total}</h4>
                                    <p className='opacity-5'>{stat.label}</p>
                                </div>
                            </div>
                        ))}

                    </div>

                </section>

                <section className="alumnis w-4/5 mx-auto pb-5">
                    <h3 className='section__title mb-3'>Alumnis</h3>
                    <div className='w-1/2'>
                        <form className='flex gap-2'>
                            <input type="text" placeholder='Search' className='px-2 py-1 flex-1' />
                        </form>
                        <div className='my-2 flex gap-2 filters'>
                            <button className='active'>
                                <span>ACTIVE</span>
                            </button>
                            <button>
                                <span>DELETED</span>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-1'>
                        {new Array(20).fill(0).map((_, i)=>(
                            <div className="alumni__card bg-white relative rounded-lg flex items-center gap-2 px-2 py-2 w-1/5">
                                <div className="alumni__card--img">
                                    <img src={images.africa} alt="" className='profile__rounded shadow-4 rounded-full cover' />
                                </div>
                                <div className="alumni__card--content">
                                    <h4>John Doe</h4>
                                    <p className='opacity-5'>@johndoe</p>
                                </div>
                                <div className='alumni__card--more flex flex-col justify-center items-center gap-3'>                                    
                                    <i className='fas fa-ellipsis-vertical opacity-5'></i>
                                    <i className='fas fa-trash color-main'></i>
                                </div>
                            </div>
                        ))}
                    </div>

                </section>

                

            </main>

            <Footer/>
            
        </>
    );
}

export default Alumnis;