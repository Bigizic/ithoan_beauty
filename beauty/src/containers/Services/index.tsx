import { Routes, Route } from "react-router-dom";
import ServicesPage from "../../components/Sections/ServicesPage";
import ServicePage from "../../components/Sections/ServicePage";
import { ServicesProps } from "../../interface";

const Services = (props: ServicesProps) => {
  const { services } = props;
  return (
    <>
    <Routes>
      <Route path="" element={<ServicesPage services={services}/>} />
      {/*<Route path="/:slug" element={<ServicePage />} />*/}
    </Routes>
    </>
  )
}

export default Services
