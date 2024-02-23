import Button from '@/_components/Button';
import logo from '../../public/pruru_logo.png';
import Image from 'next/image';
import { montserrat } from '@/app/layout';

export default function Home() {
  return (
    <>
      <main className="w-full h-full flex flex-col align-middle justify-center">
        <div className="center-alignment">
          <div className="logo-img desktop:desktop-logo-img tablet:tablet-logo-img">
            <Image src={logo} alt="logo" />
          </div>
        </div>
        <div className="flex flex-col justify-center align-middle gap-10">
          <h1
            className={`header big-logo ${montserrat.className} flex justify-center`}>
            PRURU
          </h1>
          <div className="text-center text-sub-logo-100 text-3xl">
            당신의 냉장고를 신선하게...
          </div>
          <div className="flex justify-center align-middle gap-14">
            <Button>로그인</Button>
            <Button>회원가입</Button>
          </div>
        </div>
      </main>
    </>
  );
}
