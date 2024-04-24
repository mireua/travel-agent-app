import { Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import BookingPage from "./dashboard/BookingPage";
import HotelBookingPage from "./dashboard/HotelBookingPage";
import Admin from "./admin/Admin";
 
function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/booking' element={<BookingPage />} />
      <Route path='/hotelbook' element={<HotelBookingPage />} />
      <Route path='/admin' element={<Admin />} />
    </Routes>
  );
}
 
export default App;