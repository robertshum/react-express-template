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

  // Home available to everyone
  // Update/Delete/Edit Operations for logged in users
  return (
    <nav class="navbar bg-base-100">
      <Link to="/" class="btn btn-ghost text-xl">Home</Link>
      {user && <Link to="/edit" class="btn btn-ghost text-xl">Edit</Link>}
      {user && <Link to="/create" class="btn btn-ghost text-xl">Create</Link>}
      {user && <Link to="/delete" class="btn btn-ghost text-xl">Delete</Link>}
      {user ?
        <button onClick={handleLogout} class="btn btn-ghost text-xl">Logout</button>
        :
        <Link to="/login" class="btn btn-ghost text-xl">Login</Link>
      }
    </nav>
  );
};

export default Navigation;