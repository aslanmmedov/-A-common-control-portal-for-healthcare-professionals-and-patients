import React, { createContext, useEffect, useState } from "react";
import controller from "../Api/controllers";
import { endpoints } from "../Api/constants";

export const HospitalsContext = createContext(null);

const HospitalsProvider = ({ children }) => {
    const [hospitals,setHospitals] =useState([]);
  const getAllHospitals = async () => {
    const {data} = await controller.getAllData(endpoints.hospitals);
    setHospitals(data);
  };
  useEffect(() => {
    getAllHospitals();
  }, [])
  
  return (
    <>
      <HospitalsContext.Provider
        value={{ hospitals }}
      >
        {children}
      </HospitalsContext.Provider>
    </>
  );
};

export default HospitalsProvider;
