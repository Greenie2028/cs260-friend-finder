import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

export function Account({ setIsLoggedIn} ) {
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
      setHobbies(user.hobbies || '');
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
      setIsLoggedIn(false);
      navigate('/login');
    }

    if (!userData) return null;

  return (
    <main>
      {editing ? (
        <div className='form'>
          <h3>Edit Profile</h3>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)}/>
          <label htmlFor="hobbies">Hobbies (comma seperated):</label>
          <input type="text" id="hobbies" placeholder="Hiking, Reading, Biking" value={hobbies} onChange={(e) => setHobbies(e.target.value)}/>
          <button className="btn-primary btn-sm" onClick={handleSave}>Save</button>
          <button className="btn-secondary btn-sm" onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
      <>
      <h3>{userData.name}</h3>
        <div>
            <img src="hkplaceholder.jpg" height="300px" width="275px" alt="Profile Picture"></img>
        </div>
          <h6>{userData.city}</h6>
          <p>{localStorage.getItem('currentUser')}</p>
          <div className="hobbies">
          <p><strong>My Hobbies</strong></p>
          <ul>
             {userData.hobbies ? userData.hobbies.split(',').map((hobby, index) => 
             (<li key={index}>{hobby.trim()}</li>)) : <li>No hobbies added yet</li>}
          </ul>
          </div>
        <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}>Edit Profile</button>
        <br/>
        <button className="btn btn-danger btn-sm" onClick={handleSignOut}>Sign Out</button>
        </>
        )}
    </main> 
  );
}