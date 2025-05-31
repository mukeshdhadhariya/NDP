import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Login from "./components/Login1.jsx"
import MainLayout from "./components/MainLayout1.jsx"
import Posts from "./components/Posts1.jsx"
import Profiles from "./components/Profiles1.jsx"
import CreatePost from "./components/Createpost1.jsx"
import Contact from "./components/Contact1.jsx"
import Special from "./components/Special1.jsx"
import CreateP from "./components/Createp1.jsx"
import CreateU from "./components/Createu1.jsx"
import DeleteP from "./components/Deletep1.jsx"
import DeleteU from "./components/Deleteu1.jsx"
import Hackerimg from "./components/Hackerimg1.jsx"
import Message from "./components/Message1.jsx"

const broserRouter=createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>,
    children:[{
      path:'/',
      element:<Posts/>
    },
    {
      path:"/profiles",
      element:<Profiles/>
    },
    {
      path:'/login',
      element:<Login/>
    },{
      path:'/contact',
      element:<Contact/>
    },{
      path:'/special',
      element:<Special/>
    },{
      path:'/message',
      element:<Message/>
    }]
  },{
    path:"/admin",
    element:<CreatePost/>,
    children:[{
      path:"/admin",
      element:<Hackerimg/>
    },
      {
      path:"/admin/createpost",
      element:<CreateP/>
    },{
      path:"/admin/createuser",
      element:<CreateU/>
    },{
      path:"/admin/deletepost",
      element:<DeleteP/>
    },{
      path:"/admin/deleteuser",
      element:<DeleteU/>
    }
  ]
  }
])

function App() {

  return (
    <>
    <RouterProvider router={broserRouter}/>
    </>
  )
}

export default App
