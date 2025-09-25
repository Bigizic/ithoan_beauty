'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../src/hooks/redux';
import { fetchServices } from '../../src/store/slices/servicesSlice';
import { ServicesPage } from '../../src/screens/ServicesPage';

export default function Services() {
  const dispatch = useAppDispatch();
  const { services, loading, error } = useAppSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading services...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return <ServicesPage services={services} />;
}