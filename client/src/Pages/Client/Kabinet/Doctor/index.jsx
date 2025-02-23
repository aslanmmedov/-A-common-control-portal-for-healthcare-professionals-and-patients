import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../../../Context/AccesContext";
import { DoctorsContext } from "../../../../Context/DoctorsContext";
import { HospitalsContext } from "../../../../Context/HospitalsContext";
import controller from "../../../../Api/controllers";
import { IoIosNotificationsOutline } from "react-icons/io";
import { endpoints } from "../../../../Api/constants";
import { CgDanger } from "react-icons/cg";
import "./index.scss";

const KabinetDoctor = () => {
  const { token } = useContext(AuthContext);
  const { doctors } = useContext(DoctorsContext);
  const { hospitals } = useContext(HospitalsContext);

  const [doctor, setDoctor] = useState(null);
  const [partner, setPartner] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [news, setNews] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!token) return;

    const decoded = jwtDecode(token);

    const fetchData = async () => {
      try {
        const [doctorRes, doctorNews, ntfctions] = await Promise.all([
          controller.getDataById(endpoints.doctors, decoded.id),
          controller.getAllData(endpoints.d_news),
          controller.getAllData(endpoints.notifications),
        ]);

        setDoctor(doctorRes.data);
        setNews(doctorNews.data);
        setNotifications(ntfctions.data);
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
        <div className="sideBar">
          <div className="relative">
            <div className="btnOpen">
              <button
                onClick={() => {
                  isOpen === true ? setIsOpen(false) : setIsOpen(true);
                }}
              >
                Close
              </button>
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
                    <button className="menu-btn">{item}</button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="headDoctorKabinet">
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
                      Poliklinika Adı: <span>{hospital?.name || "N/A"}ı</span>
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
        <div className="bodyDoctorKabinet">
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
              <div className="newsDoctor">
                <h2>Xəbərlər</h2>
                {news ? (
                  news.map((n) => (
                    <div className="news" key={n._id}>
                      <div className="content">
                        <div className="img">
                          <img src={n.image} alt={n.name} />
                        </div>
                        <div className="text">
                          <p>{n.name}</p>
                        </div>
                      </div>
                      <div className="actions">
                        <button className="btnAction">Detallar</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Heç bir xəbər yoxdur</p>
                )}
              </div>
            </div>
            <div className="col-6 col-md-12 col-sm-12">
              <div className="notificationDoctor">
                <h2>Bildirişlər</h2>
                {notifications ? (
                  notifications.map((n) =>
                    n.hospitalId === hospital?._id ? (
                      <div className="notif" key={n._id}>
                        <div className="content">
                          <div className="text">
                            <p>
                              {n.type === "All" ? (
                                <i>
                                  <CgDanger />
                                </i>
                              ) : (
                                <i className="sec">
                                  <IoIosNotificationsOutline />
                                </i>
                              )}
                              {n.name}
                            </p>
                          </div>
                        </div>
                        <div
                          className={n.type === "All" ? "actions" : "personal"}
                        >
                          <p className="btnAction">
                            {n.type === "All" ? "Hərkəs" : `${n.type}`}
                          </p>
                        </div>
                      </div>
                    ) : null
                  )
                ) : (
                  <p>Heç bir bildiriş yoxdur</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default KabinetDoctor;
