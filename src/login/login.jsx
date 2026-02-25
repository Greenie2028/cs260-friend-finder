import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleSignIn(e) {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem('users')) || {};

        if (users[email] && users[email].password === password) {
            localStorage.setItem('currentUser', email);
            navigate('/home');
        }
        else {
            setError('Invalid email or password. Please try again or create an account.');
        }
    }


    return (
    <main>
        <form onSubmit={handleSignIn}>
            <div className="form">
                <h2>Sign in:</h2>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Example@email.com" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <hr className="invis"></hr>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <hr className="invis"></hr>
                {error && <p style={{color: 'red'}}>{error}</p>}
            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
        <hr className="invis"></hr>
        <a className="btn btn-primary" href="/create">Create an account</a>
        <hr className="invis"></hr>
        <img src="/friends_clip.png" alt="Hand Drawn Friends" width="30%"></img>
        <hr className="invis"></hr>
        <a href="http://www.freepik.com">Designed by Freepik</a>
        </main>
  );
}