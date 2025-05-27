// import React from 'react'
// import UpperNavBar from './UpperNavBar'
// import { Outlet } from 'react-router-dom'
// import LowerNavBar from './LowerNavBar'

// function MainLayout() {
//     return (
//       <div className="flex flex-col min-h-screen">
        
//         <div className="fixed top-0 left-0 w-full z-50">
//           <UpperNavBar />
//         </div>
  
        
//         <div className="flex-grow pt-16 pb-14">
//           <Outlet/>
//         </div>
  
        
//         <div className="fixed bottom-0 left-0 w-full z-50">
//           <LowerNavBar />
//         </div>
//       </div>
//     );
//   }
  
//   export default MainLayout;
  

import React from 'react'
import UpperNavBar from './UpperNavBar'
import { Outlet } from 'react-router-dom'
import LowerNavBar from './LowerNavBar'

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-blue">
      {/* Fixed Navigation Bars */}
      <div className="fixed top-0 left-0 w-full z-50">
        <UpperNavBar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-grow pt-16 pb-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full h-full">
          <div className="relative min-h-[calc(100vh-8rem)] overflow-hidden
                bg-blue/80 backdrop-blur-sm border border-white/5
                shadow-xl shadow-blue/30
                before:absolute before:inset-0 before:bg-gradient-to-br 
                before:from-white/5 before:via-transparent before:to-transparent
                before:opacity-20">
            
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(16, 170, 241, 0.62) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(88, 77, 211, 0.35) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}>
              <div className="absolute inset-0 bg-gradient-to-t from-blue to-transparent" />
            </div>

            {/* Radial Center Glow */}
            <div className="absolute inset-0 bg-radial-gradient(from_50%_50% at 50%_50%, rgba(72, 102, 161, 0.58) 0%, transparent 70%)" />

            {/* Content Container */}
            <div className="relative z-10 h-full text-gray-300">
              <Outlet />
            </div>

            {/* Subtle Scroll Indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-blue/80 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <LowerNavBar />
      </div>
    </div>
  );
}

export default MainLayout;