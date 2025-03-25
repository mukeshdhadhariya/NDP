import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Login from "./components/Login"
import MainLayout from "./components/MainLayout"
import Posts from "./components/Posts"
import Profiles from "./components/Profiles"
import CreatePost from "./components/CreatePost"
import Contact from "./components/Contact"
import Special from "./components/Special"
import CreateP from "./components/Createp"
import CreateU from "./components/CreateU"
import DeleteP from "./components/DeleteP"
import DeleteU from "./components/DeleteU"
import Hackerimg from "./components/Hackerimg"

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
