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

        fetch('/api/matches')
        .then(res => {
            if (!res.ok) { navigate('/login'); return null; }
            return res.json();
        })
        .then(data => { if (data) setMatches(data); });
    }, []);

    async function handleAddFriend() {
        const friendData = matches[currentIndex];
        await fetch('/api/friends', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(friendData),
        });
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
        <div className="user_info">
        <h3>{currentMatch.name}</h3>
        <img src="hornetplaceholder.jpeg" height="300px" width="275px" alt="Profile Picture"></img>
        <h6>{currentMatch.city}</h6>
        </div>
        <div className="hobbies">
        <p><b>Hobbies</b></p>
        <ul>
            {currentMatch.hobbies ? currentMatch.hobbies.split(',').map((hobby, index) => (
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