import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Dashboard from "./pages/Dashboard";
import Preview from "./pages/Preview";
import About from "./pages/About";

import "./App.css";   // ← agregar esta línea (aunque esté vacío, no rompe nada)
import "./index.css"; // ← esta ya debes tenerla en main.jsx

function App() {
  return (
    <BrowserRouter>
      <div className="container">

        <Navbar />

        <main className="container-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;