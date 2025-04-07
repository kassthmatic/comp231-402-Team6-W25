import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';

const FilamentCard = ({ filament }) => {
  const [isSaved, setIsSaved] = useState(false);
  const token = localStorage.getItem('token');

  // Check if filament is already saved
  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const res = await axios.get('/api/users/saved-filaments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const savedIds = res.data.map(f => f._id);
        setIsSaved(savedIds.includes(filament._id));
      } catch (err) {
        console.error('Could not load saved filaments', err);
      }
    };

    if (token) checkIfSaved();
  }, [filament._id]); // run once when this component loads

  // Toggle save/remove
  const toggleSave = async () => {
    try {
      if (!token) return;

      if (isSaved) {
        await axios.delete(`/api/users/unsave-filament/${filament._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsSaved(false);
      } else {
        await axios.post(`/api/users/save-filament/${filament._id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Error saving filament:', err);
    }
  };

  return (
    <div className="filament-card">
      <h3>{filament.name}</h3>
      <p>{filament.material}</p>
      <FaHeart
        onClick={toggleSave}
        style={{
          cursor: 'pointer',
          color: isSaved ? 'red' : 'white',
          stroke: 'black',
          strokeWidth: 25
        }}
        title={isSaved ? 'Remove from favorites' : 'Add to favorites'}
        size={24}
      />
    </div>
  );
};

export default FilamentCard;