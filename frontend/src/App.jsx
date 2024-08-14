import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserProvider';

//css
import './App.css';

//components
import Navigation from './components/Navigation';

//pages
import Home from './pages/Home';
import Edit from './pages/Edit';
import Delete from './pages/Delete';
import Create from './pages/Create';
import Login from './pages/Login';

function App() {

  return (
    <>
      <UserProvider>
        <Navigation />
        <Routes>
          <Route path="/Home"
            element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/create" element={<Create />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
