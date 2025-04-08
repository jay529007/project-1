import React from "react";
import {Home} from './pages/Home'
import {Jobs} from './pages/joblisting/jobs'
import {createBrowserRouter , RouterProvider } from 'react-router-dom'
import { MainLayout } from "./components/MainLayout";
import { Notfound } from "./pages/notfound";
import { Jobpage } from "./pages/joblisting/jobpage";
import { Addjob } from "./pages/add-job";
import  Editjob  from "./pages/joblisting/editjob";
// import{tostify} from 'react-toastify';

// import { Addjob } from "./pages/add-job";

const router = createBrowserRouter([
  {
    path:"/",
    element: <MainLayout/>,
    children:[
      {
        path:"/",
        element:<Home/> ,
      },
      {
        path:"/jobs",
        element:<Jobs/> ,
      },
      {
        path:"/jobs/:id",
        element:<Jobpage/> ,
      },
      {
        path:"/:id",
        element:<Jobpage/> ,
      },
      {
        path:"/add-job",
        element:<Addjob/>,
      },
      {
        path:"/editjob/:id",
        element:<Editjob/>,
      },
      {
        path: '*',
        element: <Notfound/>
      },
    ]
  }
]
);
function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
