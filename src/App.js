import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Calender from "./pages/Calender";
import ScrollToTop from "./components/ScrollToTop";
import SchoolRegistration from './components/registerations/SchoolRegistration'

import { Design, Footer, Navbar } from "./components";
import Disclaimer from "./components/Disclaimer";

function App() {
  return (
    <>
      <Disclaimer />
      <Design />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/contact" element={<Footer />} />
          <Route path="/:eventName" element={<About />} />
          <Route path="/:eventName/register" element={<SchoolRegistration />} />
          <Route path="guide" element={<Disclaimer />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;