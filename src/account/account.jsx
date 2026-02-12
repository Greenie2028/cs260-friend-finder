import React from 'react';

export function Account() {
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