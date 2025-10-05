import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import actions from '../../actions';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import Input from '../../components/Common/Input';
import SelectOption from '../../components/Common/SelectOption';
import { withRouter } from '@/withRouter';
import { ArrowBackIcon } from '@/components/Common/Icon';
import Button from '@/components/Common/Button';
import { serviceChange } from '../Service/actions';
import { formatSelectOptions } from '@/utils/select';

class Edit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bookingId: '',
      bookingData: {
        fullName: '',
        email: '',
        phoneNumber: '',
        status: '',
        note: '',
        bookingDate: '',
        bookingTime: '',
        paymentReceipt: '',
      },
      services: [],
      subServices: [],
      selectedService: null,
      selectedSubService: null,
      showDeleteModal: false
    };
  }

  componentDidMount() {
    const { bookingId } = this.props.match.params;
    this.props.fetchBooking(bookingId);
    this.props.fetchServicesSelect();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.booking !== this.props.booking && this.props.booking) {
      const { booking } = this.props;
      this.setState({
        bookingId: booking._id,
        bookingData: {
          fullName: booking.customerInfo?.fullName || '',
          email: booking.customerInfo?.email || '',
          phoneNumber: booking.customerInfo?.phoneNumber || '',
          status: booking.status || '',
          note: booking.note || '',
          bookingDate: booking.bookingDate ? new Date(booking.bookingDate).toISOString().split('T')[0] : '',
          bookingTime: booking.bookingTime || '',
          paymentReceipt: booking.paymentReceipt || '',
          subServiceId: booking.subServiceId || {},
          serviceId: booking.serviceId || {},
        },
        //selectedService: booking.serviceId?._id || null,
        //selectedSubService: booking.subServiceId?._id || null
        selectedService: booking.serviceId || null,
        selectedSubService: booking.subServiceId || null
      });

      if (booking.serviceId?._id) {
        this.props.fetchServicesItem(booking.serviceId._id);
      }
    }
  }

  handleInputChange = (name, value) => {
    this.setState({
      bookingData: {
        ...this.state.bookingData,
        [name]: value
      }
    });
  };

  handleServiceChange = (value) => {
    const services = this.props?.servicesSelect.find(i => i.value === value)
    this.setState({
      selectedService: services,
      selectedSubService: null
    });
    if (value) {
      this.props.fetchServicesItem(value);
    }
  };

  handleSubServiceChange = (value) => {
    const subService = this.props?.serviceCategoriesSelect.serviceArray.find(i => i._id === value)
    this.setState({
      selectedSubService: subService
    });
  };

  handleSubmit = () => {
    const { bookingId, bookingData, selectedService, selectedSubService } = this.state;

    const updateData = {
      fullName: bookingData.fullName,
      email: bookingData.email,
      phoneNumber: bookingData.phoneNumber,
      status: bookingData.status,
      note: bookingData.note
    };

    if (selectedService) {
      updateData.serviceId = selectedService._id ? selectedService : { _id: selectedService.value, name: selectedService.label };
    }

    if (selectedSubService) {
      updateData.subServiceId = selectedSubService;
    }

    if (bookingData.bookingDate) {
      updateData.bookingDate = bookingData.bookingDate;
    }

    if (bookingData.bookingTime) {
      updateData.bookingTime = bookingData.bookingTime;
    }

    this.props.updateBooking(bookingId, updateData, this.props.navigate);
  };

  handleDelete = () => {
    this.setState({ showDeleteModal: true });
  };
  confirmDelete = (bookingId) => {
    this.props.deleteBooking(bookingId, this.props.navigate);
    this.setState({ showDeleteModal: false });
  };

  cancelDelete = () => {
    this.setState({ showDeleteModal: false });
  };

  render() {
    const {
      booking,
      isLoading,
      servicesSelect,
      serviceCategoriesSelect,
      navigate
    } = this.props;
    const { bookingData, selectedService, selectedSubService, showDeleteModal } = this.state;

    if (isLoading || !booking) {
      return <LoadingIndicator />;
    }

    const statusOptions = [
      { value: 'pending', label: 'Pending' },
      { value: 'confirmed', label: 'Confirmed' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' }
    ];

    return (
      <div className='booking-edit'>
        <SubPage
          title={`Edit Booking #${booking.bookingHash}`}
          actionTitle='Back to Bookings'
          handleAction={'/dashboard/booking'}
          icon={<ArrowBackIcon />}
        >
          <div className='booking-edit-form'>
            <div className='row'>
              <div className='col-md-6'>
                <h4 className='text-lg font-semibold'>Customer Information</h4>
                <Input
                  type='text'
                  label='Full Name'
                  name='fullName'
                  placeholder='Full Name'
                  value={bookingData.fullName}
                  onInputChange={(name, value) => this.handleInputChange(name, value)}
                />
                <Input
                  type='text'
                  label='Email'
                  name='email'
                  placeholder='Email'
                  value={bookingData.email}
                  onInputChange={(name, value) => this.handleInputChange(name, value)}
                />
                <Input
                  type='text'
                  label='Phone Number'
                  name='phoneNumber'
                  placeholder='Phone Number'
                  value={bookingData.phoneNumber}
                  onInputChange={(name, value) => this.handleInputChange(name, value)}
                />
              </div>

              <div className='col-md-6'>
                <h4 className='text-lg font-semibold'>Booking Details</h4>
                <SelectOption
                  label='Service'
                  name='service'
                  value={
                    selectedService
                      ?
                      selectedService.name && selectedService._id ?
                        {
                          label: selectedService.name,
                          value: selectedService._id
                        }
                        :
                        selectedService
                      :
                      null
                  }
                  options={servicesSelect}
                  handleSelectChange={(value) => this.handleServiceChange(value?.value)}
                />
                <SelectOption
                  label='Sub Service'
                  name='subService'
                  value={
                    selectedSubService
                      ?
                      selectedSubService.name && selectedSubService._id ?
                        {
                          label: selectedSubService.name,
                          value: selectedSubService._id
                        }
                        :
                        selectedSubService
                      :
                      null
                  }
                  options={formatSelectOptions(serviceCategoriesSelect?.serviceArray || '')}
                  handleSelectChange={(value) => this.handleSubServiceChange(value?.value)}
                  disabled={!selectedService}
                />
                <Input
                  type='date'
                  label='Booking Date'
                  name='bookingDate'
                  value={bookingData.bookingDate}
                  onInputChange={(name, value) => this.handleInputChange(name, value)}
                />
                <Input
                  type='text'
                  label='Booking Time'
                  name='bookingTime'
                  placeholder='e.g., 10:00 AM'
                  value={bookingData.bookingTime}
                  onInputChange={(name, value) => this.handleInputChange(name, value)}
                />
              </div>
            </div>

            <div className='row mt-3'>
              <div className='col-md-6'>
                <SelectOption
                  label='Status'
                  name='status'
                  value={statusOptions.find(opt => opt.value === bookingData.status)}
                  options={statusOptions}
                  handleSelectChange={(option) => this.handleInputChange('status', option?.value)}
                />
              </div>
              <div className='col-md-6'>
                <label>Payment Status</label>
                <p className='form-control-static'>
                  <span className={`badge ${booking.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                    {booking.paymentStatus}
                  </span>
                </p>
              </div>
            </div>


            <div
              className='booking-info-card mt-5'
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              <h5 className='text-2xl font-semibold mb-4 text-gray-800 border-b pb-2'>
                Payment details
              </h5>

              {booking.paymentReceipt && booking.paymentReceipt.length > 0 && (
                <div className='flex flex-col items-center mb-4'>
                  <img
                    alt='payment receipt'
                    src={booking.paymentReceipt[0]}
                    className='rounded-lg shadow-md border border-gray-200'
                    style={{ height: '200px', width: '200px', objectFit: 'cover' }}
                  />
                  <a
                    href={booking.paymentReceipt[0]}
                    download={`payment_receipt_${booking.bookingHash}.jpg`}
                    className='mt-3 inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200'
                  >
                    download receipt
                  </a>
                </div>
              )}

              <div className='space-y-2 text-sm text-gray-700'>
                <p><span className='font-semibold text-gray-800'>customer note:</span> {booking.note || 'no note provided'}</p>
                <p><span className='font-semibold text-gray-800'>booking hash:</span> {booking.bookingHash}</p>
                <p><span className='font-semibold text-gray-800'>total amount:</span> ₦{booking.totalAmount?.toLocaleString()}</p>
                <p><span className='font-semibold text-gray-800'>payment type:</span> {booking.paymentType}</p>
                <p><span className='font-semibold text-gray-800'>created:</span> {new Date(booking.created).toLocaleString()}</p>
                {booking.updated && (
                  <p><span className='font-semibold text-gray-800'>last updated:</span> {new Date(booking.updated).toLocaleString()}</p>
                )}
              </div>
            </div>


            <div className='booking-actions mt-4 flex justify-around'>
              <Button
                size='md'
                className='btn btn-md mr-3'
                onClick={this.handleSubmit}
                disabled={isLoading}
                text={isLoading ? 'Updating...' : 'Update Booking'}
              >
              </Button>
              <button
                className='btn btn-danger btn-md'
                onClick={this.handleDelete}
                disabled={isLoading}
              >
                Delete Booking
              </button>
            </div>
          </div>
        </SubPage>

        {/* delete confirmation modal */}
        {showDeleteModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000
            }}
          >
            <div
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '10px',
                textAlign: 'center',
                maxWidth: '400px',
                width: '90%'
              }}
            >
              <p>Are you sure you want to delete this booking?</p>
              <div className='flex justify-center gap-3 mt-4'>
                <Button
                  size='md'
                  className='btn btn-danger'
                  onClick={() => this.confirmDelete(booking._id)}
                  text='yes, delete'
                />
                <Button
                  size='md'
                  className='btn'
                  onClick={this.cancelDelete}
                  text='cancel'
                />
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    booking: state.booking.booking,
    isLoading: state.booking.isLoading,
    servicesSelect: state.service.servicesSelect,
    serviceCategoriesSelect: state.services.servicesItem
  };
};

const EditWithNavigate = (props) => {
  const navigate = useNavigate();
  return <Edit {...props} navigate={navigate} />;
};

export default connect(mapStateToProps, actions)(withRouter(EditWithNavigate));
