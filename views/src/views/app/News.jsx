import React, { useEffect, useState } from 'react';
import AppWrapper from '../../components/AppWrapper';
import { images } from '../../utils/images';
import { NavLink } from 'react-router-dom';
import Modal from '../../components/Modal';
import CreateNewsForm from '../../components/CreateNewsForm';
import { API_URL, getAllNews } from '../../services/apis';

function News(props) {

    const [openCreateModal, setOpenCreateModal] = useState(false);

    const [newsFormData, setNewsFormData] = useState({});

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

    return (
        <AppWrapper title="NEWS">
            <div className='flex mb-2 items-center justify-between'>
                <div>
                    <h1 className=''>All News</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, iste.
                    </p>                
                </div> 
                <button onClick={()=>setOpenCreateModal(true)} className="main__btn text-md">Create News</button>
            </div>
            {loading ?
                <div className='flex flex-wrap gap-2'>
                    {new Array(3).fill(0).map((_, i)=>(
                        <div className='flex news__repeated skel__anim bg-white rounded-md overflow-hidden'>
                            <div className='w-2/5 h-full py-5  bg-gray'></div>
                            
                        </div>
                    ))}

                </div>

                :
                <>
                    {news.length === 0 ?
                        <div className='full-center pt-2 flex-col'>
                            <img src={images.empty1} alt="Empty illustration" className='full__screen--empty'/>
                            <p className='text-center text-2xl color-darkblue opacity-5 mt-2'>No news yet</p>
                        </div>

                        :
                        <div className="flex flex-wrap gap-2">
                            {news.map((item, i)=>(
                                <NavLink to={`/news/${item._id}`} className='flex news__repeated bg-white rounded-md overflow-hidden'>
                                    <img src={item.image ? `${API_URL}/images/${item.image}` : images.celebrate} alt="" className='w-2/5 cover' />
                                    <div className='p-1 w-3/5'>
                                        <h1 className='text-lg relative color-darkblue ellipsis'>{item.title}</h1>
                                        <p className='ellipsis-2'>
                                            {item.description}
                                        </p>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    
                    }
                
                </>

            }


            <Modal
                isOpen={openCreateModal}
                setIsOpen={setOpenCreateModal}
            >
                <CreateNewsForm 
                newsFormData={newsFormData}
                setNewsFormData={setNewsFormData}/>

            </Modal>

        </AppWrapper>
    );
}

export default News;