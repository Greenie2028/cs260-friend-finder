import React from 'react';

export function Create() {
  return (
    <main>
      <h3>Create account</h3>
        <form method="get" action="home.html">
            <div class="form">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="varEmail"></input>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="varPassword"></input>
            </div>
            <div>
                <label for="confirm_pass">Confirm Password: </label>
                <input type="password" id="confirm_pass" name="confirmPassword"></input>
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name"></input>
            </div>
            <div>
            <label for="city">City:</label>
            <input type="text" id="city" name="city"></input>
            </div>
            <div>
            <label for="phone_num">Phone #: (Optional)</label>
            <input type="tel" id="phone_num" name="phone"></input>
            </div>
            <div>
            <label for="photo_id">Profile Photo</label>
            <input type="file" id="photo_id" name="photo"></input>
            </div>
            </div>
        <button class="btn btn-secondary" type="submit">Create Account</button>
        </form>
    </main>
  );
}