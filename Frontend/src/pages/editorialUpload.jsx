import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useState } from "react";
import axiosClient from "../utils/axiosClient";
import axios from "axios";


export default function EditorialUpload(){
    const parmas = useParams();
    const problemId = parmas.id;

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedVideo, setUploadedVideo] = useState(null);

    const {register,handleSubmit,watch,formState : {errors},reset,setError,clearErrors} = useForm();
    const selectedFile = watch('videoFile')?.[0];

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    async function saveVideo(data){
        const file = data?.videoFile[0];

        setUploading(true);
        setUploadProgress(0);
        clearErrors();

        try{
            console.log("asking for url");
            const response = await axiosClient.get(`/editorial/upload/${problemId}`);
            const {signature,timestamp,publicId,api_key,cloud_name,upload_url} = response.data;

            const formData = new FormData();
            formData.append('file', file);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp);
            formData.append('public_id', publicId);
            formData.append('api_key', api_key);
            formData.append('eager', 'so_1,w_480,c_scale/f_jpg');


            const uploadResponse = await axios.post(upload_url, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(progress);
                },
            });
            // console.log(uploadResponse.data);
            
            const metadata = {
                problemId : problemId,
                publicId : uploadResponse?.data?.public_id,
                duration : uploadResponse?.data?.duration,
                secureUrl : uploadResponse?.data?.secure_url,
                thumbnailUrl : uploadResponse?.data?.eager?.[0].secure_url
            }

            const saveResponse = await axiosClient.post("/editorial/save",metadata);
            console.log(saveResponse.data);


        }catch(err){
            console.log("ERROR : " + err.message);
        }
    }

    return(
        <div>
            <p>
                Upload the Video Solution
            </p>
            <div>
                <form onSubmit={handleSubmit(saveVideo)}>
                    <div>
                        <label htmlFor="vid">Select file :</label>
                        <input type="file" accept="video/*" 
                            {...register('videoFile',{
                                required : "Please select a file before submitting",
                                validate : {
                                    isFile : (fileList)=>{
                                        if(!fileList || !fileList[0]){
                                            return "Please upload a file"
                                        }
                                        const f = fileList[0];
                                        return f.type.startsWith('video/') || 'Please select a valid video file';
                                    },
                                    fileSize : (fileList)=>{
                                        if(!fileList || !fileList[0]){
                                            return true;
                                        }
                                        const file = fileList[0];
                                        const maxSize = 200 * 1024 * 1024; // 200MB
                                        return file.size <= maxSize || 'File size must be less than 200MB';
                                    }
                                } 
                            })} 
                        id="vid" disabled={uploading}/>
                    </div>

                    {selectedFile && (
                        <div>
                            <div>
                            <h3>Selected File : </h3>
                            <p>{selectedFile.name}</p>
                            <p>Size: {formatFileSize(selectedFile.size)}</p>
                            </div>
                        </div>
                    )}

                    {uploading && (
                        <div>
                            <div className="flex justify-between text-sm">
                                <span>Uploading...</span>
                                <span>{uploadProgress}%</span>
                            </div>
                            <progress  value={uploadProgress} max="100"></progress>
                        </div>
                    )}

                    {uploadedVideo && (
                        <div>
                            Upload Successful
                        </div>
                    )}

                    <div className="card-actions justify-end">
                        <button type="submit" disabled={uploading}> {uploading ? 'Uploading...' : 'Upload Video'}</button>
                    </div>

                </form>
            </div>
        </div>
    )

    
}