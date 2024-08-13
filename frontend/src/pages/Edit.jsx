import { useForm } from "react-hook-form";
import { usePizzaMutationAPI } from '../hooks/useDataAPI';

const Edit = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const {
    saveData,
    saveLoading,
    saveError,
    saveSuccess,
  } = usePizzaMutationAPI();

  const onSubmit = (data) => {

    //RHF deals with preventDefault behaviour automatically.

    // Matches the schema in the backend
    const pizzaData =
    {
      name: data.pizzaName,
      quantity: data.quantity,
      available: data.availability
    };
    saveData({ id: data.id, data: pizzaData });
  };

  if (saveError) return <div><h1>Error Saving Data</h1></div>;
  if (saveLoading) return <div><h1>Loading Save Data...</h1></div>;

  return (
    <div>
      <h1>Edit</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>ID</label>
        {errors.id && <p>Please provide id</p>}
        <input
          {...register('id', { required: true, valueAsNumber: true })}
          type='number'
          placeholder='1' />
        <label>Name of Pizza</label>
        {errors.pizzaName && <p>Please provide pizza name</p>}
        <input
          {...register('pizzaName', { required: true })}
          type='text'
          placeholder='Pizza Name' />
        <label>Quantity</label>
        {errors.quantity && <p>Please provide quantity</p>}
        <input
          {...register('quantity', { required: true, valueAsNumber: true })}
          type='number'
          placeholder='1' />
        <label>Availability</label>
        <input
          {...register('availability')}
          type='checkbox'
        />
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}>Save
        </button>
      </form>
    </div>
  );
};

export default Edit;