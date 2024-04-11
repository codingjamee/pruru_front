'use client';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import Input from '@/_components/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { api } from '@/_utils/createCustomFetch';

const pwdRegex = new RegExp(/(?=.*\d)(?=.*[a-z]).{8,}/);

const SignupSchema = z
  .object({
    name: z.string().min(2, { message: '2글자 이상 입력해주세요' }),
    email: z
      .string()
      .min(1, { message: '반드시 입력해주세요' })
      .email({ message: '이메일 형식에 맞게 입력해주세요' }),
    password: z
      .string()
      .min(5)
      .max(20)
      .regex(
        pwdRegex,
        '영어소문자, 숫자 포함 5자 이상 20자 미만으로 입력해주세요',
      ),
    checkPwd: z.string().min(5),
  })
  .superRefine(({ checkPwd, password }, ctx) => {
    if (checkPwd !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '패스워드가 일치하지 않습니다.',
        path: ['checkPwd'],
      });
    }
  });

type SignupType = z.infer<typeof SignupSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<SignupType>({
    mode: 'onChange',
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      checkPwd: '',
    },
  });
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(
      '지금 세션 정보는?????____________ㅇㄹㅇㄹㅉㄸㄹㅉㄸㄹㅉㄹㄸㄹㄸㄹㄷㄹㅈㄹㅈㄹㄷㄹㅈㄷㅈ',
      session.status,
    );
    if (session.status === 'authenticated') {
      router.replace('/home');
    }
  }, [session.status]);

  const onSubmit: SubmitHandler<SignupType> = async (data) => {
    console.log(data);
    let showRedirect = false;
    try {
      //회원가입
      const response: Response & {
        email?: string;
        username?: string;
        image?: string;
      } = await api('/user/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          name: data.name,
        }),
      });
      if (response.ok) {
        await signIn('credentials', {
          name: response.username,
          ...(response.image && { image: response.image }),
          redirect: false,
        });
      }
      showRedirect = true;
    } catch (err) {
      //추후 toast로 설정
      console.error(err);
      return null;
    }
    reset();
    if (showRedirect) router.replace('/home');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="full mb-[100px] mt-[70px] flex-row mobile:flex-col tablet:flex-col">
      <Card
        variant="outlined"
        className="m-0 flex min-h-[390px] w-[636px] flex-col p-[30px] mobile:w-[370px]">
        <h1 className="text-size-font-card-title">회원가입</h1>
        <div className="flex flex-col gap-9 rounded-md">
          <>
            <Input
              variant={errors.name ? 'danger' : 'passed'}
              type="text"
              placeholder="이름 (2글자 이상)"
              {...register('name', {
                required: '반드시 입력해주세요',
                minLength: { value: 2, message: '2글자 이상 입력해주세요.' },
              })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </>
          <Input
            variant={errors.email ? 'danger' : 'passed'}
            type="text"
            placeholder="이메일 (이메일 형식)"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <Input
            variant={errors.password ? 'danger' : 'passed'}
            type="password"
            placeholder="비밀번호 (최소5자 ~ 20자)"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <Input
            variant={errors.checkPwd ? 'danger' : 'passed'}
            type="password"
            placeholder="비밀번호를 다시한번 입력해주세요"
            {...register('checkPwd')}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          className="btn-defaultsize"
          disabled={isSubmitting || !isValid}>
          회원가입
        </Button>
      </Card>
      <Card
        variant="primary"
        className="m-0 flex h-[390px] w-[636px] flex-col p-[30px] pt-[70px] mobile:w-[370px]">
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
      </Card>
    </form>
  );
};

export default SignupForm;
