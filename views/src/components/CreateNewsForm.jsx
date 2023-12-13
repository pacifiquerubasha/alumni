import React, { useState } from 'react';
import { SubmitLoader } from './Loaders';
import { createNews, updateNews } from '../services/apis';

function CreateNewsForm({newsFormData, setNewsFormData, isEdit}) {
    

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        text: ''        
    })
    const handleChange = (e)=>{
        setNewsFormData({...newsFormData, [e.target.name]: e.target.value});
    }

    const handleUploadImage = (e)=>{
        setNewsFormData({...newsFormData, image: e.target.files[0]});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(newsFormData);
        try {

            setLoading(true);
            const response = await createNews(newsFormData);
            if(response.data.news){
                setMessage({
                    type: 'success',
                    text: 'News created successfully'
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response.data.message
            })            
        }
        finally{
            setLoading(false);
        }
    }

    const handleUpdate = async(e)=>{
        e.preventDefault();

        try {
            setLoading(true);
            const response = await updateNews(newsFormData, newsFormData._id);
            if(response.data.news){
                setMessage({
                    type: 'success',
                    text: 'News updated successfully'
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response.data.message
            })            
        }
        finally{
            setLoading(false);
        }
    }
    
    return (
        <form onSubmit={ !isEdit ? handleSubmit : handleUpdate} className='contact__form overflow-y-auto px-1 auth__form signup__form'>
            <h3 className='text-2xl font-500 color-darkblue'>{isEdit ? "Edit" : "Create"} News</h3>
            <p className='opacity-5 mb-2'>Provide the necessary information about the news</p>
            {message.text && <div className={`text-center mb-1 rounded-sm message ${message.type === 'error' ? 'badge__error' : 'badge__success'}`}>{message.text}</div>}

            <div className="form__group">
                <label htmlFor="title">News Title</label>
                <input type="text" id="title" name="title" value={newsFormData.title} placeholder="Event title" onChange={handleChange} required/>
            </div>
            <div className="form__group">
                <label htmlFor="link">News Link</label>
                <input type="text" id="link" name="link" value={newsFormData.link} placeholder="Event title" onChange={handleChange} required/>
            </div>
            <div className="form__group">
                <label htmlFor="description">News Description</label>
                <textarea id="description" rows={5} name="description" value={newsFormData.description} placeholder="Event description" onChange={handleChange} required/>
            </div>
            <div className="form__group">
                <label htmlFor="image">News Image</label>
                <input type="file" id="image" name="image" placeholder="News image" onChange={handleUploadImage} required={!isEdit}/>
            </div>

            <button type='submit' className="main__btn w-full">
                {loading ?
                    <SubmitLoader/>
                    :
                    "SUBMIT"
                }
            </button>
        
        </form>
    );
}

export default CreateNewsForm;