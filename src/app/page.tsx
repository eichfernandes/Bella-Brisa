"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const WelcomePage = () => {
  const router = useRouter();
  return (
    router.push('/login')
  );
};

export default WelcomePage;
