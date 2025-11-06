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
  console.log(template);
  return (
    <div>
      {template ? (
        template.map((temp) => (
          <div key={temp.id} className="border p-4 my-2">
            <div key={temp.id} className="border p-4 my-2">
              <h3 className="text-lg font-bold mb-2">{temp.name}</h3>
              <pre>{temp.elements}</pre>
            </div>
          </div>
        ))
      ) : (
        <p>No templates available.</p>
      )}
    </div>
  );
};

export default ShowTemplate;
