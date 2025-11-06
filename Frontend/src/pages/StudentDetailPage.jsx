import React from "react";
import api from "../utils/axios";
const StudentDetailPage = () => {
  const StudentHandler = (e) => {
    api.get(`/student/by-course/${e}`).then((res) => {
      console.long("getting course...");
      console.log(res);
    });
  };
  return (
    <div>
      <ul className="flex gap-4 cursor-pointer">
        <li
          onClick={() => {
            StudentHandler("001");
          }}
        >
          MTech-IT
        </li>
        <li
          onClick={() => {
            StudentHandler("002");
          }}
        >
          MTech-CS
        </li>
        <li
          onClick={() => {
            StudentHandler("003");
          }}
        >
          MCA
        </li>
        <li
          onClick={() => {
            StudentHandler("004");
          }}
        >
          BCOM
        </li>
      </ul>
    </div>
  );
};

export default StudentDetailPage;
