// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// React Router Dom
import { Outlet } from "react-router-dom";
// Toastify
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// Styles
import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
