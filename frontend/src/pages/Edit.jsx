import { useForm } from "react-hook-form";
import { usePizzasAPI, usePizzaMutationAPI } from '../hooks/useDataAPI';

const Edit = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const {
    dataFromQuery,
    getError,
    getLoading,
  } = usePizzasAPI();

  // console.log('datafromquery: ', dataFromQuery);
  console.log('errors: ', errors);

  const {
    saveData,
    saveLoading,
    saveError,
    saveSuccess,
  } = usePizzaMutationAPI();

  const onSubmit = (data) => {
    // event.preventDefault(); //RHF deals with this automatically.
    console.log("data: ", data);
    // TODO move this to a form, obviously.
    const pizzaData =
    {
      name: data.pizzaName,
      quantity: 3,
      available: true
    };
    saveData({ id: 1, data: pizzaData });
  };

  if (getError) return <div><h1>Error Loading Data</h1></div>;
  if (getLoading) return <div><h1>Loading Data...</h1></div>;
  if (saveError) return <div><h1>Error Saving Data</h1></div>;
  if (saveLoading) return <div><h1>Loading Save Data...</h1></div>;

  return (
    <div>
      <h1>Edit</h1>
      <ul>
        {dataFromQuery.map(pizza => (
          <li key={pizza._id}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Name of Entity</label>
              {errors.pizzaName && <p>Please provide pizza name</p>}
              <input
                {...register('pizzaName', { required: true })}
                type='text'
                placeholder={pizza.name} />
              <label>Quantity</label>
              {errors.quantity && <p>Please provide quantity</p>}
              <input
                {...register('quantity', { required: true })}
                type='number'
                placeholder={pizza.quantity} />
              <p>{pizza.available ? "Available" : "Not Available"}</p>
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}>Save
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Edit;