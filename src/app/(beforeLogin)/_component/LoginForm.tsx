'use client';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import Input from '@/_components/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/_utils/createCustomFetch';
import { useQueryClient } from '@tanstack/react-query';

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '반드시 입력해주세요' })
    .email({ message: '이메일 형식에 맞게 입력해주세요' }),
  password: z.string().min(1),
});

type LoginType = z.infer<typeof LoginSchema>;

const LoginForm = () => {
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
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({
    queryKey: ['receipt'],
  });
  queryClient.invalidateQueries({
    queryKey: ['foods'],
  });
  queryClient.invalidateQueries({
    queryKey: ['search'],
  });

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    let showRedirect = false;
    try {
      const response: Response & { username?: string; image?: string } =
        await api('/user/signin', {
          method: 'POST',
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

      // const responseData = await response.json();
      await response.json();

      // if (response.ok) {
      //   await signIn('credentials', {
      //     name: responseData.username,
      //     ...(responseData.image && { image: responseData.image }),
      //     redirect: false,
      //   });
      // }
      showRedirect = true;
    } catch (err) {
      //추후 toast로 설정
      console.error(err);
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
  );
};

export default LoginForm;
