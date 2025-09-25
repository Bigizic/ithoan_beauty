'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../src/hooks/redux';
import { fetchServiceBySlug } from '../../../src/store/slices/servicesSlice';
import { ServiceDetailPage } from '../../../src/screens/ServiceDetailPage';

export default function ServiceDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const dispatch = useAppDispatch();
  const { currentService, loading, error } = useAppSelector((state) => state.services);

  useEffect(() => {
    if (slug) {
      dispatch(fetchServiceBySlug(slug));
    }
  }, [dispatch, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading service...</div>
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

  if (!currentService) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Service not found</div>
      </div>
    );
  }

  return <ServiceDetailPage service={currentService} />;
}