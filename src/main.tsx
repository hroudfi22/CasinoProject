import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './HomePage/homepage.tsx';
import GameSlot from './Slot/GameSlot.tsx';
import GameRoulette from './Roulette/GameRoulette.tsx';
import Signup from './Profile/signup.tsx';
import { Login }  from './Profile/login.tsx';
import Menu from './Menu.tsx';
import { AuthProvider, RequireAuth } from './User.tsx';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/casinoApp/"/>,
  },
  {
    path: '/casinoApp/',
    element: <Menu />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "game",
        children: [
          {
            path: "slot",
            element: (
              <RequireAuth>
                <GameSlot />
              </RequireAuth>
            )
          },
          {
            path: "roulette",
            element: (
              <RequireAuth>
                <GameRoulette />
              </RequireAuth>
            )
          }
        ]
      },
      {
        path: "profile",
        children: [
          {
            path: "signup",
            element: <Signup/>
          },
          {
            path: "login",
            element: <Login/>
          },
        ]
      },
      {
        path: "*",
        element: <Homepage/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
);
