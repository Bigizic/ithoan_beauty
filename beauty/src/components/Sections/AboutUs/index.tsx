'use client';

import React from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';

export const AboutPage = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & Lead Aesthetician",
      description: "With over 15 years of experience in skincare and beauty treatments.",
    },
    {
      name: "Maria Rodriguez",
      role: "Senior Massage Therapist",
      description: "Specializes in therapeutic and relaxation massage techniques.",
    },
    {
      name: "Emily Chen",
      role: "Lash & Brow Specialist",
      description: "Expert in lash extensions and eyebrow shaping services.",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Hero Section */}
      <section className="py-20 bg-[#e6e1c9]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-[#1c1c1c] mb-6">About Tohanniees Beauty</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Where beauty meets serenity. We're dedicated to providing exceptional, 
            personalized spa experiences that nurture both body and mind.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1c1c1c] mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2015, Tohanniees Beauty began as a small neighborhood spa with a big dream: 
                to create a sanctuary where people could escape the stresses of daily life and reconnect 
                with their inner peace.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Over the years, we've grown into a full-service beauty and wellness center, but our 
                core mission remains the same - to provide exceptional care in a warm, welcoming environment 
                where every client feels valued and pampered.
              </p>
              <p className="text-lg text-gray-700">
                Today, we're proud to serve our community with a wide range of services, from rejuvenating 
                facials to relaxing massages, all delivered by our team of skilled professionals.
              </p>
            </div>
            <div className="relative">
              <img
                src="/images/home_page/about_us.jpg"
                alt="Our spa interior"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-[#e6e1c9]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1c1c1c] text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-[#eabe30]">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#eabe30] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-bold text-[#1c1c1c] mb-4">Excellence</h3>
                <p className="text-gray-700">
                  We strive for excellence in every service we provide, using only the highest quality 
                  products and techniques.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#eabe30]">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#eabe30] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💝</span>
                </div>
                <h3 className="text-xl font-bold text-[#1c1c1c] mb-4">Care</h3>
                <p className="text-gray-700">
                  Every client receives personalized attention and care, tailored to their unique needs 
                  and preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#eabe30]">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#eabe30] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="text-xl font-bold text-[#1c1c1c] mb-4">Wellness</h3>
                <p className="text-gray-700">
                  We believe in holistic wellness, promoting not just outer beauty but inner peace 
                  and well-being.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1c1c1c] text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white border-[#eabe30]">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-[#e6e1c9] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-[#1c1c1c]">👤</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1c1c1c] mb-2">{member.name}</h3>
                  <p className="text-[#eabe30] font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-700">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1c1c1c]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Book your appointment today and discover why our clients keep coming back.
          </p>
          <Button className="bg-[#eabe30] hover:bg-[#d4a829] text-black px-8 py-4 text-lg font-semibold rounded-lg">
            Book Your Appointment
          </Button>
        </div>
      </section>
    </div>
  );
};