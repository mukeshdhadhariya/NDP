import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Specialcontainer } from './Specialcontainer1';

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
      className="fixed top-0 left-0 w-full min-h-screen bg-gray-900 text-gray-300 select-none overflow-x-hidden pt-20"
      onMouseDown={handlePause}
      onMouseUp={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
    >
      {/* Progress Bar */}
      <div className="fixed top-10 left-0 w-full px-4 md:px-6 z-40 bg-gray-900/80 backdrop-blur-sm">
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-100 relative"
            style={{
              width: `${progress}%`,
              transition: isPaused ? 'none' : 'width 0.1s linear, filter 0.3s ease',
              filter: isPaused
                ? 'brightness(0.8)'
                : 'brightness(1) drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))',
            }}
          >
            <div className="absolute right-0 top-0 h-full w-4 bg-white/20 animate-pulse" />
          </div>
        </div>
        <p className="text-center text-sm md:text-base mt-1 text-gray-400">
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

      {/* Content Section */}
      <div className="h-[calc(100vh-10rem)] w-full flex items-center justify-center  sm:px-6">
        <div className="w-full max-w-screen-lg">
          <Specialcontainer />
        </div>
      </div>
      </div>
    );
}

export default Special;