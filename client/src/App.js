import './App.css';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={"<Home />"}></Route>
    </Routes>
  );
}

export default App;
