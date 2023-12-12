import React, { useState } from 'react';
import {upLoadImg} from '../api/imgupload';

function UploadProduct() {

    const [file, setFile] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);
    // const [success, setSuccess] = useState(null);

    const uploadSubmit = async(e)=>{
        e.preventDefault();
        try{
            const url = await upLoadImg(file)
        }catch(error){
            console.error(error)
        }
    }

    return (
        <div className='container'>
            <div className='imgUploadWrap'>
                {file && (
                    <img src={URL.createObjectURL(file)}/>
                )}
            </div>
            <form onSubmit={uploadSubmit}>
                <input 
                type='file'
                name='file'
                accept='image/*'
                onChange={(e) => setFile(e.target.files[0])}
                />
            </form>
        </div>
    )
}

export default UploadProduct
