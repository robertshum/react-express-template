import { useForm } from "react-hook-form";
import { useDeletePizzaAPI } from '../hooks/useDataAPI';

const Delete = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const {
    deleteData,
    deleteLoading,
    deleteError,
    deleteSuccess,
  } = useDeletePizzaAPI();

  const onSubmit = (data) => {

    //RHF deals with preventDefault behaviour automatically.
    deleteData({ id: data.id });
  };

  //captured error message from useDataAPI
  if (deleteError) return <div><h1>Error Deleting Data.  {deleteError.message}</h1></div>;
  if (deleteLoading) return <div><h1>Loading Deleting Data...</h1></div>;

  return (
    <div>
      <h1>Delete</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>ID of Entity</label>
        {errors.id && <p>Please provide ID</p>}
        <input
          {...register('id', { required: true })}
          type='number'
          placeholder='1' />
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}>Save
        </button>
      </form>
    </div>
  );
};

export default Delete;