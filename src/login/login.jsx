import React from 'react';
import '../app.css';

export function Login() {
  return (
    <main>
        <form method="get" action="home.html">
            <div className="form">
                <h3>Sign in:</h3>
                <label for="email">Email:</label>
                <input type="email" id="email" name="varEmail" placeholder="example@email.com"></input>
                <hr className="invis"></hr>
                <label for="password">Password:</label>
                <input type="password" id="password" name="varPassword" placeholder="password"></input>
                <hr className="invis"></hr>
            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
        <hr className="invis"></hr>
        <a className="btn btn-primary" href="/create">Create an account</a>
        <hr className="invis"></hr>
        <img src="../../public/friends_clip.png" alt="Hand Drawn Friends" width="30%"></img>
        <hr className="invis"></hr>
        <a href="http://www.freepik.com">Designed by Freepik</a>
        </main>
  );
}