import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css"; // css utility
import "primereact/resources/primereact.css"; // core css
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Example from "./components/Example.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/examples",
    element: <Example />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
      {/* <RouterProvider router={router} /> */}
    </PrimeReactProvider>
  </React.StrictMode>
);
