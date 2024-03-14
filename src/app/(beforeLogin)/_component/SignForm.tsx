'use client';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import Input from '@/_components/Input';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { FormType } from '@/_types/CommonTypes';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FormType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      pwd: '',
      email: '',
    },
  });
  const pathname = usePathname();
  const [isJoinPage, setIsJoinPage] = useState(pathname === '/welcome/join');

  const router = useRouter();

  useEffect(() => {
    setIsJoinPage(pathname === '/welcome/join');
  }, []);

  const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="full mb-[100px] mt-[70px] flex-row mobile:flex-col tablet:flex-col">
      <Card
        variant="outlined"
        className="m-0 flex min-h-[390px] w-[636px] flex-col p-[30px] mobile:w-[370px]">
        <h1 className="text-size-font-card-title">
          {isJoinPage ? '회원가입' : '로그인'}
        </h1>
        <div className="flex flex-col gap-9 rounded-md">
          <>
            {isJoinPage && (
              <Input
                variant={errors.name ? 'danger' : 'passed'}
                type="text"
                placeholder="이름"
                {...register('name', {
                  required: '반드시 입력해주세요',
                  minLength: { value: 2, message: '2글자 이상 입력해주세요.' },
                })}
              />
            )}
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </>
          <Input
            variant={errors.email ? 'danger' : 'passed'}
            type="text"
            placeholder="이메일"
            {...register('email', {
              required: '반드시 입력해주세요',
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: '이메일 형식에 맞지 않습니다.',
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <Input
            variant={errors.pwd ? 'danger' : 'passed'}
            type="password"
            placeholder="비밀번호"
            {...register('pwd', {
              required: '반드시 입력해주세요',
              maxLength: {
                value: 20,
                message: '최대 10글자 입력이 가능합니다.',
              },
              minLength: { value: 3, message: '3글자 이상 입력해주세요.' },
            })}
          />
          {errors.pwd && <p className="text-red-500">{errors.pwd.message}</p>}
        </div>
        <Button
          type="submit"
          variant="primary"
          className="btn-defaultsize"
          disabled={isSubmitting || !isValid}>
          {isJoinPage ? '회원가입' : '로그인'}
        </Button>
      </Card>
      <Card
        variant="primary"
        className="m-0 flex h-[390px] w-[636px] flex-col p-[30px] pt-[70px] mobile:w-[370px]">
        {isJoinPage ? (
          <>
            <p>이미 가입 하셨나요?</p>
            <Button
              variant="outlined"
              className="btn-defaultsize w-[200px]"
              onClick={() => {
                router.push('/welcome/login');
              }}>
              로그인 하러가기
            </Button>
          </>
        ) : (
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
        )}
      </Card>
    </form>
  );
};

export default LoginForm;
