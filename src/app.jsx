import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Account } from './account/account';
import { Create } from './create/create';
import { Friends } from './friends/friends';

export default function App() {
  return (
    <BrowserRouter>
    <div className="body">
    <header>
        <h1>Friend Finder</h1>
        </header>
        <hr></hr>
        <nav>
            <NavLink className="btn btn-secondary btn-sm" to="login">Sign in</NavLink> 
            <NavLink className="btn btn-secondary btn-sm" to="home">Home</NavLink> 
            <NavLink className="btn btn-secondary btn-sm" to="friends">Friends</NavLink> 
            <NavLink className="btn btn-secondary btn-sm" to="account">Account</NavLink>
        </nav>
        <hr></hr>

        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/login' element={<Login />} />
            <Route path='/account' element={<Account />} />
            <Route path='/create' element={<Create />} />
            <Route path='/friends' element={<Friends />} />
            <Route path='/home' element={<Home />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

  <footer>
            <hr></hr>
            <a href="https://github.com/Greenie2028/cs260-friend-finder">GitHub Repo</a>
        </footer>
  </div>
  </BrowserRouter>
  );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}