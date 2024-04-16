import type { Metadata } from 'next';
import './globals.css';
import MSWComponent from '@/_components/MSWComponent';
import { montserrat } from '@/_styles/fonts';
import { RQProvider } from './(afterLogin)/_component/RQProvider';
import { ToastProvider } from '@/_components/Toast';

export const metadata: Metadata = {
  title: 'PRURU',
  description: '당신의 냉장고를 신선하게',
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
