import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';

const FilamentCard = ({ filament }) => {
  const [isSaved, setIsSaved] = useState(false);
  const token = localStorage.getItem('token');

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
  }, [filament._id]);

  const toggleSave = async () => {
    try {
      if (!token) return;

      if (isSaved) {
        await axios.delete(`/api/users/unsave-filament/${filament._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`/api/users/save-filament/${filament._id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      // Toggle saved status
      setIsSaved(!isSaved);
    } catch (err) {
      console.error('Error toggling save state:', err);
    }
  };

  return (
    <div className="filament-card">
      <a href={`/filament/${filament._id}`} className="filament-link">
        <img 
          src={filament.image}
          alt={filament.name}
          className="filament-image"
          style={{ width: '200px', borderRadius: '5px' }}
        />
        <h3>{filament.name}</h3>
        <p>Brand: {filament.brand}</p>
        <p>Material: {filament.material}</p>
        <p>Rating: {"⭐".repeat(Math.round(filament.rating))}</p>
      </a>

      <FaHeart
        onClick={toggleSave}
        style={{
          cursor: 'pointer',
          color: isSaved ? 'red' : 'white',
          stroke: 'black',
          strokeWidth: 25,
          marginTop: '10px'
        }}
        size={24}
        title={isSaved ? "Unsave" : "Save"}
      />
    </div>
  );
};

export default FilamentCard;