import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom"

import './App.css';
import Login from "./auth/Login";
import Register from "./auth/Register";
import RegisterSubmit from "./auth/RegisterSubmit";


const router = createBrowserRouter([
    {path: '/login', element: <Login />},
    {path: '/register', element: <Register />},
    {path: '/register/submit', element: <RegisterSubmit />},
])


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
