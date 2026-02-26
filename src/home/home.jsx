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
        });
        setMatches(cityMatches);}, []);

        function handleAddFriend() {
            const currentUser = localStorage.getItem('currentUser');
            const [friendEmail, friendData] = matches[currentIndex];

            const friends = JSON.parse(localStorage.getItem(`friends_${currentUser}`)) || [];

            friends.push({ email: friendEmail, ...friendData});
            localStorage.setItem(`friends_${currentUser}`, JSON.stringify(friends));

            toast.success(`${friendData.name} added as a friend!`);

            setCurrentIndex((prev) => prev + 1);
        }

        function handleNotForMe() {
            setCurrentIndex((prev) => prev + 1);
        }

        const currentMatch = matches[currentIndex];

  return (
    <main>
        <Toaster position="top-center"/>

        {currentMatch ? (
        <>
        <div class="user_info">
        <h3>{currentMatch[1].name}</h3>
        <img src="placeholder.png" height="300px" width="275px" alt="Profile Picture"></img>
        <h6>{currentMatch[1].city}</h6>
        </div>
        <div class="hobbies">
        <p><b>Hobbies</b></p>
        <ul>
            {currentMatch[1].hobbies ? currentMatch[1].hobbies.split('').map((hobby, index) => (
                <li key={index}>{hobby.trim()}</li>
            )) : <li>No hobbies listed</li>}
        </ul>
        </div>
        <div>
            <button className="btn btn-danger btn-sm mx-2" onClick={handleNotForMe}>Not for me</button>
            <button className="btn btn-success btn-sm mx-2" onClick={handleAddFriend}>Add Friend!!</button>
        </div>
        </>
        ) : (
            <div>
                <h4>No more matches in your area!</h4>
                <p>Check back later or update your city in your account settings.</p>
            </div>
        )}
        </main>
  );
}