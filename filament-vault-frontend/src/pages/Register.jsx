/**
 * Auth component that handles user register functionality.
 * Sends user credentials to backend and stores JWT upon success.
 */

import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token to localStorage (or sessionStorage)
        localStorage.setItem('token', data.token); // or sessionStorage.setItem

        alert('Registration successful!');
        window.location.href = '/'; // to homepage after registration is successsful
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

