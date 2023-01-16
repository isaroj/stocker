import React from 'react'
import ReactDOM from 'react-dom/client'

import Instrument from "./components/Instrument";
import Quote from "./components/Quote";
import PageNotFound from "./components/PageNotFound";
import App from './App'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

