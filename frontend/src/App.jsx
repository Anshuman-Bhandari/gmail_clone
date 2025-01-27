
import './App.css'
import Inbox from './Components/Inbox'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Body from './Components/Body'
import Mail from './Components/Mail'
import SendEmail from './Components/SendEmail'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { Toaster } from 'react-hot-toast'

const appRouter = createBrowserRouter ([
  {
    path:'/', 
    element:<Body/>,
    // children store components that are variables -- Inbox, Mail
    children:[
      {
        path:'/',
        element:<Inbox/>
      },
      {
        path:'/mail/:id',
        element:<Mail/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  }
])

function App() {

  return (
    <div className='bg-[#F6F8FC] h-screen'>

      <RouterProvider router={appRouter}/>

      <div className='absolute w-[30%] bottom-0 right-20 z-10'>
        <SendEmail />
      </div>
      <Toaster/>
    </div>
  )
}

export default App
