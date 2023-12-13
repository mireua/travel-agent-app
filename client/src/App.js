import { Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import Dashboard from "./dashboard/Dashboard";
 
function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='dashboard' element={<Dashboard />} />
    </Routes>
  );
}
 
export default App;