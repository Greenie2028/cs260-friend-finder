import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

export function Account() {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [hobbies, setHobbies] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
      navigate('/login');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};
    const user = users[currentUser];

    if (user) {
      setUserData(user);
      setName(user.name || '');
      setCity(user.city || '');
      setHobbies(user.city || '');
    }
  }, [])

    function handleSave() {
      const currentUser = localStorage.getItem("currentUser");
      const users = JSON.parse(localStorage.getItem("users")) || {};

      users[currentUser] = { ...users[currentUser], name, city, hobbies };
      localStorage.setItem('users', JSON.stringify(users));

      setUserData(users[currentUser]);
      setEditing(false);
    }

    function handleSignOut() {
      localStorage.removeItem('currentUser');
      navigate('/login');
    }

  return (
    <main>
      <h3>User Name</h3>
        <div>
            <img src="placeholder.png" height="300px" width="275px" alt="Profile Picture"></img>
        </div>
        <h8>User Hometown</h8>
        <p>placeholder@place.com</p>
        <p>123-456-7890</p>
        <div className="hobbies"></div>
        <p><strong>My Hobbies</strong></p>
        <ul>
            <li>Hobby</li>
            <li>Hobby</li>
            <li>Hobby</li>
            <li>Hobby</li>
            <li>Hobby</li>
        </ul>
        <button className="btn btn-secondary btn-large" type="button" id="profile_button">Edit Profile</button>
    </main> 
  );
}