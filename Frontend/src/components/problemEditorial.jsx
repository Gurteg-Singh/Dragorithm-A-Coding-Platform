import { useEffect,useRef, useState } from "react";
import {useParams} from "react-router";
import axiosClient from "../utils/axiosClient";
import { Pause, Play } from 'lucide-react';

export default function ProblemEditorial(){
    const params = useParams();
    const problemId = params.id;

    const [editorialData,seteditorialData] = useState(null);
    const videoRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration,setduration] = useState(0);

    useEffect(()=>{
        async function fetchData(){
            const response = await axiosClient.get(`/editorial/getEditorial/${problemId}`);
            seteditorialData(response?.data);
        }
        fetchData();
    },[])

    useEffect(()=>{
        const video = videoRef.current;

        if(!video){
            return;
        }

        function handleEnded(){
            setIsPlaying(false);
        }

        function handleTimeUpdate(){
            setduration(videoRef.current.currentTime);
        }

        if(video){
            video.addEventListener('ended',handleEnded);
            video.addEventListener("timeupdate",handleTimeUpdate);
        }

        return ()=>{
            if(video){
                video.removeEventListener('ended',handleEnded);
            }
        }
    },[editorialData])

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

    function formatTime(num){
        if(num>=3600){
            const hours = Math.floor(num/3600);
            const left = num%3600;
            const min = Math.floor(left/60);
            const sec = Math.floor(left%60);
            const str = `${hours}:${min}:${sec}`;
            return str;
        }else{
            const min = Math.floor(num/60);
            const sec = Math.floor(num%60);
            const str = `${min}:${sec}`;
            return str;
        }
    }

    if(!editorialData){
        return(
            <div className="flex items-center justify-center text-2xl text-white">
                Loading Solution Video...
            </div>
        )
    }


    return(
        <div
            className=""
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <video ref={videoRef} src={editorialData.secureUrl} poster={editorialData.thumbnailUrl}
            className=""
            />
            {/*Controls*/}
            <div className= {`${isHovering || !isPlaying ? "opacity-100" : "opacity-0"}`}>
                <button  onClick={togglePlayPause}>
                    {
                        isPlaying ? <Pause/> : <Play/>
                    }
                </button>
                <div>
                    <input type="range" min={0} max={editorialData?.duration} value={duration}
                    onChange={(e)=>{
                        if (videoRef.current) {
                            videoRef.current.currentTime = Number(e.target.value);
                        }
                    }}
                    />
                </div>
                <div className="text-white">
                    <span>{formatTime(duration)}/</span>
                    <span>{formatTime(editorialData?.duration)}</span>
                </div>
            </div>
        </div>
    )
}