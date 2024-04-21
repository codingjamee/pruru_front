import type { Metadata } from 'next';
import './globals.css';
import MSWComponent from '@/_components/MSWComponent';
import { montserrat } from '@/_styles/fonts';
import { RQProvider } from './(afterLogin)/_component/RQProvider';
import { ToastProvider } from '@/_components/Toast';

export const metadata: Metadata = {
  title: 'PRURU refrigerator manage App',
  description: '당신의 냉장고를 신선하게...',
  themeColor: '#7bc35b',
  icons: [
    {
      url: '/icons/android-icon-36x36.png',
      sizes: '36x36',
      type: 'image/png',
    },
    {
      url: '/icons/android-icon-48x48.png',
      sizes: '48x48',
      type: 'image/png',
    },
    {
      url: '/icons/android-icon-72x72.png',
      sizes: '72x72',
      type: 'image/png',
    },
    {
      url: '/icons/android-icon-96x96.png',
      sizes: '96x96',
      type: 'image/png',
    },
    {
      url: '/icons/android-icon-144x144.png',
      sizes: '144x144',
      type: 'image/png',
    },
    {
      url: '/icons/android-icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <MSWComponent />
        <div id="modal-root" />
        <div id="toast" />
        <ToastProvider>
          <RQProvider>{children}</RQProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
