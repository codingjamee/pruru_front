import { Metadata } from 'next';
import User from '../_component/User';

export const metadata: Metadata = {
  title: '마이페이지 / PRURU',
  description: '로그아웃 하기',
};

const page = () => {
  return (
    <div>
      <User />
    </div>
  );
};

export default page;
