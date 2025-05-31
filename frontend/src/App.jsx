import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Login from "./components/Login.jsx"
import MainLayout from "./components/MainLayout.jsx"
import Posts from "./components/Posts.jsx"
import Profiles from "./components/Profiles.jsx"
import CreatePost from "./components/Createpost1.jsx"
import Contact from "./components/Contact.jsx"
import Special from "./components/Special.jsx"
import CreateP from "./components/Createp1.jsx"
import CreateU from "./components/Createu.jsx"
import DeleteP from "./components/Deletep.jsx"
import DeleteU from "./components/Deleteu.jsx"
import Hackerimg from "./components/Hackerimg.jsx"
import Message from "./components/Message.jsx"

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
