import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { images } from '../utils/images';

function Profile(props) {

    const stats = [
        {
            title: 'Events',
            value: 12
        },
        {
            title: 'Followers',
            value: 12
        },
        {
            title: 'Following',
            value: 12
        },
        {
            title: 'Posts',
            value: 12
        },
    ]

    const handleChange = (e)=>{
        console.log(e.target.value)
    }

    const [isEditGeneral, setIsEditGeneral] = useState(false);

    return (
        <>
            <Header/>
            <main className="main__padding bg-whiteorange">
                <section className="details__hero relative profile__hero relative flex">
                    <img src={images.banner} className='h-full cover' alt="" />
                    <div className='profile__starter text-white py-2 flex justify-between items-end absolute w-3/4 px-2'>
                        <div className='flex items-end gap-3'> 
                            <div className='profile__page--img overflow-hidden relative'>
                                <img src={images.user2} alt="" className='w-full h-full cover' />
                                <input type="file" id='changeProfileImage' hidden/>
                                <label htmlFor="changeProfileImage" className='absolute cursor-pointer py-2 w-full full-center change__profile--Label'>
                                    <i className='fas fa-camera text-xl'></i>
                                </label>
                            </div>
                            <div>
                                <h5 className='text-2xl font-500'>Pacifique Rubasha</h5>
                                <div className='mb-1 opacity-7'><i className='fas fa-map-marker'></i>&nbsp;Pamplemousses, Mauritius </div>
                                <div className='flex gap-1 items-center'>
                                    <div className='profile__role'>Sofware Developer</div>
                                    <div>Bank of Africa</div>
                                </div>
                            </div>

                        </div>
                        <div className='flex'>
                            {stats.map((stat, i)=>(
                                <div key={i} className={`text-center px-2 ${i<stats.length-1 ? "stat__border relative" : ""}`}>
                                    <div className='text-4xl font-500'>{stat.value}</div>
                                    <div className='opacity-7'>{stat.title}</div>
                                </div>
                            ))

                            }

                        </div>

                    </div>
                </section>
                <section className='py-5 flex'>
                    <div className="w-3/4 mx-auto p-2 flex gap-5">
                        <div className='bg-white flex flex-col justify-between p-2 rounded-md'>
                            <div>
                                <span className='opacity-5'>MENU</span>
                                <div className='flex flex-col gap-1 mt-2'>
                                    <div className={`opacity-7 p-1/2 cursor-pointer rounded-sm current__tab px-1`}>General Information</div>
                                    <div className={`opacity-7 p-1/2 cursor-pointer rounded-sm px-1`}>Change Password</div>
                                </div>
                            </div>
                            <button className='bg-main text-white p-1/2'>
                                <i className='fas fa-plane'></i>&nbsp;
                                Logout
                            </button>
                        </div>

                        <div className="flex-1">
                            <div className='flex items-center justify-between'>
                                <h3 className='text-2xl font-500 opacity-5'>General Information</h3>
                                <button className='border__btn main__btn flex items-center text-lg px-1'>
                                    <i className='fas fa-edit'></i>&nbsp;
                                    Edit
                                </button>
                            </div>
                            <form className='contact__form auth__form signup__form mt-3 w-full'>

                                <div className='flex gap-2 w-full'>
                                    <div className="form__group flex-1">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" id="firstName" name="firstName" value="Pacifique" placeholder="Your First Name" onChange={handleChange} required readOnly={isEditGeneral}/>
                                    </div>
                                    <div className="form__group flex-1">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" id="lastName" name="lastName" value="Rubasha" placeholder="Your Last Name" onChange={handleChange} required readOnly={isEditGeneral}/>
                                    </div>
                                </div>
                                
                                <div className='flex gap-2 w-full'>
                                    <div className="form__group flex-1">
                                        <label htmlFor="middlename">Middlename</label>
                                        <input type="text" id="middlename" name="middlename" value="Kishinyambwe" placeholder="Your Middlename" onChange={handleChange} readOnly={isEditGeneral}/>
                                    </div>
                                    <div className="form__group flex-1">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" id="username" name="username" value="pacifiquerubasha" placeholder="Your Username" onChange={handleChange} required readOnly={isEditGeneral}/>
                                    </div>
                                </div>
                                <div className='flex gap-2 w-full'>
                                    <div className="form__group flex-1">
                                        <label htmlFor="jobTitle">Job title</label>
                                        <input type="text" id="jobTitle" name="jobTitle" value="Software Developer" placeholder="Your Job title" onChange={handleChange} required readOnly={isEditGeneral}/>
                                    </div>
                                    <div className="form__group flex-1">
                                        <label htmlFor="company">Company</label>
                                        <input type="text" id="company" name="company" value="Bank of Africa" placeholder="Your company" onChange={handleChange} required readOnly={isEditGeneral}/>
                                    </div>
                                </div>
                                <div className='flex gap-2 w-full'>
                                    <div className="form__group flex-1">
                                        <label htmlFor="about">About</label>
                                        <textarea id="about" rows={5} name="about" placeholder="Your about" onChange={handleChange} required readOnly={isEditGeneral}>

                                        </textarea>
                                    </div>
                                    <div className="form__group flex-1">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" id="address" name="address" value="Pamplemousses, Mauritius" placeholder="Your address" onChange={handleChange} required readOnly={isEditGeneral}/>
                                    </div>
                                </div>
                                <button className='main__btn mt-1'>SAVE</button>
                            </form>


                        </div>
                            
                    </div>
                </section>
            </main>

            <Footer/>
        </>          
        
    );
}

export default Profile;