import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Contacts from './pages/Contacts';

import AuthContext from './context/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (localStorage.getItem('userId')) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const logIn = (user) => {
    localStorage.setItem('userId', user.id);
    setIsLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  if (isLoading) return 'Loading..';

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      <BrowserRouter>
        <Navbar />
        {isLoggedIn ? (
          <Switch>
            <Route path='/' component={Contacts} exact />
            <Redirect to='/' />
          </Switch>
        ) : (
          <Switch>
            <Route path='/login' component={Login} exact />
            <Redirect to='/login' />
          </Switch>
        )}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
