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
import { LoadingIndicator } from "../../components/Common/LoadingIndicator"

class Application extends React.PureComponent<ApplicationStateProps & ACTIONSTYPE> {
  componentDidMount(): void {
    this.props.fetchServices();
    this.props.getMaintenanceStats();
  }

  render() {
    const {
      services,
      maintenanceText,
      homePageLoading,
      maintenanceStatus,
      toogleSearch,
      isSearchOpen
    } = this.props
    if (homePageLoading) {
      return (
        <div>
          {homePageLoading && (
            <div className="h-[100vh] flex flex-col justify-center">
              <LoadingIndicator />
            </div>
          )}
        </div>
      );
    }

    if (maintenanceStatus) {
      return (
        <div className="application maintenance_homepage_application">
          <div className="maintenance_homepage">
            <div className="maintenance_homepage_body">
              <div className="container">
                <div className="maintenance_img" />
                <div className="maintenance_text">
                  {maintenanceText && maintenanceText.length > 1 ? (
                    <div>
                      <div className="maintenance_one_logo"></div>
                      <h1>{maintenanceText}</h1>
                    </div>
                  ) : (
                    <div>
                      <div className="maintenance_two_logo"> </div>
                      <h1>We will be back soon.</h1>
                      <h2>Our site is currently down for maintenance</h2>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="application">
        <Toaster />
        <Header
          services={services}
          toogleSearch={toogleSearch}
          isSearchOpen={isSearchOpen}
        />
        <Routes>
          <Route path="/" element={<HomePage services={services} />} />
          <Route path="/services/*" element={<Services services={services} />} />
          <Route path="/booking/*" element={<Booking />} />
          <Route path="/about" element={<AboutUs services={services} />} />
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
    services: state.service.services,
    maintenanceStatus: state.homepage ? state.homepage.userMaintenanceStats : false,
    maintenanceText: state.homepage ? state.homepage.maintenanceText : "",
    homePageLoading: state.homepage ? state.homepage.homePageIsLoading : false,
    isSearchOpen: state?.homepage?.isSearchOpen
  }
}

export default connect(mapStateToProps, actions)(Application);