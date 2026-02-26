import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import '../app.css';

export function Home() {
    const [matches, setMatches] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect (() => {
        const currentUser = localStorage.getItem('currentUser');

        if(!currentUser) {
            navigate('/login');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || {};
        const myData = users[currentUser];

        const cityMatches = Object.entries(users).filter(([email, data]) => {
            return email !== currentUser && data.city === myData.city;
        })
    })

  return (
    <main>
        <div class="user_info">
        <h3>Friend Name</h3>
        <img src="placeholder.png" height="300px" width="275px" alt="Profile Picture"></img>
        {/* I will pull location data finding nearby towns, not just the exact same town */}
        <p>Note: I will use location data from a third party 
            such as google to find nearby towns to the user</p>
        <h8>Friend City</h8>
        </div>
        <div class="hobbies">
        <p><b>Hobbies</b></p>
        <ul>
            <li>Hobby</li>
            <li>Hobby</li>
            <li>Hobby</li>
            <li>Hobby</li>
            <li>Hobby</li>
        </ul>
        </div>
        <div>
            <form>
                <button class="btn btn-primary btn-sm" type="button">Not for me</button>
                <button class="btn btn-primary btn-sm" type="button">Add Friend!!</button>
            </form>
        </div>
        </main>
  );
}