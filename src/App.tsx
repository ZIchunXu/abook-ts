import React from 'react';
import {Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import { Login } from './pages/Login';
import { routes } from './router/routes';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {routes.map((route) => <Route key={route.path} path={route.path} element={<route.component/>} />)}
      </Routes>
    </div>
  );
}

export default App;
