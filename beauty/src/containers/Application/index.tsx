import React from "react"
import { Route, Routes } from "react-router-dom"
import HomePage from "../HomePage"
import Services from "../Services"
import AboutUs from "../AboutUs"
import Policy from "../Policy"
import NewsletterUnsubscribe from "../NewsletterUnsubscribe"
import { connect } from "react-redux"
import { actions } from "../../actions"
import { ACTIONSTYPE } from "../../actions"
import { RootState } from '../../../app/store'
import { ApplicationStateProps } from "../../interface"
import Booking from "../Booking"
import PaymentGateway from "../PaymentGateway"
import { Toaster } from 'react-hot-toast'
import { Header } from "../../components/Layout/Header"
import { Footer } from "../../components/Layout/Footer"

class Application extends React.PureComponent<ApplicationStateProps & ACTIONSTYPE> {
  componentDidMount(): void {
    this.props.fetchServices();
  }

  render() {
    const {
      services
    } = this.props
    return (
      <div className="application">
        <Toaster />
        <Header services={services} />
        <Routes>
          <Route path="/" element={<HomePage services={services} />} />
          <Route path="/services/*" element={<Services services={services} />} />
          <Route path="/booking/*" element={<Booking />} />
          <Route path="/about" element={<AboutUs services={services}/>} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/newsletter/unsubscribe/:email" element={<NewsletterUnsubscribe />} />
        </Routes>
        <Footer services={services} />
        <PaymentGateway />
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    services: state.service.services
  }
}

export default connect(mapStateToProps, actions)(Application);