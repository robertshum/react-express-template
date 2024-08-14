import { useForm } from "react-hook-form";

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = (data) => {

    //RHF deals with preventDefault behaviour automatically.

    //Matches the schema in the backend
    const user =
    {
      email: data.email,
      password: data.password,
    };

    // saveData({ data: pizzaData });
  };

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
        <input
          {...register('password', { required: true })}
          type='password'
          placeholder='userPassword123' />
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}>Save
        </button>
      </form>
    </div>
  );

};

export default Login;