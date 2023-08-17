import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Layout from './components/Layout/Layout';
import ContactsDashboard from './components/dashboard/contacts/ContactsDashboard';
import ContactsCreate from './components/dashboard/create/ContactsCreate';
import ContactDetails from './components/dashboard/contacts/ContactDetails';
import NotFound from './components/notfound/NotFound';
import Logout from './components/logout/Logout';
import ContactsEdit from './components/dashboard/edit/ContactsEdit';
import Recents from './components/dashboard/recents/Recents';
import UserDetails from './components/dashboard/user/UserDetails';

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='logout' element={<Logout />} />
          <Route path='/' element={<Layout />}>
            <Route index element={<ContactsDashboard />} />
            <Route path='recents' element={<Recents />} />
            <Route path='create' element={<ContactsCreate />} />
            <Route path='contacts/:id' element={<ContactDetails />} />
            <Route path='contacts/:id/edit' element={<ContactsEdit />} />
            <Route path='/:userame' element={<UserDetails />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
