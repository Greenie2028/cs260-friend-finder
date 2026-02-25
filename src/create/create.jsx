import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Create() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleCreate(e) {
        e.preventDefault();

        if (password !== confirmPass) {
            setError('Passwords do not match.');
            return;
        }

        if (!email || !password || !name || !city) {
            setError('Please fill out all fields');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || {};

        if (users[email]) {
            setError('An account with that email already exists.');
            return;
        }

        users[email] = { password, name, city };
        localStorage.setItem('users', JSON.stringify(users));

        localStorage.setItem('currentUser', email);

        navigate('/home');
    }


    return (
    <main>
      <h3>Create account</h3>
        <form onSubmit={handleCreate}>
            <div class="form">
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="confirm_pass">Confirm Password: </label>
                <input type="password" id="confirm_pass" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
            <label htmlFor="city">City:</label>
            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)}/>
            </div>
            {/* Removed for now as localStorage can't hold large enough sizing for the images
            <div> 
            <label for="photo_id">Profile Photo</label>
            <input type="file" id="photo_id" name="photo"></input>
            </div> */} 
            {error && <p style={{ color : 'red'}} > {error}</p>}
            </div>
        <button class="btn btn-secondary" type="submit">Create Account</button>
        </form>
    </main>
  );
}