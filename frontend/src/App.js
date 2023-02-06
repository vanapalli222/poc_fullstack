import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios';
import UserContext from './context/userContext';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';
import CreateBook from './components/CreateBook';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import UpdateBookInfo from './components/UpdateBookInfo';
import Header from './components/Header';
import Protected from './components/Protected';


const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
 
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
    <Router>
        <Header/>
      <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/register' element={<Register/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/create-book' element={<Protected isLoggedIn={userData?.token}><CreateBook /></Protected>} />
          <Route exact path='/edit-book/:id' element={<Protected isLoggedIn={userData?.token}><UpdateBookInfo /></Protected>} />
          <Route exact path='/show-book/:id' element={<Protected isLoggedIn={userData?.token}><ShowBookDetails /></Protected>} />
          </Routes>   
     </Router>
     </UserContext.Provider>

    
  );
};

export default App;