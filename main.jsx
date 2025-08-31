import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from './src/store/script.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom' 
import Home from './src/pages/Home.jsx'
import Cart from './src/pages/Cart.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'cart', element: <Cart /> },
    ],
  },
])

createRoot(document.querySelector('#root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)