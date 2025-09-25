import { Footer } from "../../components/Layout/Footer"
import { Header } from "../../components/Layout/Header"
import { Route, Routes } from "react-router-dom"
import HomePage from "../HomePage"
import Services from "../Services"

const Application = () => {
  return (
    <div className="application">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/*" element={<Services />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default Application;