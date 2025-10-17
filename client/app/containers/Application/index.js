import React from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { withRouter } from "@/withRouter";
import { Container } from "reactstrap";

import actions from "../../actions";

import Login from "../Login";
import Signup from "../Signup";
import MerchantSignup from "../MerchantSignup";
import HomePage from "../Homepage";
import Dashboard from "../Dashboard";
import Support from "../Support";
import Navigation from "../Navigation";
import Authentication from "../Authentication";
import Notification from "../Notification";
import ForgotPassword from "../ForgotPassword";
import ResetPassword from "../ResetPassword";
import Shop from "../Shop";
import BrandsPage from "../BrandsPage";
import ProductPage from "../ProductPage";
import Sell from "../Sell";
import Contact from "../Contact";
import OrderSuccess from "../OrderSuccess";
import OrderPage from "../OrderPage";
import AuthSuccess from "../AuthSuccess";
import NewsletterUnsubscribe from "../NewsletterUnsubscribe";
import Terms from "../Terms";
import AboutUs from "../AboutUs";
import Footer from "../../components/Common/Footer";
import Page404 from "../../components/Common/Page404";
import FaqPage from "../FAQ";

import LoadingIndicator from "../../components/Common/LoadingIndicator";

import AOS from "aos";
import "aos/dist/aos.css";

import { CART_ITEMS, ROLES } from "../../constants";

export function initializeApplication(options = {}) {
  if (typeof window !== "undefined" && !window.__AOS_INITIALIZED__) {
    AOS.init({
      offset: 130,
      duration: 1000,
      easing: "ease-out-cubic",
      mirror: true,
      anchorPlacement: "bottom-center",
      once: true,
      ...options.aosOptions,
    });
    AOS.refresh();
    window.__AOS_INITIALIZED__ = true;
  }

  return class Application extends React.PureComponent {
    headerRef = React.createRef();

    state = {
      paddingTop: 0,
    };

    componentDidMount() {
      const token = typeof window !== "undefined" ? localStorage.getItem("is_logged_in") : null;
      if (token === 'true') {
        this.props.fetchProfile && this.props.fetchProfile();
      }

      /*if (token) {
        this.props.fetchProfile && this.props.fetchProfile();
      }*/
      this.props.setShippingAddress && this.props.setShippingAddress();
      this.props.handleCart && this.props.handleCart();
      this.props.getMaintenanceStats && this.props.getMaintenanceStats();

      document.addEventListener("keydown", this.handleTabbing);
      document.addEventListener("mousedown", this.handleMouseDown);
      window.addEventListener("storage", this.handleStorage);
      window.addEventListener("resize", this.adjustPadding);

      this.adjustPadding();
    }

    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleTabbing);
      document.removeEventListener("mousedown", this.handleMouseDown);
      window.removeEventListener("storage", this.handleStorage);
      window.removeEventListener("resize", this.adjustPadding);
    }

    handleStorage = (e) => {
      try {
        if (e && e.key === CART_ITEMS) {
          this.props.handleCart && this.props.handleCart();
        }
      } catch (err) {
        // ignore
      }
    };

    handleTabbing = (e) => {
      if (e && e.keyCode === 9) {
        document.body.classList.add("user-is-tabbing");
      }
    };

    handleMouseDown = () => {
      document.body.classList.remove("user-is-tabbing");
    };

    adjustPadding = () => {
      if (this.headerRef && this.headerRef.current) {
        const headerHeight = this.headerRef.current.offsetHeight || 0;
        this.setState({ paddingTop: headerHeight });
      }
    };

    render() {
      const {
        user,
        location,
        homePageLoading,
        maintenanceStatus,
        maintenanceText,
        websiteInfoStatus,
      } = this.props;
      const { paddingTop } = this.state;

      if (homePageLoading) {
        return (
          <div>
            {homePageLoading && <LoadingIndicator />}
          </div>
        );
      }

      if (maintenanceStatus && !user && !location.pathname.startsWith("/login")) {
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

      if (maintenanceStatus && !user && location.pathname.startsWith("/login")) {
        return (
          <main className="main application" style={{ paddingTop: `${paddingTop}px` }}>
            <Container>
              <div className="wrapper">
                <Routes>
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </Container>
          </main>
        );
      }

      return (
        <div className="application">
          <Navigation ref={this.headerRef} />
          <Notification />
          <main className={websiteInfoStatus ? "main main_class" : "main main_class_two"}>
            <Container>
              <div className="wrapper">
                <Routes>
                  <Route exact path="/" element={<HomePage />} />
                  <Route path="/shop/*" element={<Shop />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/faq" element={<FaqPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/brands" element={<BrandsPage />} />
                  <Route path="/product/:slug" element={<ProductPage />} />
                  <Route path="/order/success/:id" element={<OrderSuccess />} />
                  <Route path="/order/:id" element={<OrderPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Signup />} />
                  <Route path="/merchant-signup/:token" element={<MerchantSignup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />
                  <Route path="/newsletter/unsubscribe/:email" element={<NewsletterUnsubscribe />} />
                  {/*<Route path="/auth/success" element={<AuthSuccess />} />*/}
                  <Route path="/support" element={<Authentication><Support /></Authentication>} />
                  <Route path="/dashboard/*" element={<Authentication><Dashboard /></Authentication>} />
                  <Route path="/404" element={<Page404 />} />
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </div>
            </Container>
          </main>
          {location.pathname.startsWith("/dashboard") && user ? null : <Footer />}
        </div>
      );
    }
  };
}

const AppClass = initializeApplication();

const mapStateToProps = (state) => {
  const isAdminDashboard = state.account && state.account.user && state.account.user.role === ROLES.Admin;
  return {
    user: isAdminDashboard,
    authenticated: state.authentication ? state.authentication.authenticated : false,
    products: state.product ? state.product.storeProducts : [],
    maintenanceStatus: state.homepage ? state.homepage.userMaintenanceStats : false,
    maintenanceText: state.homepage ? state.homepage.maintenanceText : "",
    homePageLoading: state.homepage ? state.homepage.homePageIsLoading : false,
    websiteInfoStatus: state.navigation ? state.navigation.websiteInfoStatus : false,
  };
};

export default connect(mapStateToProps, actions)(withRouter(AppClass));
