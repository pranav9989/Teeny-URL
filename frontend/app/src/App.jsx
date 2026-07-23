import react from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Stats from "./pages/Stats"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/stats" element={<Stats />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;