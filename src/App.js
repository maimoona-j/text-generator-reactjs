import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// components
import Navbar from "./component/Navbar";
import TextForm from "./pages/TextForm";

 
import Translator from "./pages/Translator";
import Dictionary from "./pages/Dictionary";
import Contact from "./pages/Contact";

function App() {
  
  return (
    <>
      <Router>
        <Navbar title="TextGenerator" key={new Date()} />
        <Routes>
          <Route path="/" element={<TextForm heading="Text Editor" />} />
          <Route path="/translator" element={<Translator />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>

      
      {/* <div className="container my-3">
         
      </div> */}
    </>
  );
}

export default App;
