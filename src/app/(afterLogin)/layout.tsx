import Image from 'next/image';
import logo from '@/_assets/pruru_logo.png';
import NavTop from './_component/NavTop';
import Link from 'next/link';
import RefrigerIcon from '@/_assets/RefrigerIcon';
// import SearchGlass from '@/_assets/SearchGlass';
import ReceiptIcon from '@/_assets/ReceiptIcon';
import UserIcon from '@/_assets/UserIcon';
import AddList from '@/_assets/AddList';
import { YearMonthProvider } from '@/_contexts/DateContext';
import { Suspense } from 'react';
import { montserrat } from '@/_styles/fonts';
import Loading from '../loading';

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <YearMonthProvider>
      <Suspense fallback={<Loading />}>
        <div className="full relative">
          <div className="nav">
            <Link href="/home">
              <header className="center-alignment">
                <h1
                  className={`header-font ${montserrat.className} nav-logo-font flex items-center justify-center`}>
                  PRURU
                </h1>
                <div className="nav-logo-img">
                  <Image src={logo} alt="logo" />
                </div>
              </header>
            </Link>
            <div className="hidden w-full text-size-font-card-title tablet:block desktop:block">
              <nav className="flex w-full justify-between">
                <Link href="/user">마이페이지</Link>
                <NavTop />
              </nav>
            </div>
          </div>
          <div className="min-h-[100vh] w-full max-w-[950px] px-5 mobile:pb-[72px] tablet:px-9 desktop:px-12">
            {children}
          </div>
          <nav className="mobile-nav">
            <div className="mx-10 flex w-full cursor-pointer flex-row items-center justify-between">
              <RefrigerIcon width={30} height={30} path="/food" />
              <ReceiptIcon width={30} height={30} path="/receipt" />
              {/* <SearchGlass
                width={30}
                height={30}
                color="black"
                path="/searches"
              /> */}
              <UserIcon width={30} height={30} path="/user" />
              <AddList width={30} height={30} path="/add/receipt" />
            </div>
          </nav>
        </div>
      </Suspense>
    </YearMonthProvider>
  );
}
