import { usePizzasAPI } from '../hooks/useDataAPI';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Home = () => {

  const { user } = useContext(UserContext);

  const {
    dataFromQuery,
    getError,
    getLoading,
  } = usePizzasAPI();

  if (!user) return <div><h1>Please log in!</h1></div>;
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