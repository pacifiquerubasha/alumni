import React, { useEffect, useState } from 'react';
import AppWrapper from '../../components/AppWrapper';
import { useNavigate, useParams } from 'react-router-dom';
import { images } from '../../utils/images';
import { API_URL, deleteNews, getNewsById } from '../../services/apis';
import CreateNewsForm from '../../components/CreateNewsForm';
import Modal from '../../components/Modal';
import { SubmitLoader } from '../../components/Loaders';

function ViewNews(props) {

    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [news, setNews] = useState({})
    const [newsFormData, setNewsFormData] = useState(news);

    useEffect(()=>{
        const fetchNews = async()=>{
            try {
                setLoading(true)
                const token = localStorage.getItem("alumineersToken")

                let response = await getNewsById(id, token);

                if(response?.data?.news){
                    setNews(response.data.news)
                    setNewsFormData(response.data.news)
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

    const navigate = useNavigate();

    const goBack = ()=>{
        navigate(-1)
    }

    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        text: ''        
    })

    const handleDeleteNews = async()=>{
        try {
            setDeleting(true);
            const token = localStorage.getItem("alumineersToken")

            const response = await deleteNews(id, token);
            if(response.data.news){
                setMessage({
                    type: 'success',
                    text: 'News deleted successfully'
                })
                setTimeout(() => {
                    goBack();                    
                }, 1000);
            }
            
        } catch (error) {
            console.log(error)
            setMessage({
                type: 'error',
                text: error.response.data.message
            })            
        }
        finally{
            setDeleting(false)
        }
    }

    return (
        <AppWrapper title="NEWS">
            {loading ?
                <div className='w-1/2 view_news--container mx-auto flex flex-col gap-2'>
                    <div className='py-1 w-1/4 skel__anim rounded-md bg__skel'></div>
                    <div className='py-10 skel__anim big__skel rounded-md bg__skel'></div>
                    <div className='py-1 w-1/4 skel__anim rounded-md bg__skel'></div>
                    <div className='py-2 skel__anim big__skel rounded-md bg__skel'></div>
                </div>

                :
                <div className='w-1/2 view_news--container mx-auto'>              
                    
                    <div onClick={goBack} className="flex cursor-pointer gap-2 items-center mb-2">
                        <i className='fas fa-arrow-left text-2xl color-main'></i>
                        Back
                    </div>

                    <img src={news.image ? `${API_URL}/images/${news.image}` : images.celebrate} className='rounded-lg'/>
                    <h1>{news.title}</h1>
                    <p>
                        {news.description}
                    </p>

                    <div className='mt-2 flex items-center justify-between'>
                        <button onClick={()=>setOpenUpdateModal(true)} className="main__btn border__btn">EDIT</button>
                        <i onClick={()=>setOpenDeleteModal(true)} className='fas fa-trash text-3xl text-red cursor-pointer'></i>
                    </div>

                    
                </div>

            }

            <Modal
                isOpen={openUpdateModal}
                setIsOpen={setOpenUpdateModal}
            >
                <CreateNewsForm
                newsFormData={newsFormData}
                setNewsFormData={setNewsFormData}
                isEdit={true}
                />

            </Modal>

            <Modal
                isOpen={openDeleteModal}
                setIsOpen={setOpenDeleteModal}
            >
                <div className='p-2 flex flex-col items-center'>
                    <i className='fas fa-trash text-2xl opacity-5'></i>
                    <p className='opacity-7 mt-1 text-lg'>Are you sure you want to delete this news?</p>
                    <div className='flex justify-end gap-5 mt-3'>
                        <button onClick={()=>setOpenDeleteModal(false)} className='border__btn btn__gray'>CANCEL</button>
                        <button onClick={handleDeleteNews} className={`main__btn ${deleting && "pl-2"}`}>
                            {deleting ?
                            <div className="loading">
                                <SubmitLoader/>
                            </div> 
                            : "DELETE"
                            }
                        </button>
                    </div>
                </div>

            </Modal>
            

        </AppWrapper>
    );
}

export default ViewNews;