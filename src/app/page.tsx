import Button from '@/_components/Button';
import logo from '@/_assets/pruru_logo.png';
import Image from 'next/image';
import { montserrat } from '@/_styles/fonts';

export default async function Home() {
  return (
    <>
      <main className="full">
        <div className="center-alignment">
          <div className="logo-img">
            <Image src={logo} alt="logo" />
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <h1
            className={`header logo-size ${montserrat.className} flex justify-center`}>
            PRURU
          </h1>
          <div className="text-sub-logo-100 sublogo-size text-center">
            당신의 냉장고를 신선하게...
          </div>
          <div className="center-alignment gap-14">
            <Button
              variant="primary"
              className="btn-defaultsize"
              href="/welcome/login"
              aria-label="login">
              로그인
            </Button>
            <Button
              className="btn-defaultsize"
              variant="primary"
              href="/welcome/join"
              aria-label="sign-up">
              회원가입
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
