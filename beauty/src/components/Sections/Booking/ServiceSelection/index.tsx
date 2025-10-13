import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../../app/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { ServiceSelectionProps } from "../../../../interface";
import { actions, ACTIONSTYPE } from "../../../../actions";

class ServiceSelectionContainer extends React.PureComponent<ServiceSelectionProps & ACTIONSTYPE> {
  componentDidMount() {
    if (!this.props.services || this.props.services.length === 0) {
      this.props.fetchServices();
    }
  }

  handleServiceChange = (serviceId: string) => {
    const service = this.props.services.find((s: any) => s._id === serviceId);
    if (service) {
      this.props.setSelectedService(service);
      this.props.clearError();
    }
  };

  handleSubServiceChange = (subServiceId: string) => {
    const subService = this.props.selectedService?.serviceArray?.find((s: any) => s._id === subServiceId);
    if (subService) {
      this.props.setSelectedSubService(subService);
      this.props.clearError();
    }
  };

  render() {
    const { services, selectedService, selectedSubService, error } = this.props;

    return (
      <section className="flex flex-col items-center gap-6 w-full">
        <h1 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-[#1c1c1c] text-5xl text-center tracking-[0] leading-[57.6px]">
          Book Appointment
        </h1>

        <p className="[font-family:'Poppins',Helvetica] font-normal text-[#1c1c1c] text-lg text-center tracking-[0] leading-[27px]">
          Select the perfect service for your needs.
        </p>

        <div className="flex flex-col gap-4 w-full mt-6 bg-white p-[24px] py-[40px] md:py-[80px] md:p-[80px] rounded-[20px] rounded-br-none rounded-bl-none">
          <div className="flex flex-col gap-2">
            <label className="text-[20px] md:text-[32px] font-bold text-[#EABE30] [font-family:'Bricolage_Grotesque',Helvetica]">
              Select Service
            </label>
            <Select
              value={selectedService?._id || ""}
              onValueChange={this.handleServiceChange}
            >
              <SelectTrigger
                className="w-full h-[50px] rounded-[10px] border border-solid border-[#1c1c1c82] bg-white"
              >
                <SelectValue placeholder="Select a service category" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service: any) => (
                  <SelectItem key={service._id} value={service._id}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedService && (
            <div className="flex flex-col gap-2">
              <label className="text-[20px] md:text-[32px] font-bold text-[#EABE30] [font-family:'Bricolage_Grotesque',Helvetica]">
                Sub Service
              </label>
              <Select
                value={selectedSubService?._id || ""}
                onValueChange={this.handleSubServiceChange}
              >
                <SelectTrigger className="w-full h-[50px] rounded-[10px] border border-solid border-[#1c1c1c82] bg-white">
                  <SelectValue placeholder="Select a sub service" />
                </SelectTrigger>
                <SelectContent>
                  {selectedService.serviceArray?.map((subService: any) => (
                    <SelectItem key={subService._id} value={subService._id}>
                      {subService.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {error && error.includes(`${selectedService.name}`) && (
                <p className="text-sm text-red-600 [font-family:'Poppins',Helvetica]">
                  {error}
                </p>
              )}
            </div>
          )}

          {selectedSubService && (
            <div className="bg-white rounded-[10px] py-6 px-3 border border-solid border-[#1c1c1c82] mt-2">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-bold text-[#1c1c1c] text-xl [font-family:'Bricolage_Grotesque',Helvetica]">
                    {selectedSubService.name}
                  </h3>
                  <p dangerouslySetInnerHTML={{ __html: selectedSubService.description }} className="text-[#1c1c1c] text-sm [font-family:'Poppins',Helvetica] mt-1 text-justify">
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-[#1c1c1c] [font-family:'Poppins',Helvetica]">
                      Duration:
                    </span>
                    <span className="ml-2 text-xs font-medium text-[#1c1c1c] [font-family:'Poppins',Helvetica]">
                      {selectedSubService.duration} minutes
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-[#eabe30] [font-family:'Bricolage_Grotesque',Helvetica]">
                      #{selectedSubService.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    services: state.service.services,
    selectedService: state.booking.selectedService,
    selectedSubService: state.booking.selectedSubService,
    error: state.booking.error
  };
};

export const ServiceSelectionSection = connect(mapStateToProps, actions)(ServiceSelectionContainer);
