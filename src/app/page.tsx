'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchServices } from '../store/slices/servicesSlice';
import { HomeDesktop } from '../screens/HomeDesktop/HomeDesktop';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { services, loading } = useAppSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  return <HomeDesktop services={services} loading={loading} />;
}