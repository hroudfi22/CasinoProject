import ReacDOM from 'react-dom/client';
import './index.css';
import Homepage from './HomePage/homepage.tsx';
import GameSlot from './Slot/GameSlot.tsx';
import GameRoulette from './Roulette/GameRoulette.tsx';
import Signup from './Profile/signup.tsx';
import Login from './Profile/login.tsx';
import Menu from './Menu.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "game/",
        children: [
          {
            path: "slot",
            element: <GameSlot/>
          },
          {
            path: "roulette",
            element: <GameRoulette/>
          }
        ]
      },
      {
        path: "profile/",
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

ReacDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
