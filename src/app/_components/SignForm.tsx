'use client';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import Input from '@/_components/Input';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';

interface FormType {
  id: string;
  name: string;
  pwd: string;
  email: string;
  phone: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormType>({
    mode: 'onBlur',
    defaultValues: {
      id: '',
      name: '',
      pwd: '',
      email: '',
      phone: '',
    },
  });
  const pathname = usePathname();
  const [isJoinPage, setIsJoinPage] = useState(pathname === '/welcome/join');

  const router = useRouter();

  useEffect(() => {
    setIsJoinPage(pathname === '/welcome/join');
  }, []);

  const handleSubmit = () => {
    // const handleSubmit = (data: FormType) => {
    // console.log(data);
    reset();
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)} className="full">
      <Card variant="outlined">
        <h1 className="text-size-font-card-title">
          {isJoinPage ? '회원가입' : '로그인'}
        </h1>
        <div className="flex flex-col rounded-md gap-9">
          <>
            {isJoinPage && (
              <Input
                type="text"
                placeholder="이름"
                {...register('name', {
                  required: '반드시 입력해주세요',
                  max: { value: 10, message: '최대 10글자 입력이 가능합니다.' },
                  min: { value: 1, message: '1글자 이상 입력해주세요.' },
                })}
              />
            )}
            {errors.name && <p>{errors.name.message}</p>}
          </>
          <div className="full">
            <Input
              type="text"
              placeholder="이메일"
              {...register('email', {
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: '이메일 형식에 맞지 않습니다.',
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <Input
              type="password"
              placeholder="비밀번호"
              {...register('pwd', {
                required: '반드시 입력해주세요',
                max: { value: 10, message: '최대 10글자 입력이 가능합니다.' },
                min: { value: 3, message: '3글자 이상 입력해주세요.' },
              })}
            />
            {errors.pwd && <p>{errors.pwd.message}</p>}
          </div>
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || !!errors}>
          {isJoinPage ? '회원가입' : '로그인'}
        </Button>
      </Card>
      <Card variant="primary">
        {isJoinPage ? (
          <>
            <p>이미 가입 하셨나요?</p>
            <Button
              variant="outlined"
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
