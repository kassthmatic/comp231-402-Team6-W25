import { useState, useEffect } from "react";
import axios from "axios";

const FilamentList = () => {
  const [filaments, setFilaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/filaments")
      .then((response) => {
        setFilaments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching filaments:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading filaments...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Filament List</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filaments.length > 0 ? (
          filaments.map((filament) => (
            <div key={filament._id} className="border p-3 rounded shadow-md">
              <img src={filament.image} alt={filament.name} className="w-full h-32 object-cover" />
              <h3 className="font-semibold mt-2">{filament.name}</h3>
              <p className="text-sm">Type: {filament.type}</p>
              <p className="text-sm">Color: {filament.color}</p>
              <p className="text-sm">Rating: ⭐ {filament.rating}</p>
            </div>
          ))
        ) : (
          <p>No filaments found.</p>
        )}
      </div>
    </div>
  );
};

export default FilamentList;