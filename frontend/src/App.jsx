import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Layout from './components/Layout/Layout';
import ContactsDashboard from './components/dashboard/contacts/ContactsDashboard';
import FavoritesDashboard from './components/dashboard/favorites/FavoritesDashboard';
import ContactsCreate from './components/dashboard/create/ContactsCreate';

const App = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='/' element={<Layout />}>
        <Route index element={<ContactsDashboard />} />
        <Route path='favorites' element={<FavoritesDashboard />} />
        <Route path='create' element={<ContactsCreate />} />
      </Route>
    </Routes>
  );
};

export default App;
