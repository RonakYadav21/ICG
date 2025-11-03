import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { Toaster } from 'react-hot-toast'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);
