import React, { useEffect, useState } from 'react';
import AppWrapper from '../../components/AppWrapper';
import { useNavigate, useParams } from 'react-router-dom';
import { changePassword, getOneUser, softDeleteUser, updateUser } from '../../services/apis';
import { SpinLoader, SubmitLoader } from '../../components/Loaders';
import Modal from '../../components/Modal';

function ViewAlumni(props) {

    const {id} = useParams();

    const [alumni, setAlumni] = useState({});
    const [formFields, setFormFields] = useState({});
    const handleChange = (e)=>{
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value
        })
    }

    const [loading, setLoading] = useState(false);
    const fetchUser = async()=>{
        try {
            setLoading(true)
            const response = await getOneUser(id);
            if(response.data){
                setFormFields(response.data.user)
                setAlumni(response.data.user)
            }
            
        } catch (error) {
            console.log(error)                                
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchUser();
    }, [])

    const [updatingUser, setUpdatingUser] = useState(false);
    const navigate = useNavigate();

    const [message, setMessage] = useState({
        type: "",
        text: ""
    })

    const handleUpdateUser = async(e)=>{
        e.preventDefault();
        try {
            setUpdatingUser(true)
            const response = await updateUser(formFields, id);
            if(response.data){
                console.log(response.data)
                setMessage({
                    type: "success",
                    text: "User updated successfully"
                })
                setTimeout(() => {
                    fetchUser();
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

    const [deleting, setDeleting] = useState(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleDeleteUser = async()=>{
        try {
            setDeleting(true)
            const response = await softDeleteUser(id);
            if(response.data){
                console.log(response.data)
                setMessage({
                    type: "success",
                    text: "User deleted successfully"
                })
                setTimeout(() => {
                    navigate("/alumni")
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
            setDeleting(false)
        }
    }

    const goBack = ()=>{
        navigate(-1)
    }  


    return (
        <AppWrapper title="ALUMNI">
            {loading?
                <div className='loading__container full-center py-5'>
                    <SpinLoader/>
                </div>
            :

            <div className='edit__alumni'>
                <div onClick={goBack} className="flex cursor-pointer gap-2 items-center mb-2">
                    <i className='fas fa-arrow-left text-2xl color-main'></i>
                    Back
                </div>
                <div className='flex justify-between'>
                    <div>
                        <h3 className='section__title'>Edit Alumni - <span className='opacity-5 font-400'>{alumni.firstName} {alumni.lastName}</span></h3>
                        <p className='opacity-5 w-3/4'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab facere at consequatur aliquid. Quia explicabo magni ipsum sit hic placeat.
                        </p>
                    </div>
                    <i onClick={setOpenDeleteModal} className='fas fa-trash delete__btn text-3xl text-red cursor-pointer'></i>
                </div>

                <form onSubmit={handleUpdateUser} className='contact__form auth__form signup__form mt-3 w-full'>
                    {message.text && <div className={`text-center mb-1 w-1/2 rounded-sm message ${message.type === 'error' ? 'badge__error' : 'badge__success'}`}>{message.text}</div>}
                    <div className='flex gap-2 w-full'>
                        <div className="form__group flex-1">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" value={formFields?.firstName || ""} placeholder="Your First Name" onChange={handleChange} required/>
                        </div>
                        <div className="form__group flex-1">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" value={formFields?.lastName || ""} placeholder="Your Last Name" onChange={handleChange} required/>
                        </div>
                    </div>
                    
                    <div className='flex gap-2 w-full'>
                        <div className="form__group flex-1">
                            <label htmlFor="middleName">Middlename</label>
                            <input type="text" id="middleName" name="middleName" value={formFields?.middleName || ""} placeholder="Your Middlename" onChange={handleChange}/>
                        </div>
                        <div className="form__group flex-1">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" value={formFields?.username || ""} placeholder="Your Username" onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className='flex gap-2 w-full'>
                        <div className="form__group flex-1">
                            <label htmlFor="jobTitle">Job title</label>
                            <input type="text" id="jobTitle" name="jobTitle" value={formFields?.jobTitle || ""} placeholder="Your Job title" onChange={handleChange}/>
                        </div>
                        <div className="form__group flex-1">
                            <label htmlFor="company">Company</label>
                            <input type="text" id="company" name="company" value={formFields?.company || ""} placeholder="Your company" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className='flex gap-2 w-full'>
                        <div className="form__group flex-1">
                            <label htmlFor="about">About</label>
                            <textarea id="about" rows={5} name="about" placeholder="Your about" value={formFields?.about || ""} onChange={handleChange}>

                            </textarea>
                        </div>
                        <div className="form__group flex-1">
                            <label htmlFor="location">Address</label>
                            <input type="text" id="location" name="location" value={formFields?.location || ""} placeholder="Your address" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className='flex items-center justify-between mt-1'>
                        <i onClick={setOpenDeleteModal} className='fas fa-trash delete__btn--responsive hidden  text-3xl text-red cursor-pointer'></i>

                        <button className='main__btn px-5'>
                            SAVE
                            {updatingUser ?
                            <div className="loading">
                                <SubmitLoader/>
                            </div> : ""
                            }
                        </button>
                        
                    </div>
                </form>

            </div>
            }

            <Modal
                isOpen={openDeleteModal}
                setIsOpen={setOpenDeleteModal}
            >
                <div className='p-2 flex flex-col items-center'>
                    <i className='fas fa-plane text-2xl opacity-5'></i>
                    <p className='opacity-7 mt-1 text-lg text-center'>Are you sure you want to delete <span className='font-600'>{alumni.firstName} {alumni.lastName}</span>?</p>
                    <div className='flex justify-end gap-5 mt-3'>
                        <button onClick={()=>setOpenDeleteModal(false)} className='border__btn btn__gray'>CANCEL</button>
                        <button onClick={handleDeleteUser} className={`main__btn ${deleting && "pr-3"}`}>
                            DELETE
                            {deleting ?
                            <div className="loading">
                                <SubmitLoader/>
                            </div> : ""
                            }
                        </button>
                    </div>
                </div>

            </Modal>
                        
        </AppWrapper>
    );
}

export default ViewAlumni;