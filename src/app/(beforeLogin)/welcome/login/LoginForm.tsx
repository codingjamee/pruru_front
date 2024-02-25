'use client';
import { useForm, Controller } from 'react-hook-form';

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
    control,
    handleSubmit: onSubmit,
  } = useForm<FormType>({
    mode: 'onSubmit',
    defaultValues: {
      id: '',
      name: '',
      pwd: '',
      email: '',
      phone: '',
    },
  });

  const handleSubmit = () => {
    // const handleSubmit = (data: FormType) => {
    // console.log(data);
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Controller
        control={control}
        name="id"
        render={({ field: { value, onChange } }) => (
          <input value={value} onChange={onChange} />
        )}
        rules={{
          required: '반드시 입력해주세요',
          max: { value: 10, message: '최대 10글자 입력이 가능합니다.' },
          min: { value: 3, message: '3글자 이상 입력해주세요.' },
        }}
      />

      <Controller
        control={control}
        name="pwd"
        render={({ field: { value, onChange } }) => (
          <input value={value} onChange={onChange} />
        )}
      />

      <input
        type="text"
        {...register('email', {
          pattern: {
            value:
              /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
            message: '이메일 형식에 맞지 않습니다.',
          },
        })}
      />

      <button>Submit</button>
    </form>
  );
};

export default LoginForm;
