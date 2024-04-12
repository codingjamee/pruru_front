'use client';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import { api } from '@/_utils/createCustomFetch';
import { useQueryClient } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const User = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: me } = useSession();
  const onClickLogout = async () => {
    queryClient.invalidateQueries({
      queryKey: ['receipt'],
    });
    queryClient.invalidateQueries({
      queryKey: ['foods'],
    });
    queryClient.invalidateQueries({
      queryKey: ['search'],
    });
    await api('/user/logout');
    await signOut({ redirect: false }).then(() => {
      router.replace('/welcome/login');
    });
  };

  useEffect(() => {
    if (!me) {
      router.replace('/welcome/login');
    }
  }, []);

  return (
    <Card
      variant="outlined"
      className="m-0 flex min-h-[390px] w-[636px] flex-col p-[30px] mobile:w-[370px]">
      <h1 className="text-size-font-card-title">유저페이지</h1>
      <div className="flex flex-col gap-9 rounded-md">
        <div>{me?.user?.name}님의 마이페이지</div>
        <Button
          onClick={onClickLogout}
          variant="primary"
          className="rounded-lg">
          로그아웃하기
        </Button>
      </div>
    </Card>
  );
};

export default User;
