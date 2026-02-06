import ReacDOM from 'react-dom/client';
import './index.css';
import Homepage from './HomePage/homepage.tsx';
import GameSlot from './Slot/GameSlot.tsx';
import Menu from './Menu.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu />,   // 👈 Menu lives here
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: 'game/slot',
        element: <GameSlot />,
      },
    ],
  },
]);

ReacDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
