import React, { createContext, useEffect, useState } from "react";
import controller from "../Api/controllers";
import { endpoints } from "../Api/constants";

export const PatientsContext = createContext(null);

const PatientsProvider = ({ children }) => {
    const [patients,setPatients] =useState([]);
  const getAllPatients = async () => {
    const {data} = await controller.getAllData(endpoints.patients);
    setPatients(data);
  };
  useEffect(() => {
    getAllPatients();
  }, [])
  
  return (
    <>
      <PatientsContext.Provider
        value={{ patients }}
      >
        {children}
      </PatientsContext.Provider>
    </>
  );
};

export default PatientsProvider;
