import { useForm } from "react-hook-form";
import { loginUserAPI } from '../hooks/useDataAPI';

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const {
    login,
    loginError,
    loginSuccess,
  } = loginUserAPI();

  const onSubmit = (data) => {

    //RHF deals with preventDefault behaviour automatically.

    //Matches the schema in the backend, pass in email and password
    login({ email: data.email, password: data.password });
  };

  if (loginError) return <div><h1>Error Logging in.  {loginError.message}</h1></div>;
  if (loginSuccess) return <div><h1>Logged in!</h1></div>;

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        {errors.email && <p>Please provide email</p>}
        <input
          {...register('email', { required: true })}
          type='string'
          placeholder='user@example.com' />
        <label>Password</label>
        {errors.password && <p>Please provide password</p>}
        <input
          {...register('password', { required: true })}
          type='password'
          placeholder='123' />
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}>Save
        </button>
      </form>
    </div>
  );

};

export default Login;