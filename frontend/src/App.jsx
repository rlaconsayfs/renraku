import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';

const Layout = React.lazy(() => import('./components/Layout/Layout'));
const ContactsDashboard = React.lazy(() => import('./components/dashboard/contacts/ContactsDashboard'));
const FavoritesDashboard = React.lazy(() => import('./components/dashboard/favorites/FavoritesDashboard'));
const ContactsCreate = React.lazy(() => import('./components/dashboard/create/ContactsCreate'));

export const UserContext = createContext();

const App = () => {

  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='/' element={<Layout />}>
            <Route index element={<ContactsDashboard />} />
            <Route path='favorites' element={<FavoritesDashboard />} />
            <Route path='create' element={<ContactsCreate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
