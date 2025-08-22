import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import axiosClient from "../utils/axiosClient";
import { Pause, Play } from 'lucide-react';

export default function ProblemEditorial() {
    const params = useParams();
    const problemId = params.id;

    const [editorialData, setEditorialData] = useState(null);
    const [loading,setloading] = useState(false);
    const [error,seterror] = useState(null);
    const videoRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await axiosClient.get(`/editorial/getEditorial/${problemId}`);
                setloading(false);
                setEditorialData(response?.data);
            }catch(err){
                setloading(false);
                seterror(err?.response?.data?.message || "No editorail available for this problem");
            }
        }
        setloading(true);
        fetchData();
    }, [problemId]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        function handleEnded() {
            setIsPlaying(false);
        }

        function handleTimeUpdate() {
            setDuration(video.currentTime);
        }

        video.addEventListener('ended', handleEnded);
        video.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [editorialData]);

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        
        return h > 0 
            ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
            : `${m}:${s.toString().padStart(2, '0')}`;
    }


    if (error) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center bg-neutral-900 text-white p-4">
                <div className="mb-4">
                    <svg className="h-12 w-12 text-neutral-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="text-neutral-300 text-center">No editorial available for this problem.</p>
            </div>
        );
    }

    if (loading || !editorialData) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center bg-neutral-900 text-white">
                <div className="flex space-x-2 mb-4">
                    <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
                <p className="text-neutral-300">Loading the editorial...</p>
            </div>
        );
    }


    return (
        <div className="flex flex-col h-full w-full bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
            <div className="bg-neutral-800 p-4 border-b border-neutral-700">
                <h2 className="text-lg font-bold text-white">Solution Video</h2>
            </div>
            
            <div className="flex-1 flex items-center justify-center p-4">
                <div 
                    className="relative w-full max-w-4xl"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <video 
                        ref={videoRef} 
                        src={editorialData?.secureUrl} 
                        poster={editorialData.thumbnailUrl}
                        className="w-full rounded-lg aspect-video bg-black"
                    />
                    
                    {/* Play/Pause Overlay Button */}
                    <button
                        onClick={togglePlayPause}
                        className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                            isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                        }`}
                    >
                        <div className="bg-black/50 rounded-full p-3">
                            {isPlaying ? (
                                <Pause className="h-10 w-10 text-white" />
                            ) : (
                                <Play className="h-10 w-10 text-white pl-1" />
                            )}
                        </div>
                    </button>
                    
                    {/* Controls */}
                    <div 
                        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-6 transition-opacity ${
                            isHovering || !isPlaying ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={togglePlayPause}
                                className="bg-black/50 rounded-full p-2 flex-shrink-0"
                            >
                                {isPlaying ? (
                                    <Pause className="h-5 w-5 text-white" />
                                ) : (
                                    <Play className="h-5 w-5 text-white pl-0.5" />
                                )}
                            </button>
                            
                            <div className="flex-1 flex items-center gap-2">
                                <input 
                                    type="range"
                                    min={0}
                                    max={Math.floor(editorialData?.duration)}
                                    value={duration}
                                    onChange={(e) => {
                                        if (videoRef.current) {
                                            videoRef.current.currentTime = Number(e.target.value);
                                        }
                                    }}
                                    className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                                />
                                <div className="text-neutral-300 text-sm flex-shrink-0">
                                    <span>{formatTime(duration)}</span>
                                    <span> / {formatTime(editorialData?.duration)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}