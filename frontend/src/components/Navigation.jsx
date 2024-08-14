import { Link } from 'react-router-dom';

const Navigation = function() {

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/edit">Edit</Link>
      <Link to="/create">Create</Link>
      <Link to="/delete">Delete</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navigation;