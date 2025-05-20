import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ViewJobAplications from "./components/ViewJobAplications";
import AddNewJob from "./components/AddNewJob";

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/applications" element={<ViewJobAplications />} />
        <Route path="/add" element={<AddNewJob />} />
        <Route path="/about" element={<div>About Page</div>} />
      </Routes>
    </>
  );
}

export default App;
