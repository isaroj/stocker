// react
import React from 'react'
import ReactDOM from 'react-dom/client'


// comps
import Instrument from "./components/Instrument";
import Quote from "./components/Quote";
import PageNotFound from "./components/PageNotFound";
import App from './App'

// routing
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// root css
import './index.css'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Instrument />,
      },
      {
        path: "/quotes/:symbol",
        element: <Quote />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);

