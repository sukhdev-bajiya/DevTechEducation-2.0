import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Welcome/Pages/Home/Home';
import Navbar from './Welcome/Compenent/Navbar/Navbar'
import Signup from './Welcome/Pages/Signup/Signup';
import Signin from './Welcome/Pages/Signin/Signin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<><Navbar /> <Home /></>} />
      <Route path="/signup" element={<><Signup /></>} />
      <Route path="/signin" element={<><Signin /></>} />
    </Routes>
  );
}

export default App;
