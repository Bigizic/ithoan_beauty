import { Routes, Route } from "react-router-dom";
import { BookingSection } from "../../components/Sections/Booking";

const Booking = () => {
  return (
    <>
    <Routes>
      <Route path="" element={<BookingSection />} />
    </Routes>
    </>
  )
}

export default Booking
