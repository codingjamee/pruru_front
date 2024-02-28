import Image from 'next/image';
import logo from '@/_assets/pruru_logo.png';
import { montserrat } from '@/app/layout';
import NavTop from './_component/NavTop';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="full relative">
      <div className="nav">
        <header className="center-alignment bg-green-300">
          <h1
            className={`header-font ${montserrat.className} home-logo-font flex justify-center`}>
            PRURU
          </h1>
          <div className="home-logo-img bg-sky-950">
            <Image src={logo} alt="logo" />
          </div>
        </header>
        <nav className="m-3 flex w-full justify-between">
          <p>우리집</p>
          <NavTop />
        </nav>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
