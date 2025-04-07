import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedFilaments = () => {
  const [savedFilaments, setSavedFilaments] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const token = localStorage.getItem('token'); // adjust if you're using context/auth
        const res = await axios.get('/api/users/saved-filaments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSavedFilaments(res.data);
      } catch (err) {
        console.error('Failed to load saved filaments:', err);
      }
    };

    fetchSaved();
  }, []);

  return (
    <div>
      <h2>Your Saved Filaments</h2>
      {savedFilaments.length === 0 ? (
        <p>You haven’t saved any filaments yet.</p>
      ) : (
        <ul>
          {savedFilaments.map(filament => (
            <li key={filament._id}>
              <strong>{filament.name}</strong> - {filament.material}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedFilaments;