import React, { useEffect } from "react";
import AOS from "aos"
import "aos/dist/aos.css"
import { connect } from "react-redux";
import { withRouter } from '../../../../app/withRouter'
import { HeroSection } from "./Hero";
import { PricingPlansSection } from "./Pricing";
import { FaqSection } from "./Faq";
import { actions, ACTIONSTYPE } from "../../../actions";
import { RootState } from "../../../../app/store";
import { ServicePageProps } from "../../../interface";

const ServicePageContainer = (props: ServicePageProps) => {
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

  const { service } = props;

  return (
    <div className="flex flex-col w-full">
      <HeroSection service={service}/>
      <PricingPlansSection serviceCat={service?.serviceArray}/>
      <FaqSection />
    </div>
  );
};

class ServicePage extends React.PureComponent<ServicePageProps & ACTIONSTYPE> {
  componentDidMount(): void {
    const id = this.props.match.params.slug;
    this.props.fetchService(id)
  }
  componentDidUpdate(prevProps: any) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const id = this.props.match.params.slug;
      this.props.fetchService(id)
    }
  }
  render(): React.ReactNode {
    const {
      service
    } = this.props
    return (
      <ServicePageContainer {...this.props}/>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    service: state.service.service
  }
}

export default connect(mapStateToProps, actions)(withRouter(ServicePage));
