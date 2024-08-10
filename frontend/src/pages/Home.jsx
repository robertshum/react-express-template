import { useState } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { usePizzasAPI } from '../hooks/useDataApi';

const Home = function() {

  const [count, setCount] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefaut();
    const pizzaData = { name: 'Pepperoni', quantity: 2, available: true };
    handleSavePizza(pizzaData);
  };

  const {
    dataFromQuery,
    getError,
    getLoading,
  } = usePizzasAPI();


  if (getError) return <div><h1>Error Loading Data</h1></div>;
  if (getLoading) return <div><h1>Loading Data...</h1></div>;

  return (
    <div>
      <button onClick={handleSubmit}>Save Pizza</button>
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

      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default Home;