// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// React Router Dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Styles
import "./index.css";

// Pages
import Home from "./routes/Home.jsx";
import AddMemory from "./routes/AddMemory.jsx";
import Memory from "./routes/Memory.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-memory",
        element: <AddMemory />,
      },
      {
        path: "/memories/:id",
        element: <Memory />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
