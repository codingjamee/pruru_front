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
        <header className="center-alignment ">
          <h1
            className={`header-font ${montserrat.className} nav-logo-font flex items-center justify-center`}>
            PRURU
          </h1>
          <div className="nav-logo-img">
            <Image src={logo} alt="logo" />
          </div>
        </header>
        <div className="hidden w-full tablet:block desktop:block">
          <nav className="flex w-full justify-between">
            <p>우리집</p>
            <NavTop />
          </nav>
        </div>
      </div>
      <div className="w-full max-w-[900px] flex-1 px-5 tablet:px-9 desktop:px-12">
        {children}
      </div>
      <nav className="mobile-nav">모바일 네브바</nav>
    </div>
  );
}
