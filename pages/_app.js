import '../styles/global.css';
import { Amplify } from 'aws-amplify';
import awsconfig from '../amplify/config';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

Amplify.configure(awsconfig);

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.__clearedLogin) {
      localStorage.removeItem('username');
      localStorage.removeItem('userRole');
      window.__clearedLogin = true;
    }

    const isLoggedIn = !!localStorage.getItem('username');
    const role = localStorage.getItem('userRole');

    if (!isLoggedIn && router.pathname !== '/') {
      router.replace('/');
    }

    if (isLoggedIn && router.pathname === '/') {
      router.replace('/home');
    }

    if ((role === 'Family' || role === 'Guest') && router.pathname === '/chart') {
      router.replace('/home');
    }
  }, [router]);

  return <Component {...pageProps} />;
}
