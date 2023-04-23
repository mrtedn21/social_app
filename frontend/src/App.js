import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"

import GroupList from "./group/GroupList"
import Login from "./auth/Login";
import Person from "./person/Person";
import Group from "./group/Group";
import Register from "./auth/Register";
import RegisterSubmit from "./auth/RegisterSubmit";
import Settings from "./Settings";
import PersonList from "./person/PersonList";
import Chat from "./Chat"


const router = createBrowserRouter([
    {path: '/persons/:pk', element: <Person />},
    {path: '/persons/', element: <PersonList />},
    {path: '/groups', element: <GroupList />},
    {path: '/groups/:slug', element: <Group />},
    {path: '/login', element: <Login />},
    {path: '/register', element: <Register />},
    {path: '/register/submit', element: <RegisterSubmit />},
    {path: '/settings', element: <Settings />},
    {path: '/chat', element: <Chat />},
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
