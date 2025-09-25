'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Service } from '../../store/slices/servicesSlice';

interface ServiceDetailPageProps {
  service: Service;
}

export const ServiceDetailPage = ({ service }: ServiceDetailPageProps): JSX.Element => {
  const router = useRouter();

  const handleBookNow = () => {
    router.push(`/booking?service=${service.slug}`);
  };

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-black/50 to-black/50">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.image})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl mb-6">{service.description}</p>
            <div className="flex items-center justify-center gap-8 text-lg">
              <span className="bg-[#eabe30] text-black px-4 py-2 rounded-lg font-semibold">
                ${service.price}
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-lg">
                {service.duration} minutes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#1c1c1c] mb-6">About This Service</h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {service.longDescription}
              </p>

              <h3 className="text-2xl font-bold text-[#1c1c1c] mb-4">Benefits</h3>
              <ul className="space-y-3 mb-8">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#eabe30] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Card className="bg-[#e6e1c9] border-[#eabe30]">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#1c1c1c] mb-6">Treatment Process</h3>
                  <div className="space-y-4">
                    {service.process.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-8 h-8 bg-[#eabe30] text-black rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 bg-[#1c1c1c]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Book?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Experience the ultimate in relaxation and rejuvenation with our {service.title} treatment.
          </p>
          <Button
            onClick={handleBookNow}
            className="bg-[#eabe30] hover:bg-[#d4a829] text-black px-8 py-4 text-lg font-semibold rounded-lg"
          >
            Book Now - ${service.price}
          </Button>
        </div>
      </section>
    </div>
  );
};