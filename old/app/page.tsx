'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../src/hooks/redux';
import { fetchServices } from '../src/store/slices/servicesSlice';
import { HomeDesktop } from '../src/screens/HomeDesktop/HomeDesktop';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { services, loading } = useAppSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  return <HomeDesktop services={services} loading={loading} />;
}