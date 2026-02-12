import React from 'react';
import '../app.css';

export function Home() {
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