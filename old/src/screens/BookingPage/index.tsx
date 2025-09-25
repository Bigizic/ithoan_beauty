'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateBookingInfo, createBooking, nextBookingStep, previousBookingStep, setBookingStep } from '../../store/slices/bookingSlice';
import { fetchServiceBySlug } from '../../store/slices/servicesSlice';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export const BookingPage = (): JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceSlug = searchParams.get('service');
  
  const dispatch = useAppDispatch();
  const { bookingInfo, bookingStep, loading, error } = useAppSelector((state) => state.booking);
  const { currentService } = useAppSelector((state) => state.services);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    age: '',
    medicalHistory: '',
    conditions: '',
    extraInformation: '',
    preferredDate: '',
    preferredTime: '',
  });

  useEffect(() => {
    if (serviceSlug) {
      dispatch(fetchServiceBySlug(serviceSlug));
    }
  }, [dispatch, serviceSlug]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    dispatch(updateBookingInfo({ [field]: value }));
  };

  const handleLoginRedirect = () => {
    window.location.href = 'https://tohannieeskincare.com/login';
  };

  const handleSubmit = async () => {
    if (!currentService) return;

    const bookingData = {
      ...formData,
      age: parseInt(formData.age),
      serviceId: currentService.id,
    };

    try {
      await dispatch(createBooking(bookingData)).unwrap();
      dispatch(setBookingStep(3)); // Success step
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  const isFormValid = () => {
    return formData.firstName && formData.lastName && formData.phoneNumber && 
           formData.email && formData.age && formData.preferredDate && formData.preferredTime;
  };

  if (!currentService && serviceSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[72px]">
        <div className="text-xl">Loading service...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e6e1c9] pt-[72px]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1c1c1c] mb-4">Book Your Appointment</h1>
          {currentService && (
            <p className="text-xl text-gray-700">
              Service: {currentService.title} - ${currentService.price}
            </p>
          )}
        </div>

        {bookingStep === 1 && (
          <Card className="bg-white border-[#eabe30]">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Choose Your Booking Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Button
                  onClick={handleLoginRedirect}
                  className="bg-[#eabe30] hover:bg-[#d4a829] text-black px-8 py-4 text-lg font-semibold rounded-lg mb-4"
                >
                  Login with Tohanniees Skincare Account
                </Button>
                <p className="text-gray-600 mb-6">
                  Skip the form and use your existing account information
                </p>
              </div>
              
              <div className="text-center">
                <div className="border-t border-gray-300 mb-4 relative">
                  <span className="bg-white px-4 text-gray-500 absolute -top-3 left-1/2 transform -translate-x-1/2">
                    OR
                  </span>
                </div>
                <Button
                  onClick={() => dispatch(nextBookingStep())}
                  variant="outline"
                  className="border-[#eabe30] text-[#1c1c1c] hover:bg-[#eabe30]/10 px-8 py-4 text-lg"
                >
                  Fill Out Booking Information
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {bookingStep === 2 && (
          <Card className="bg-white border-[#eabe30]">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Booking Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="border-gray-300 focus:border-[#eabe30]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="border-gray-300 focus:border-[#eabe30]"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="border-gray-300 focus:border-[#eabe30]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-gray-300 focus:border-[#eabe30]"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age *
                  </label>
                  <Input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="border-gray-300 focus:border-[#eabe30]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                    className="border-gray-300 focus:border-[#eabe30]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <Input
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  className="border-gray-300 focus:border-[#eabe30]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Medical History
                </label>
                <textarea
                  value={formData.medicalHistory}
                  onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-[#eabe30] focus:outline-none"
                  rows={3}
                  placeholder="Please describe any relevant medical history..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Any Conditions or Allergies
                </label>
                <textarea
                  value={formData.conditions}
                  onChange={(e) => handleInputChange('conditions', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-[#eabe30] focus:outline-none"
                  rows={3}
                  placeholder="Please list any conditions, allergies, or concerns..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Extra Information
                </label>
                <textarea
                  value={formData.extraInformation}
                  onChange={(e) => handleInputChange('extraInformation', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-[#eabe30] focus:outline-none"
                  rows={3}
                  placeholder="Any additional information or special requests..."
                />
              </div>

              {error && (
                <div className="text-red-600 text-center p-4 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex gap-4 justify-between">
                <Button
                  onClick={() => dispatch(previousBookingStep())}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid() || loading}
                  className="bg-[#eabe30] hover:bg-[#d4a829] text-black px-8"
                >
                  {loading ? 'Booking...' : 'Book Appointment'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {bookingStep === 3 && (
          <Card className="bg-white border-[#eabe30]">
            <CardContent className="text-center py-12">
              <div className="text-6xl text-green-500 mb-6">✓</div>
              <h2 className="text-3xl font-bold text-[#1c1c1c] mb-4">
                Booking Confirmed!
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Thank you for booking with us. We'll contact you shortly to confirm your appointment.
              </p>
              <Button
                onClick={() => router.push('/')}
                className="bg-[#eabe30] hover:bg-[#d4a829] text-black px-8 py-3"
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};