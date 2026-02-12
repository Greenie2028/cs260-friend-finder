import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
  <div className="body">
  <header>
        <h1>Friend Finder</h1>
        </header>
        <hr></hr>
        <nav>
            <a className="btn btn-secondary btn-sm" href="index.html">Sign in</a> 
            <a className="btn btn-secondary btn-sm" href="home.html">Home</a> 
            <a className="btn btn-secondary btn-sm">Friends</a> 
            <a className="btn btn-secondary btn-sm" href="account.html">Account</a>
        </nav>
        <hr></hr>
  <div className="body bg-dark text-light">App will display here</div>
  <footer>
            <hr></hr>
            <a href="https://github.com/Greenie2028/cs260-friend-finder">GitHub Repo</a>
        </footer>
  </div>
  );
}