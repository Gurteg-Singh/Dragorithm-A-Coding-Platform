import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import axiosClient from "../utils/axiosClient";
import { Pause, Play } from 'lucide-react';

export default function ProblemEditorial() {
    const params = useParams();
    const problemId = params.id;

    const [editorialData, setEditorialData] = useState(null);
    const videoRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const response = await axiosClient.get(`/editorial/getEditorial/${problemId}`);
            setEditorialData(response?.data);
        }
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

    if (!editorialData) {
        return (
            <div className="flex items-center justify-center h-full text-xl text-neutral-300">
                Loading solution video...
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
                        src={editorialData.secureUrl} 
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