import Loading from '@/app/loading';
import LoginForm from '../../_component/LoginForm';

const page = () => {
  return (
    <>
      <LoginForm />;
      <Loading />
    </>
  );
};

export default page;
