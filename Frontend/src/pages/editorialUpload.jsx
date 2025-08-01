import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useState } from "react";
import axiosClient from "../utils/axiosClient";
import axios from "axios";

export default function EditorialUpload() {
    const params = useParams();
    const problemId = params.id;

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedVideo, setUploadedVideo] = useState(null);

    const { register, handleSubmit, watch, formState: { errors }, reset, setError, clearErrors } = useForm();
    const selectedFile = watch('videoFile')?.[0];

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    async function saveVideo(data) {
        const file = data?.videoFile[0];

        setUploading(true);
        setUploadProgress(0);
        clearErrors();

        try {
            const response = await axiosClient.get(`/editorial/upload/${problemId}`);
            const { signature, timestamp, publicId, api_key, cloud_name, upload_url } = response.data;

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
            
            const metadata = {
                problemId: problemId,
                publicId: uploadResponse?.data?.public_id,
                duration: uploadResponse?.data?.duration,
                secureUrl: uploadResponse?.data?.secure_url,
                thumbnailUrl: uploadResponse?.data?.eager?.[0].secure_url
            }

            const saveResponse = await axiosClient.post("/editorial/save", metadata);
            setUploadedVideo(saveResponse?.data);
            reset();

        } catch (err) {
            console.log("ERROR : " + err.message);
            setUploadedVideo(null);
            setError('root', {
                type: 'manual',
                message: err.response?.data?.message || 'Upload failed. Please try again.'
            });
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    }

    return (   
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-indigo-400 mb-2">Upload Video Solution</h1>
                    <p className="text-gray-400">Problem ID: {problemId}</p>
                </div>
                
                <form onSubmit={handleSubmit(saveVideo)} className="space-y-6">
                    {/* File Input Section - FIXED CUSTOM DROPZONE */}
                    <div className="space-y-4">
                        <label className="block text-gray-300 font-medium">Select Video File</label>
                        
                        <div className="flex items-center justify-center w-full">
                            <label 
                                htmlFor="vid" 
                                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer 
                                ${errors.videoFile ? 'border-red-500 bg-red-900/10' : 'border-gray-600 hover:border-indigo-500 bg-gray-750'}`}
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        MP4, AVI, MOV (MAX. 200MB)
                                    </p>
                                </div>
                                <input 
                                    type="file" 
                                    accept="video/*" 
                                    {...register('videoFile', {
                                        required: "Please select a file before submitting",
                                        validate: {
                                            isFile: (fileList) => {
                                                if (!fileList || !fileList[0]) {
                                                    return "Please upload a file"
                                                }
                                                const f = fileList[0];
                                                return f.type.startsWith('video/') || 'Please select a valid video file';
                                            },
                                            fileSize: (fileList) => {
                                                if (!fileList || !fileList[0]) {
                                                    return true;
                                                }
                                                const file = fileList[0];
                                                const maxSize = 200 * 1024 * 1024; // 200MB
                                                return file.size <= maxSize || 'File size must be less than 200MB';
                                            }
                                        }
                                    })}
                                    id="vid" 
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                        </div>
                        
                        {errors.videoFile && (
                            <p className="mt-2 text-sm text-red-400">{errors.videoFile.message}</p>
                        )}
                    </div>

                    {/* File Preview */}
                    {selectedFile && (
                        <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                            <h3 className="font-medium text-gray-300 mb-2">Selected File</h3>
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 w-16 h-16 bg-indigo-900/20 rounded-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-200 font-medium truncate max-w-xs">{selectedFile.name}</p>
                                    <p className="text-gray-400 text-sm">Size: {formatFileSize(selectedFile.size)}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Progress Bar */}
                    {uploading && (
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-300">Uploading...</span>
                                <span className="text-indigo-400 font-medium">{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div 
                                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Success Message */}
                    {uploadedVideo && (
                        <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <p className="text-green-400 font-medium">{uploadedVideo.message}</p>
                            </div>
                            <p className="text-green-300 text-sm mt-1">
                                Uploaded on {new Date(uploadedVideo?.createdAt).toLocaleString()}
                            </p>
                        </div>
                    )}

                    {/* Error Message */}
                    {errors.root && (
                        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-red-400 font-medium">{errors.root.message}</p>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={uploading}
                            className={`w-full py-3 px-4 rounded-lg font-medium transition ${
                                uploading 
                                    ? 'bg-indigo-800 cursor-not-allowed' 
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                        >
                            {uploading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading...
                                </div>
                            ) : (
                                'Upload Video'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) 
}