import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

export function Friends() {
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');

        if (!currentUser) {
            navigate('/login');
            return;
        }

        const friendsList = JSON.parse(localStorage.getItem(`friends_${currentUser}`)) || [];
        setFriends(friendsList);
    }, []);

    function handleRemoveFriend(emailToRemove) {
        const currentUser = localStorage.getItem('currentUser');

        const updatedFriends = friends.filter((friend) => friend.email !== emailToRemove);

        localStorage.setItem(`friends_${currentUser}`, JSON.stringify(updatedFriends));
        setFriends(updatedFriends);
    }

  return (
    <main>
    <h2>Your Friends</h2>
        {friends.length > 0 ? (
            <ul>
            {friends.map((friend) => (
            <li key={friend.email}>
                <strong>{friend.name}</strong> - {friend.city}
                <button className="btn btn-danger btn-sm mx-2" onClick={() => handleRemoveFriend(friend.email)}>Unfriend</button>
            </li>
            ))}
            </ul>
        ) : (
            <p>You haven't added any friends yet!</p>
        )}
      </main>
  );
}