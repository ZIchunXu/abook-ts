import React, { useEffect, useState } from 'react';
import {Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { routes } from './router/routes';
import './App.scss';

function App() {
  const location = useLocation();
  const {pathname} = location;
  const [showNav, setShowNav] = useState<boolean>(false);
  const needNav = ['/', '/statistics', '/user'];

  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname]);

  return (
    <div className="App">
      <Routes>
        {routes.map((route) => <Route key={route.path} path={route.path} element={<route.component/>} />)}
      </Routes>
      <NavBar showNav={showNav}/>
    </div>
  );
}

export default App;
