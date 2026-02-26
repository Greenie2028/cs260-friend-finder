import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Account } from './account/account';
import { Create } from './create/create';
import { Friends } from './friends/friends';

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        setIsLoggedIn(!!currentUser);   
    }, []);

  return (
    <BrowserRouter>
    <div className="body">
    <header>
        <h1>Friend Finder</h1>
        </header>
        {isLoggedIn && (
        <>
        <hr></hr>
        <nav>
            <NavLink className="btn btn-secondary btn mx-1" to="login">Sign in</NavLink> 
            <NavLink className="btn btn-secondary btn mx-1" to="home">Home</NavLink> 
            <NavLink className="btn btn-secondary btn mx-1" to="friends">Friends</NavLink> 
            <NavLink className="btn btn-secondary btn mx-1" to="account">Account</NavLink>
        </nav>
        </>
        )}
        <hr></hr>

        <Routes>
            <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />} exact />
            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/account' element={<Account setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path='/create' element={<Create setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path='/friends' element={<Friends />} />
            <Route path='/home' element={<Home />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

  <footer>
            <hr></hr>
            <div>Levi Clements' <a href="https://github.com/Greenie2028/cs260-friend-finder">GitHub Repo</a></div>
        </footer>
  </div>
  </BrowserRouter>
  );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}