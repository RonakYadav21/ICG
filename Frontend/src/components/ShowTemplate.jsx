import React, { useState, useEffect } from "react";
import api from "../utils/axios";

const ShowTemplate = () => {
  const getTemplate = () => {
    try {
      api.get(`/templates`).then((res) => {
        setTemplate(res.data);
      });
    } catch (error) {
      console.log("Error fetching templates:", error);
    }
  };
  useEffect(() => {
    getTemplate();
  }, []);

  const [template, setTemplate] = useState([]);
  return (
    <div>
      {template ? (
        template.map((temp) => (
          <div key={temp._id} className="border p-4 my-2">
            <h3 className="text-lg font-bold mb-2">{temp.name}</h3>
            <img
              src={temp.imageUrl}
              alt={temp.name}
              className="w-full h-auto"
            />
          </div>
        ))
      ) : (
        <p>No templates available.</p>
      )}
    </div>
  );
};

export default ShowTemplate;
