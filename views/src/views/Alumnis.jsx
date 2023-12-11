import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { images } from '../utils/images';
import Calendar from 'react-calendar';
import AppWrapper from '../components/AppWrapper';
import { getUsers, API_URL } from '../services/apis';
import { SpinLoader } from '../components/Loaders';
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

function Alumnis(props) {

    const {user} = useContext(AppContext);

    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const [alumniData, setAlumniData] = useState({});

    const [allUsers, setAllUsers] = useState({});

    useEffect(()=> {
        const fetchUsers = async()=>{
            try {
                setLoading(true)
                const response = await getUsers();
                if(response.data){
                    setAlumniData(response.data);
                    
                    const categorizedUsers = response?.data?.users.reduce((cum, curr)=>{
                        if(curr.softDeleted){
                            cum.softDeleted.push(curr)
                        }
                        else{
                            cum.active.push(curr)
                        }
                        return cum;
                    }
                    , {active: [], softDeleted: []})

                    setAllUsers(categorizedUsers);
                }
                
            } catch (error) {
                console.log(error)                
            }
            finally{
                setLoading(false);
            }
        }
        fetchUsers();
    }, [])

    //Alumni stats including total alumnis, total job titles, total companies, total deleted. Shouls be an array of objects(icon, total, label)
    const stats = [
        {
            icon: "fas fa-users",
            total: alumniData.totalAlumnis,
            label: "Alumnis"
        },
        {
            icon: "fas fa-briefcase",
            total: alumniData?.uniqueJobTitles?.length,
            label: "Job Titles"
        },
        {
            icon: "fas fa-building",
            total: alumniData?.uniqueCompanies?.length,
            label: "Companies"
        },
        {
            icon: "fas fa-trash",
            total: 100,
            label: "Deleted"
        },
    ]

    const [calendarDate, setCalendarDate] = useState(new Date());

    const [showDeleted, setShowDeleted] = useState(false);

    return (
        <AppWrapper>
            {loading?
                <div className='loading__container full-center py-5'>
                    <SpinLoader/>
                </div>
            :
            <>
                <section className="stats mx-auto">
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

                <section className="alumnis mx-auto pb-5">
                    <h3 className='section__title mb-3'>Users</h3>
                    <div className='w-1/2'>
                        <form className='flex gap-2'>
                            <input type="text" placeholder='Search' className='px-2 py-1 flex-1' />
                        </form>
                        <div className='my-2 flex gap-2 filters'>
                            <button onClick={()=>setShowDeleted(false)} className={`${!showDeleted ? "active":""}`}>
                                <span>ACTIVE</span>
                            </button>
                            <button onClick={()=>setShowDeleted(true)} className={`${showDeleted ? "active":""}`}>
                                <span>DELETED</span>
                            </button>
                        </div>
                    </div>
                    {
                        !showDeleted ?
                        <div className='flex flex-wrap gap-1'>
                            {allUsers?.active?.map((alumni, i)=>(
                                <div onClick={()=>navigate(`/alumni/${alumni._id}`)} className={`alumni__card cursor-pointer bg-white relative rounded-lg flex items-center gap-2 px-2 py-2 ${user._id === alumni._id && "user__admin"} `}>
                                    <div className="alumni__card--img">
                                        <img src={` ${alumni?.profilePicture ? `${API_URL}/images/${alumni?.profilePicture}`: images.user}`} alt="" className='profile__rounded shadow-4 rounded-full cover' />
                                    </div>
                                    <div className="alumni__card--content">
                                        <h4>{alumni.firstName} {alumni.lastName}</h4>
                                        <p className='opacity-5'>@{alumni.username}</p>
                                    </div>
                                    {/* <div className='alumni__card--more flex flex-col justify-center items-center gap-3'>                                    
                                        <i className='fas fa-ellipsis-vertical opacity-5'></i>
                                        <i className='fas fa-trash color-main'></i>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                        :
                        <div className='flex flex-wrap gap-1'>
                            {allUsers?.softDeleted?.map((alumni, i)=>(
                                <div onClick={()=>navigate(`/alumni/${alumni._id}`)} className={`alumni__card cursor-pointer bg-white relative rounded-lg flex items-center gap-2 px-2 py-2 ${user._id === alumni._id && "user__admin"} `}>
                                    <div className="alumni__card--img">
                                        <img src={` ${alumni?.profilePicture ? `${API_URL}/images/${alumni?.profilePicture}`: images.user}`} alt="" className='profile__rounded shadow-4 rounded-full cover' />
                                    </div>
                                    <div className="alumni__card--content">
                                        <h4>{alumni.firstName} {alumni.lastName}</h4>
                                        <p className='opacity-5'>@{alumni.username}</p>
                                    </div>
                                    {/* <div className='alumni__card--more flex flex-col justify-center items-center gap-3'>                                    
                                        <i className='fas fa-ellipsis-vertical opacity-5'></i>
                                        <i className='fas fa-trash color-main'></i>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    }


                </section>            
            </>
            }
        </AppWrapper>

    );
}

export default Alumnis;