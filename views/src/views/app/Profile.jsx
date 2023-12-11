import React, { useContext, useEffect, useState } from 'react';
import AppWrapper from '../../components/AppWrapper';
import { images } from '../../utils/images';
import { AppContext } from '../../AppContext';
import Modal from '../../components/Modal';
import { API_URL, changePassword, changeProfilePicture, logout, updateUser } from '../../services/apis';
import { useNavigate } from 'react-router-dom';
import { SubmitLoader } from '../../components/Loaders';

function Profile(props) {

    const {user} = useContext(AppContext);
    const navigate = useNavigate();

    const [formFields, setFormFields] = useState(user);

    const stats = [
        {
            title: 'Events',
            value: user?.eventsOrganized?.length
        },
        {
            title: 'RSVPs',
            value: user?.eventsParticipating?.length
        },
    ]

    const handleChange = (e)=>{
        console.log(e.target.value)
        setFormFields(
            {...formFields, [e.target.name]: e.target.value}
        )
    }

    const [isEditGeneral, setIsEditGeneral] = useState(false);
    const [isPasswordScreen, setIsPasswordScreen] = useState(false);


    const [openLogoutModal, setOpenLogoutModal] = useState(false);

    const handleLogout = async()=>{
        try {
            let response = await logout();
            if(response){
                localStorage.removeItem("alumneersToken");
                navigate("/login")
            }
            
        } catch (error) {
            console.log(error)            
        }
    }

    const [updatingUser, setUpdatingUser] = useState(false);

    const [message, setMessage] = useState({
        type: "",
        text: ""
    })

    const handleUpdateUser = async(e)=>{
        e.preventDefault();
        try {
            setUpdatingUser(true)
            const response = await updateUser(formFields, user._id);
            if(response.data){
                console.log(response.data)
                setMessage({
                    type: "success",
                    text: "User updated successfully"
                })
                setTimeout(() => {
                    window.location.reload();
                }
                , 1000);
            }
            
        } catch (error) {
            console.log(error) 
            setMessage({
                type: "error",
                text: "An error occured. Please try again with all required fields completed"
            })                       
        }
        finally{
            setUpdatingUser(false)
        }
    }

    const [changingPassword, setChangingPassword] = useState(false);
    const [passwordFields, setPasswordFields] = useState({});

    const handlePasswordFieldChange = (e)=>{
        setPasswordFields({
            ...passwordFields,
            [e.target.name]: e.target.value
        })
    }

    const [passwordChangeMessage, setPasswordChangeMessage] = useState({
        type: "",
        text: ""
    })

    const handleChangePassword = async(e)=>{
        e.preventDefault();

        try {
            setChangingPassword(true);
            const response = await changePassword(user._id, passwordFields);
            if(response.data){
                console.log(response.data)
                setPasswordChangeMessage({
                    type: "success",
                    text: "Password changed successfully"
                })
            }
            
        } catch (error) {
            console.log(error);
            setPasswordChangeMessage({
                type: "error",
                text: error?.response?.data?.data?.message
            })
            
        }
        finally{
            setChangingPassword(false);
        }
    }

    const [changingProfile, setChangingProfile] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);

    const handleProfileInputChange = (e)=>{
        setProfilePicture(e.target.files[0])
    }

    const handleProfilePictureChange = async()=>{
        try {
            setChangingProfile(true)

            const response = await changeProfilePicture(user._id, {image: profilePicture});
            if(response.data){
                window.location.reload();
            }
            
        } catch (error) {
            console.log(error)            
        }
        finally{
            setChangingProfile(false)
        }
    }

    useEffect(()=>{
        if(profilePicture){
            handleProfilePictureChange();
        }
    }, [profilePicture])

    return (
        <AppWrapper title="PROFILE">
            <section className="details__hero relative profile__hero relative flex">
                <img src={images.banner} className='h-full cover' alt="" />
                <div className='profile__starter text-white py-2 flex justify-between items-end absolute w-3/4 px-2'>
                    <div className='flex items-end gap-3'> 
                        <div className='profile__page--img overflow-hidden relative'>
                            <img src={` ${user?.profilePicture ? `${API_URL}/images/${user?.profilePicture}`: images.user}`} alt="" className='w-full h-full cover' />
                            <input type="file" id='changeProfileImage' onChange={handleProfileInputChange} hidden/>
                            <label htmlFor="changeProfileImage" className='absolute cursor-pointer py-2 w-full full-center change__profile--Label'>
                                <i className='fas fa-camera text-xl'></i>
                            </label>
                            {changingProfile &&
                            <div className='profile__img--loader full-center'>
                                <SubmitLoader/>
                            </div>
                            }
                        </div>
                        <div>
                            <h5 className='text-2xl font-500'>{user?.firstName} {user?.lastName}</h5>
                            <div className='mb-1 opacity-7'><i className='fas fa-map-marker'></i>&nbsp;{user?.location || "No Location"}</div>
                            <div className='flex gap-1 items-center'>
                                <div className='profile__role'>{user?.jobTitle || "No Job Title"}</div>
                                <div>{user?.company || "No Company"}</div>
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
                <div className="w-full mx-auto items-start p-2 flex gap-5">
                    <div className='bg-white flex flex-col gap-2 justify-between p-2 rounded-md'>
                        <div>
                            <span className='opacity-5'>MENU</span>
                            <div className='flex flex-col gap-1 mt-2'>
                                <div onClick={()=>setIsPasswordScreen(false)} className={`opacity-7 p-1/2 cursor-pointer rounded-sm ${!isPasswordScreen ? "current__tab":""} px-1`}>General Information</div>
                                <div onClick={()=>setIsPasswordScreen(true)} className={`opacity-7 p-1/2 cursor-pointer rounded-sm ${isPasswordScreen ? "current__tab":""} px-1`}>Change Password</div>
                            </div>
                        </div>
                        <button onClick={()=>setOpenLogoutModal(true)} className='bg-main text-white p-1/2'>
                            <i className='fas fa-plane'></i>&nbsp;
                            Logout
                        </button>
                    </div>
                    
                    {!isPasswordScreen ?
                        <div className="flex-1">
                            <div className='flex items-center justify-between'>
                                <h3 className='text-2xl font-500 opacity-5'>General Information</h3>
                                {!isEditGeneral &&
                                <button onClick={()=>setIsEditGeneral((prev)=>!prev)} className='border__btn main__btn flex items-center text-lg px-1'>
                                    <i className='fas fa-edit'></i>&nbsp;   
                                    Edit                                 
                                </button>}
                            </div>
                            <form onSubmit={handleUpdateUser} className='contact__form auth__form signup__form mt-3 w-full'>
                                {message.text && <div className={`text-center mb-1 w-1/2 rounded-sm message ${message.type === 'error' ? 'badge__error' : 'badge__success'}`}>{message.text}</div>}
                                <div className='flex gap-2 w-full'>
                                    <div className="form__group flex-1">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" id="firstName" name="firstName" value={formFields?.firstName || ""} placeholder="Your First Name" onChange={handleChange} required readOnly={!isEditGeneral}/>
                                    </div>
                                    <div className="form__group flex-1">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" id="lastName" name="lastName" value={formFields?.lastName || ""} placeholder="Your Last Name" onChange={handleChange} required readOnly={!isEditGeneral}/>
                                    </div>
                                </div>
                                
                                <div className='flex gap-2 w-full'>
                                    <div className="form__group flex-1">
                                        <label htmlFor="middleName">Middlename</label>
                                        <input type="text" id="middleName" name="middleName" value={formFields?.middleName || ""} placeholder="Your Middlename" onChange={handleChange} readOnly={!isEditGeneral}/>
                                    </div>
                                    <div className="form__group flex-1">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" id="username" name="username" value={formFields?.username || ""} placeholder="Your Username" onChange={handleChange} required readOnly={!isEditGeneral}/>
                                    </div>
                                </div>
                                <div className='flex gap-2 w-full'>
                                    <div className="form__group flex-1">
                                        <label htmlFor="jobTitle">Job title</label>
                                        <input type="text" id="jobTitle" name="jobTitle" value={formFields?.jobTitle || ""} placeholder="Your Job title" onChange={handleChange} required readOnly={!isEditGeneral}/>
                                    </div>
                                    <div className="form__group flex-1">
                                        <label htmlFor="company">Company</label>
                                        <input type="text" id="company" name="company" value={formFields?.company || ""} placeholder="Your company" onChange={handleChange} required readOnly={!isEditGeneral}/>
                                    </div>
                                </div>
                                <div className='flex gap-2 w-full'>
                                    <div className="form__group flex-1">
                                        <label htmlFor="about">About</label>
                                        <textarea id="about" rows={5} name="about" placeholder="Your about" value={formFields?.about || ""} onChange={handleChange} required readOnly={!isEditGeneral}>

                                        </textarea>
                                    </div>
                                    <div className="form__group flex-1">
                                        <label htmlFor="location">Address</label>
                                        <input type="text" id="location" name="location" value={formFields?.location || ""} placeholder="Your address" onChange={handleChange} required readOnly={!isEditGeneral}/>
                                    </div>
                                </div>
                                <button className='main__btn mt-1 px-5'>
                                    SAVE
                                    {updatingUser ?
                                    <div className="loading">
                                        <SubmitLoader/>
                                    </div> : ""
                                    }
                                </button>
                            </form>


                        </div>

                        :

                        <div className="flex-1">
                            <div className='flex items-center justify-between'>
                                <h3 className='text-2xl font-500 opacity-5'>Change Password</h3>                            
                            </div>
                            <form onSubmit={handleChangePassword} className='contact__form auth__form signup__form mt-3 w-full'>
                                {passwordChangeMessage.text && <div className={`text-center mb-1 w-1/2 rounded-sm message ${passwordChangeMessage.type === 'error' ? 'badge__error' : 'badge__success'}`}>{passwordChangeMessage.text}</div>}

                                <div className='flex gap-2 w-full'>
                                    <div className="form__group flex-1">
                                        <label htmlFor="currentPassword">Current Password</label>
                                        <input type="password" id="currentPassword" name="currentPassword" placeholder="Your First Name" onChange={handlePasswordFieldChange} required/>
                                    </div>
                                    <div className="form__group flex-1">
                                        <label htmlFor="newPassword">New Password</label>
                                        <input type="password" id="newPassword" name="newPassword" placeholder="Your Last Name" onChange={handlePasswordFieldChange} required/>
                                    </div>
                                </div>                           
                                
                                <button className='main__btn mt-1 px-5'>
                                    SAVE
                                    {changingPassword ?
                                    <div className="loading">
                                        <SubmitLoader/>
                                    </div> : ""
                                    }
                                </button>
                            </form>


                        </div>
                    }

                        
                </div>

                <Modal
                    isOpen={openLogoutModal}
                    setIsOpen={setOpenLogoutModal}
                >
                    <div className='p-2 flex flex-col items-center'>
                        <i className='fas fa-plane text-2xl opacity-5'></i>
                        <p className='opacity-7 mt-1 text-xl'>Are you sure you want to logout?</p>
                        <div className='flex justify-end gap-5 mt-3'>
                            <button onClick={()=>setOpenLogoutModal(false)} className='border__btn btn__gray'>CANCEL</button>
                            <button onClick={handleLogout} className='main__btn'>LOGOUT</button>
                        </div>
                    </div>

                </Modal>
            </section>            
        </AppWrapper>
    );
}

export default Profile;