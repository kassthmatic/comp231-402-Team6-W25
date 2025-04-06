import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const Compare = () => {
  const [searchParams] = useSearchParams();
  const [filaments, setFilaments] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const idsParam = searchParams.get("ids");
    if (!idsParam) return;

    const ids = idsParam.split(",");
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          ids.map((id) =>
            axios.get(`http://localhost:5000/api/filaments/${id}`)
          )
        );
        setFilaments(responses.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching filaments:", error);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="compare-container">
      <div className="compare-content">
        <h1 className="compare-title">Filament Comparison</h1>
        {filaments.length < 2 ? (
          <p style={{ color: "white" }}>
            Select at least two filaments to compare.
          </p>
        ) : (
          <div className="compare-grid">
            {filaments.map((f) => (
              <Link
              to={`/filament/${f._id}`}
              key={f._id}
              className="compare-card-link"
            >
              <div className="compare-card">
                <img
                  src={f.image}
                  alt={f.name}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <h2>{f.name}</h2>
                <p><strong>Brand:</strong> {f.brand}</p>
                <p><strong>Material:</strong> {f.material}</p>
                <p><strong>Printing Temp:</strong> {f.printing_temperature}</p>
                <p><strong>Enclosure Required:</strong> {f.enclosure_required}</p>
                <p><strong>Available Colours:</strong> {f.available_colours.join(", ")}</p>
              </div>
            </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );   
};

export default Compare;
