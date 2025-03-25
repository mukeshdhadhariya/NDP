import React from 'react'
import UpperNavBar from './UpperNavBar'
import { Outlet } from 'react-router-dom'
import LowerNavBar from './LowerNavBar'

function MainLayout() {
    return (
      <div className="flex flex-col min-h-screen">
        
        <div className="fixed top-0 left-0 w-full z-50">
          <UpperNavBar />
        </div>
  
        
        <div className="flex-grow pt-16 pb-14">
          <Outlet/>
        </div>
  
        
        <div className="fixed bottom-0 left-0 w-full z-50">
          <LowerNavBar />
        </div>
      </div>
    );
  }
  
  export default MainLayout;
  