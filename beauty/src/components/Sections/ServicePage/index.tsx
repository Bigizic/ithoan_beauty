import React, { useEffect } from "react";
import AOS from "aos"
import "aos/dist/aos.css"
import { connect } from "react-redux";
import { withRouter } from '../../../../app/withRouter'
import { HeroSection } from "./Hero";
import { MainLayoutSection } from "./MainLayout";
import { PricingPlansSection } from "./Pricing";
import { FaqSection } from "./Faq";

const ServicePageContainer = () => {
  useEffect(() => {
    AOS.init({
      offset: 130,
      duration: 1200,
      easing: 'ease-out-cubic',
      mirror: true,
      anchorPlacement: 'bottom-center'
    });
    AOS.refresh();
  }, []);
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <MainLayoutSection />
      <PricingPlansSection />
      <FaqSection />
    </div>
  );
};

class ServicePage extends React.PureComponent {
  componentDidMount(): void {
  }
  render(): React.ReactNode {
    return (
      <ServicePageContainer />
    )
  }
}

const mapStateToProps = (state: RootState) => {

}

export default connect(mapStateToProps, actions)withRouter((ServicePage));
