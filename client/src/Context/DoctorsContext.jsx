import React, { createContext, useEffect, useState } from "react";
import controller from "../Api/controllers";
import { endpoints } from "../Api/constants";

export const DoctorsContext = createContext(null);

const DoctorsProvider = ({ children }) => {
    const [doctors,setDoctors] =useState([]);
  const getAllDoctors = async () => {
    const {data} = await controller.getAllData(endpoints.doctors);
    setDoctors(data);
  };
  useEffect(() => {
    getAllDoctors();
  }, [])
  
  return (
    <>
      <DoctorsContext.Provider
        value={{ doctors }}
      >
        {children}
      </DoctorsContext.Provider>
    </>
  );
};

export default DoctorsProvider;
