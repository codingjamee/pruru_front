'use client';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import Input from '@/_components/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signInUser } from '@/_utils/mutateQuery';
import Toast from '@/_components/Toast';
import ToastText from '@/_components/ToastText';
import { useState } from 'react';

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '반드시 입력해주세요' })
    .email({ message: '이메일 형식에 맞게 입력해주세요' }),
  password: z.string().min(1),
});

type LoginType = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const [error, setError] = useState('');
  const [toastShow, setToastShow] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<LoginType>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: ['user'],
    mutationFn: (data: {
      email: string;
      password: string;
      name?: string;
      image?: string;
    }) => signInUser(data),
    onSuccess: (userData) => {
      queryClient.setQueryData(['user'], {
        name: userData.username,
        image: userData.image,
      });
      return router.replace('/home');
    },
    onError: (err) => {
      console.log(err);
      setToastShow(true);
      setError('이메일 혹은 비밀번호가 일치하지 않습니다.');
    },
  });

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      mutate(data);
    } catch (err) {
      console.error(err);
    }
    reset();
  };

  return (
    <>
      <Toast show={toastShow} setShow={setToastShow}>
        <ToastText>{error}</ToastText>
      </Toast>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="full mb-[100px] mt-[70px] flex-row mobile:flex-col tablet:flex-col">
        <Card
          variant="outlined"
          className="m-0 flex min-h-[390px] w-[636px] flex-col p-[30px] mobile:w-[370px]">
          <h1 className="text-size-font-card-title">로그인 </h1>
          <div className="flex flex-col gap-9 rounded-md">
            <Input
              variant={errors.email ? 'danger' : 'passed'}
              type="text"
              placeholder="이메일 (이메일 형식)"
              {...register('email')}
            />
            {errors.email && (
              <p role="alert" className="text-red-500">
                {errors.email.message}
              </p>
            )}

            <Input
              variant={errors.password ? 'danger' : 'passed'}
              type="password"
              {...register('password')}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="btn-defaultsize"
            disabled={isSubmitting || !isValid}>
            로그인
          </Button>
        </Card>
        <Card
          variant="primary"
          className="m-0 flex h-[390px] w-[636px] flex-col p-[30px] pt-[70px] mobile:w-[370px]">
          <>
            <p>아직 회원이 아니신가요?</p>
            <Button
              variant="outlined"
              className="btn-defaultsize w-[200px]"
              onClick={() => {
                router.push('/welcome/join');
              }}>
              회원가입
            </Button>
          </>
        </Card>
      </form>
    </>
  );
};

export default LoginForm;
