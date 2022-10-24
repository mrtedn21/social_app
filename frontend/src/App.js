import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom"

import './App.css';
import Login from "./auth/Login";
import Person from "./person/Person";
import Register from "./auth/Register";
import RegisterSubmit from "./auth/RegisterSubmit";
import Settings from "./Settings";


const router = createBrowserRouter([
    {path: '/', element: <Person />},
    {path: '/login', element: <Login />},
    {path: '/register', element: <Register />},
    {path: '/settings', element: <Settings />},
    {path: '/register/submit', element: <RegisterSubmit />},
])


function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}


//<RouterProvider router={router} />
export default App;
