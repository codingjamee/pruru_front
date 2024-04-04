import Image from 'next/image';
import logo from '../../public/pruru_logo.png';
import styles from './HeaderLogo.module.css';
import { montserrat } from '@/_styles/fonts';

const HeaderLogo = () => {
  return (
    <>
      <Image src={logo} alt="logo" />
      <h1
        className={`${styles.header} ${montserrat.className} flex justify-center`}>
        PRURU
      </h1>
    </>
  );
};

export default HeaderLogo;
