import { Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import Dashboard from "./dashboard/Dashboard";
import Test from "./BookingComponent";
 
function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='test' element={<Test />} />
    </Routes>
  );
}
 
export default App;