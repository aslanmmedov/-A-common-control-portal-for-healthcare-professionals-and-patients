import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import controller from "../../../../Api/controllers";
import { endpoints } from "../../../../Api/constants";
import { AuthContext } from "../../../../Context/AccesContext";
import { jwtDecode } from "jwt-decode";
import { FaUserDoctor } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { FiMessageCircle } from "react-icons/fi";
import "./index.scss";
import { DoctorsContext } from "../../../../Context/DoctorsContext";
import { HospitalsContext } from "../../../../Context/HospitalsContext";
import { NavLink } from "react-router-dom";
const KabinetDoctor = () => {
  const [open, setOpen] = React.useState(false);
  const { token, vezife, handleLogin, handleLogout } = useContext(AuthContext);
  const { doctors } = useContext(DoctorsContext);
  const { hospitals } = useContext(HospitalsContext);
  const [doctor, setDoctor] = useState([]);
  const [partner, setPartner] = useState({});
  const [hsptl, setHsptl] = useState({});
  const decoded = jwtDecode(token);

  const getDoctorById = async () => {
    const { data } = await controller.getDataById(
      endpoints.doctors,
      decoded.id
    );
    setDoctor(data);
  };
  // const prtner = doctors.find(
  //   (p) => p.departmentId === doctor.departmentId && p._id !== doctor._id
  // );

  // setPartner(prtner);
  // const hsptl = hospitals.find((h) => h._id === doctor.hospitalId);

  useEffect(() => {
    if (token) {
      getDoctorById();
    }
  }, []);

  useEffect(() => {
    if (doctor && doctors.length > 0) {
      const prtner = doctors.find(
        (p) => p.departmentId === doctor.departmentId && p._id !== doctor._id
      );
      setPartner(prtner);
    }

    if (doctor && hospitals.length > 0) {
      const foundHospital = hospitals.find((h) => h._id === doctor.hospitalId);
      setHsptl(foundHospital);
    }
  }, [doctor, doctors, hospitals]);

  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <main id="doctor_kabinet">
        <div className="container">
          <div className="sideBar">
            <div className="relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isOpen ? "0%" : "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className=" left-0 top-0  w-64 bg-white shadow-lg z-50 p-4"
              >
                <br />
                <ul className="space-y-4">
                  <li>
                    <button className="menu-btn">
                      Ümumi Nəzarət
                      <p>
                        <FaArrowRightLong />
                      </p>
                    </button>
                  </li>
                  <li>
                    <button className="menu-btn">
                      Pasiyentlər
                      <p>
                        <FaArrowRightLong />
                      </p>
                    </button>
                  </li>
                  <li>
                    <button className="menu-btn">
                      Müraciətlər
                      <p>
                        <FaArrowRightLong />
                      </p>
                    </button>
                  </li>
                  <li>
                    <button className="menu-btn">
                      Xəbərlər
                      <p>
                        <FaArrowRightLong />
                      </p>
                    </button>
                  </li>
                  <li>
                    <button className="menu-btn">
                      Bildirişlər
                      <p>
                        <FaArrowRightLong />
                      </p>
                    </button>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
          <div className="mainSec">
            <div className="row">
              <div className="col-7 col-md-12 col-sm-12">
                <div className="ownProfile">
                  <div className="imgName">
                    <div className="img">
                      {doctor.gender === "Kişi"?<img
                              src="https://pngimg.com/d/doctor_PNG15980.png"
                              alt=""
                            />:<img
                            src="https://purepng.com/public/uploads/thumbnail/purepng.com-doctordoctorsdoctors-and-nursesclinicianmedical-practitionernotepadfemale-1421526857221xttxe.png"
                            alt=""
                          />}
                    </div>
                    <h2>
                      {doctor.name} {doctor.surname} {doctor.fName} {doctor.gender === "Kişi"?"oğlu":"qızı"}
                    </h2>
                  </div>
                  <div className="about">
                    <p>
                      Vəzifə: <br /> <span>{doctor.duty}</span>
                    </p>
                    <p>
                      Email: <br />
                      <span>{doctor.email}</span>
                    </p>
                    <p>
                      İşə qəbul tarixi: <br />
                      <span>{doctor.dateOfEmployment}</span>
                    </p>
                    <p>
                      İş saatları: <br />
                      <span>{doctor.workHours}</span>
                    </p>
                    <p>
                      Poliklinika Adı: <br />
                      <span>{hsptl ? hsptl.name : null}ı</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-5 col-md-12 col-sm-12">
                {partner ? (
                  <div className="PR">
                    <div className="partnerProfile">
                      <div className="imgName">
                        <div className="img">
                          {partner.gender === "Kişi" ? (
                            <img
                              src="https://pngimg.com/d/doctor_PNG15980.png"
                              alt=""
                            />
                          ) : (
                            <img
                              src="https://purepng.com/public/uploads/thumbnail/purepng.com-doctordoctorsdoctors-and-nursesclinicianmedical-practitionernotepadfemale-1421526857221xttxe.png"
                              alt=""
                            />
                          )}
                        </div>
                        <h2>
                          {partner.name} {partner.surname} {partner.fName}{" "}
                          {partner.gender === "Kişi" ? "oğlu" : "qızı"}
                        </h2>
                      </div>
                      <div className="about">
                        <p>
                          Vəzifə: <br /> <span>{partner.duty} </span>
                        </p>
                        <p>
                          Email: <br />
                          <span>{partner.email}</span>
                        </p>
                        <p>
                          İş saatları: <br />
                          <span>{partner.workHours}</span>
                        </p>
                        <p>
                          Poliklinika Adı: <br />
                          <span>{hsptl ? hsptl.name : null}ı</span>
                        </p>
                      </div>
                    </div>
                    <div className="messageField">
                      <input type="text" placeholder="Mesaj əlavə edin.."/>
                      <button><FiMessageCircle /></button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default KabinetDoctor;
