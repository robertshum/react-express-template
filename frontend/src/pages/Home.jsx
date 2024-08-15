import { usePizzasAPI } from '../hooks/useDataAPI';

const Home = () => {

  const {
    dataFromQuery,
    getError,
    getLoading,
  } = usePizzasAPI();


  if (getError) return <div><h1>Error Loading Data</h1></div>;
  if (getLoading) return <div><h1>Loading Data...</h1></div>;

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {dataFromQuery.map(pizza => (
          <li key={pizza._id}>
            <h2>{pizza.name}</h2>
            <p>Quantity: {pizza.quantity}</p>
            <p>{pizza.available ? "Available" : "Not Available"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;