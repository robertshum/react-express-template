import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Navigation = function() {
  const { logout, user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/edit">Edit</Link>
      <Link to="/create">Create</Link>
      <Link to="/delete">Delete</Link>
      {user ?
        <button onClick={handleLogout}>Logout</button>
        :
        <Link to="/login">Login</Link>}
    </nav>
  );
};

export default Navigation;