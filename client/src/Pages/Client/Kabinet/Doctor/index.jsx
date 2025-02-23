import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../../../Context/AccesContext";
import { DoctorsContext } from "../../../../Context/DoctorsContext";
import { HospitalsContext } from "../../../../Context/HospitalsContext";
import controller from "../../../../Api/controllers";
import { endpoints } from "../../../../Api/constants";
import "./index.scss";

const KabinetDoctor = () => {
  const { token } = useContext(AuthContext);
  const { doctors } = useContext(DoctorsContext);
  const { hospitals } = useContext(HospitalsContext);

  const [doctor, setDoctor] = useState(null);
  const [partner, setPartner] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [patient, setPatient] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!token) return;

    const decoded = jwtDecode(token);

    const fetchData = async () => {
      try {
        const [doctorRes, patientRes] = await Promise.all([
          controller.getDataById(endpoints.doctors, decoded.id),
          controller.getDataById(
            endpoints.patients,
            "67ba598a85079d8be9f489c0"
          ),
        ]);

        setDoctor(doctorRes.data);
        setPatient(patientRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (doctor && doctors.length > 0) {
      setPartner(
        doctors.find(
          (p) => p.departmentId === doctor.departmentId && p._id !== doctor._id
        ) || null
      );
    }

    if (doctor && hospitals.length > 0) {
      setHospital(hospitals.find((h) => h._id === doctor.hospitalId) || null);
    }
  }, [doctor, doctors, hospitals]);

  return (
    <main id="doctor_kabinet">
      <div className="container">
        <div className="head">
          <div className="sideBar">
            <div className="relative">
              <div className="btnOpen">
              <button onClick={()=>{isOpen === true?setIsOpen(false):setIsOpen(true)}}>Close</button>
              </div>
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isOpen ? "0%" : "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="left-0 top-0 w-64 bg-white shadow-lg z-50 p-4"
              >
                <ul className="space-y-4">
                  {[
                    "Ümumi Nəzarət",
                    "Pasiyentlər",
                    "Müraciətlər",
                    "Xəbərlər",
                    "Bildirişlər",
                  ].map((item) => (
                    <li key={item}>
                      <button className="menu-btn">
                        {item} <FaArrowRightLong />
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
          <div className="mainSec">
            <div className="row">
              {/* Doctor Profile */}
              <div className="col-7 col-md-12 col-sm-12">
                <div className="ownProfile">
                  <div className="imgName">
                    <div className="img">
                      <img
                        src={
                          doctor?.gender === "Kişi"
                            ? "https://pngimg.com/d/doctor_PNG15980.png"
                            : "https://purepng.com/public/uploads/thumbnail/purepng.com-doctordoctorsdoctors-and-nursesclinicianmedical-practitionernotepadfemale-1421526857221xttxe.png"
                        }
                        alt="Doctor"
                      />
                    </div>
                    <h2>
                      {doctor?.name} {doctor?.surname} {doctor?.fName}{" "}
                      {doctor?.gender === "Kişi" ? "oğlu" : "qızı"}
                    </h2>
                  </div>
                  <div className="about">
                    <p>
                      Vəzifə: <span>{doctor?.duty || "N/A"}</span>
                    </p>
                    <p>
                      Email: <span>{doctor?.email || "N/A"}</span>
                    </p>
                    <p>
                      İşə qəbul tarixi:{" "}
                      <span>{doctor?.dateOfEmployment || "N/A"}</span>
                    </p>
                    <p>
                      İş saatları: <span>{doctor?.workHours || "N/A"}</span>
                    </p>
                    <p>
                      Poliklinika Adı: <span>{hospital?.name || "N/A"}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Partner Profile */}
              {partner && (
                <div className="col-5 col-md-12 col-sm-12">
                  <div className="PR">
                    <div className="partnerProfile">
                      <div className="imgName">
                        <div className="img">
                          <img
                            src={
                              partner.gender === "Kişi"
                                ? "https://pngimg.com/d/doctor_PNG15980.png"
                                : "https://purepng.com/public/uploads/thumbnail/purepng.com-doctordoctorsdoctors-and-nursesclinicianmedical-practitionernotepadfemale-1421526857221xttxe.png"
                            }
                            alt="Partner"
                          />
                        </div>
                        <h2>
                          {partner.name} {partner.surname} {partner.fName}{" "}
                          {partner.gender === "Kişi" ? "oğlu" : "qızı"}
                        </h2>
                      </div>
                      <div className="about">
                        <p>
                          Vəzifə: <span>{partner.duty || "N/A"}</span>
                        </p>
                        <p>
                          Email: <span>{partner.email || "N/A"}</span>
                        </p>
                        <p>
                          İş saatları: <span>{partner.workHours || "N/A"}</span>
                        </p>
                        <p>
                          Poliklinika Adı:{" "}
                          <span>{hospital?.name || "N/A"}</span>
                        </p>
                      </div>
                    </div>
                    <div className="messageField">
                      <input type="text" placeholder="Mesaj əlavə edin.." />
                      <button>
                        <FiMessageCircle />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="body">
          {/* <br />
          {patient?.checkupHistory?.length > 0 ? (
            <ul>
              {patient.checkupHistory.map((checkup, index) => (
                <li key={index}>
                  <p><strong>Date:</strong> {checkup.date || "N/A"}</p>
                  <p><strong>Diagnosis:</strong> {checkup.diagnosis || "N/A"}</p>
                  <p><strong>Doctor ID:</strong> {checkup.doctorId || "N/A"}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No checkup history available.</p>
          )} */}
        <div className="row">
          <div className="col-6 col-md-12 col-sm-12">
            <div className="vaccineGraph">
              
            </div>
          </div>
          <div className="col-6 col-md-12 col-sm-12"></div>
        </div>
        </div>
      </div>
    </main>
  );
};

export default KabinetDoctor;
