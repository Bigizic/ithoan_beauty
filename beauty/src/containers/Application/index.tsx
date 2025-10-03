import React from "react"
import { Footer } from "../../components/Layout/Footer"
import { Header } from "../../components/Layout/Header"
import { Route, Routes } from "react-router-dom"
import HomePage from "../HomePage"
import Services from "../Services"
import { connect } from "react-redux"
import { actions } from "../../actions"
import { ACTIONSTYPE } from "../../actions"
import { RootState } from '../../../app/store'
import { ApplicationStateProps } from "../../interface"
import Booking from "../Booking"

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
        <Header services={services} />
        <Routes>
          <Route path="/" element={<HomePage services={services} />} />
          <Route path="/services/*" element={<Services services={services} />} />
          <Route path="/booking/*" element={<Booking />} />
        </Routes>
        <Footer services={services} />
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