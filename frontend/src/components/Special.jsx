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
            setProgress(prev => Math.min(prev + 2, 100));
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
            className="fixed pt-20 min-h-screen bg-gray-900 text-gray-300 select-none"
            onMouseDown={handlePause} 
            onMouseUp={handleResume}
            onTouchStart={handlePause}
            onTouchEnd={handleResume}
        >
            {/* Progress Bar - Fixed position below navbar */}
            <div className="fixed top-16 left-0 w-full px-4 z-40 bg-gray-900/80 backdrop-blur-sm">
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-100"
                        style={{
                            width: `${progress}%`,
                            transition: isPaused ? 'none' : 'width 0.1s linear, filter 0.3s ease',
                            filter: isPaused ? 'brightness(0.8)' : 'brightness(1) drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))'
                        }}
                    >
                        <div className="absolute right-0 top-0 h-full w-4 bg-white/20 animate-pulse" />
                    </div>
                </div>
                <p className="text-center text-sm mt-2 text-gray-400">
                    {isPaused ? (
                        <span className="inline-flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
                            ⏸ Paused
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
                            ⏵ Hold to pause
                        </span>
                    )}
                </p>
            </div>

            {/* Content */}
            <div className="h-[calc(100vh-10rem)] flex flex-col items-center justify-center">
                <SpecialContainer />
            </div>
        </div>
    );
}

export default Special;