import { usePizzasAPI, usePizzaMutationAPI } from '../hooks/useDataAPI';

const Edit = () => {

  const {
    dataFromQuery,
    getError,
    getLoading,
  } = usePizzasAPI();

  const {
    saveData,
    saveLoading,
    saveError,
    saveSuccess,
  } = usePizzaMutationAPI();

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO move this to a form, obviously.
    const pizzaData =
    {
      name: 'Pepperoni',
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
            <h2>{pizza.name}</h2>
            <p>Quantity: {pizza.quantity}</p>
            <p>{pizza.available ? "Available" : "Not Available"}</p>
          </li>
        ))}
      </ul>
      <form>
        <button type="submit" onClick={handleSubmit}>Save</button>
      </form>

    </div>
  );
};

export default Edit;