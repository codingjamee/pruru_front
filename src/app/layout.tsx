import type { Metadata } from 'next';
import './globals.css';
import MSWComponent from '@/_components/MSWComponent';
import { montserrat } from '@/_styles/fonts';
import { RQProvider } from './(afterLogin)/_component/RQProvider';
import { ToastProvider } from '@/_components/Toast';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
