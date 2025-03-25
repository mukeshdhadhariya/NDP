import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpecialContainer } from './SpecialContainer';

function Special() {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5000); 

    useEffect(() => {
        if (isPaused) return; 

        const interval = setInterval(() => {
            setProgress(prev => (prev < 100 ? prev + 2 : 100)); 
            setTimeLeft(prev => Math.max(prev - 100, 0)); 
        }, 100);

        const timer = setTimeout(() => {
            navigate("/");
        }, timeLeft);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [isPaused, navigate, timeLeft]);
   
    const handlePause = () => setIsPaused(true);

    const handleResume = () => setIsPaused(false);

    return (
        <div 
            className=' text-gray-400 h-[80vh] text-center text-xl select-none'
            onMouseDown={handlePause} 
            onMouseUp={handleResume}
            onTouchStart={handlePause}
            onTouchEnd={handleResume}
        >
            <div className="w-full h-0.5  mt-[-7px] rounded">
                <div
                    className="h-full bg-blue-500 rounded"
                    style={{
                        width: `${progress}%`,
                        transition: isPaused ? "none" : "width 0.1s linear"
                    }}
                ></div>
            </div>
            <p className="mt-2 text-sm">Press & Hold to Pause</p>
            
                <SpecialContainer/>
        </div>
    );
}

export default Special;
