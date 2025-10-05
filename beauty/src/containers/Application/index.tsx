import React from "react"
import { Route, Routes } from "react-router-dom"
import HomePage from "../HomePage"
import Services from "../Services"
import { connect } from "react-redux"
import { actions } from "../../actions"
import { ACTIONSTYPE } from "../../actions"
import { RootState } from '../../../app/store'
import { ApplicationStateProps } from "../../interface"
import Booking from "../Booking"
import PaymentGateway from "../PaymentGateway"
import { Toaster } from 'react-hot-toast'

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
        <Routes>
          <Route path="/" element={<HomePage services={services} />} />
          <Route path="/services/*" element={<Services services={services} />} />
          <Route path="/booking/*" element={<Booking />} />
        </Routes>
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