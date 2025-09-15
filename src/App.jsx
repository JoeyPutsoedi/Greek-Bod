import "./Styles/Styles.css";
import "../src/assets/fontawesome/css/all.css";
import "../src/assets/boxicons/css/boxicons.css";
import Landing from "./Pages/Landing";
import Signin from "./Pages/signin";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Contact from "./Pages/Contact";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Landing />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
export default App;
