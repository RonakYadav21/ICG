import React from "react";
import api from "../utils/axios";
const StudentDetailPage = () => {
  const StudentHandler = (e) => {
    api.get(`/students/by-course/${e}`).then((res) => {
        console.log(res.data);
    })
    
  };
  return (
    <div>
      <ul className="flex gap-4">
        <li
          onClick={() => {
            StudentHandler("MTech-IT");
          }}
        >
          MTech-IT
        </li>
        <li
          onClick={() => {
            StudentHandler("MTech-IT");
          }}
        >
          MTech-CS
        </li>
        <li
          onClick={() => {
            StudentHandler("Mca");
          }}
        >
          MCA
        </li>
        <li
          onClick={() => {
            StudentHandler("Bcom");
          }}
        >
          BCOM
        </li>
      </ul>
    </div>
  );
};

export default StudentDetailPage;
