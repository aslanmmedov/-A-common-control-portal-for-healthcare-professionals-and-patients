import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../../../Context/AccesContext";
import { DoctorsContext } from "../../../../Context/DoctorsContext";
import { HospitalsContext } from "../../../../Context/HospitalsContext";
import controller from "../../../../Api/controllers";
import { IoIosNotificationsOutline } from "react-icons/io";
import { endpoints, WWP_URL } from "../../../../Api/constants";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { CgDanger } from "react-icons/cg";
import "./index.scss";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { MdOutlineDoNotDisturb } from "react-icons/md";
import { PatientsContext } from "../../../../Context/PatientsContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";


const KabinetPatient = () => {
  const { token } = useContext(AuthContext);
  const { doctors } = useContext(DoctorsContext);
  const { hospitals } = useContext(HospitalsContext);
  const { patients } = useContext(PatientsContext);

  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [currentPresc, setCurrentPresc] = useState(null);
  const [partner, setPartner] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [Page, setPage] = useState("ÜN");
  
  useEffect(() => {
    if (!token) return;

    const decoded = jwtDecode(token);

    const fetchData = async () => {
      try {
        const [patientRes] = await Promise.all([
          controller.getDataById(endpoints.patients, decoded.id),
        ]);

        setPatient(patientRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);
  useEffect(() => {
    if (patient && doctors.length > 0) {
      setDoctor(doctors.find((p) => p._id === patient.doctorId) || null);
    }

    if (doctor && hospitals.length > 0) {
      setHospital(hospitals.find((h) => h._id === doctor.hospitalId) || null);
    }
    if (doctor && doctors.length > 0) {
      setPartner(
        doctors.find(
          (h) => h.departmentId === doctor.departmentId && doctor._id !== h._id
        ) || null
      );
    }
  }, [doctor, doctors, hospitals, partner, patients, patient]);

  const AddAppealSchema = Yup.object().shape({
    appeal: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  });
  const AddMessageSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  const deleteAppeal = async (id) => {
    await controller.editDataById(endpoints.ap, patient._id, id);
  };
  // const handlePatient = (id) => {
  //   console.log("id",id);
  //   if(matchPatients){
  //     console.log("match",matchPatients);
  //     const found = matchPatients.filter((p) => {
  //       p._id !== id;
  //     })
  //     console.log("found",found);

  //     setCurrentPatient(found)
  //   }
  //   console.log("current",currentPatient);

  // }
  const handleDoctor = (id) => {
    const found = doctors.find((p) => p._id === id);
    setCurrentDoctor(found && found);
  };
  const handlePresc = (id) => {
    const found = patient.prescriptions.find((p) => p._id === id);
    setCurrentPresc(found && found);
  };
  return (
    <main id="patient_kabinet">
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
                <li>
                  <button
                    className={
                      Page === "ÜN" ? "menu-btn menu-btn-i" : "menu-btn"
                    }
                    onClick={() => {
                      setPage("ÜN");
                    }}
                  >
                    Ümumi Nəzarət
                  </button>
                </li>
                <li>
                  <button
                    className={
                      Page === "HE" ? "menu-btn menu-btn-i" : "menu-btn"
                    }
                    onClick={() => {
                      setPage("HE");
                    }}
                  >
                    Həkimlər
                  </button>
                </li>
                <li>
                  <button
                    className={
                      Page === "NO" ? "menu-btn menu-btn-i" : "menu-btn"
                    }
                    onClick={() => {
                      setPage("NO");
                    }}
                  >
                    Müraciətlər
                  </button>
                </li>
                <li>
                  <button
                    className={
                      Page === "PR" ? "menu-btn menu-btn-i" : "menu-btn"
                    }
                    onClick={() => {
                      setPage("PR");
                    }}
                  >
                    e-Resept
                  </button>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
      {Page === "ÜN" && (
        <div className="container">
          <div className="contentPatients">
            <div className="paBody">
              {patient !== null ? (
                <div className="paInside">
                  <div className="patientInfo">
                    <div className="ownProfile">
                      <div className="imgName">
                        <div className="img">
                          <img
                            src={
                              patient?.gender === "Kişi"
                                ? "https://images.unsplash.com/photo-1617331140180-e8262094733a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym95JTIwYmFieXxlbnwwfHwwfHx8MA%3D%3D"
                                : "https://i.etsystatic.com/9170477/r/il/86d30b/3632967475/il_570xN.3632967475_qjw6.jpg"
                            }
                            alt="Doctor"
                          />
                        </div>
                        <h2>
                          {patient?.name} {patient?.surname} {patient?.fName}{" "}
                          {patient?.gender === "Kişi" ? "oğlu" : "qızı"}
                        </h2>
                      </div>
                      <div className="about">
                        <p>
                          Ata adı: <span>{patient?.fName || "N/A"}</span>
                        </p>
                        <p>
                          Ana adı: <span>{patient?.mName || "N/A"}</span>
                        </p>
                        <p>
                          Email: <span>{patient?.email || "N/A"}</span>
                        </p>
                        <p>
                          Poliklinika Adı:{" "}
                          <span>{hospital?.name || "N/A"}ı</span>
                        </p>
                        <p>
                          Həkim:{" "}
                          <span>
                            {doctor?.name || "N/A"} {doctor?.surname || "N/A"}
                          </span>
                        </p>
                        <p>
                          Doğum tarixi:{" "}
                          <span>
                            {new Date(
                              `${patient?.birthday}`
                            ).toLocaleDateString("en-Us", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }) || "N/A"}
                          </span>
                        </p>
                        <p>
                          Şəhadətname kodu:{" "}
                          <span>{patient?.shadetname || "N/A"}</span>
                        </p>
                        <p>
                          Əlaqə nömrəsi:{" "}
                          <span>{patient?.phoneNumber || "N/A"}</span>
                        </p>
                        <p>
                          Cinsiyyət: <span>{patient?.gender || "N/A"}</span>
                        </p>
                      </div>
                    </div>
                    <div className="vaccineGraph">
                      <div className="pProfile">
                        <div className="head">
                          <h2>Peyvənd Cədvəli</h2>
                        </div>
                        <div className="about">
                          <ul>
                            {patient &&
                              patient.vaccines?.map((v) => (
                                <li key={v._id}>
                                  <p>{v.name}</p>
                                  <i>
                                    {v.status === true ? (
                                      <FaRegCheckCircle
                                        style={{ color: "green" }}
                                      />
                                    ) : (
                                      <MdOutlineDoNotDisturb
                                        style={{ color: "red" }}
                                      />
                                    )}
                                  </i>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="x">
                    <div className="checkUpGraph">
                      <div className="cProfile">
                        <div className="head">
                          <h2>Müayinə tarixçəsi</h2>
                        </div>
                        <div className="about">
                          <ul>
                            {patient &&
                              patient.checkupHistory?.map((v) => (
                                <li key={v._id}>
                                  <p>
                                    <span>Diaqnoz</span>: {v.diagnosis}
                                  </p>
                                  <p>
                                    <span>Həkim</span>:{" "}
                                    <>
                                      {doctor?.name || "N/A"}{" "}
                                      {doctor?.surname || "N/A"}
                                    </>
                                  </p>
                                  <p>
                                    <span>Tarix</span>:{" "}
                                    {new Date(`${v.date}`).toLocaleDateString(
                                      "en-Us",
                                      {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      }
                                    ) || "N/A"}
                                  </p>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="checkUpGraph">
                      <div className="cProfile">
                        <div className="head">
                          <h2>Müraciətlər</h2>
                        </div>
                        <div className="about">
                          <ul>
                            {patient &&
                              patient.appeals?.map((v) => (
                                <li key={v._id}>
                                  <p>
                                    <span>Müraciət</span>: {v.appeal}
                                  </p>
                                  <p>
                                    <span>Status: </span>:{v.status}
                                    {v.status === "Təsiq" ? (
                                      <FaRegCheckCircle
                                        style={{
                                          color: "green",
                                          marginLeft: "10px",
                                        }}
                                      />
                                    ) : (
                                      <IoMdInformationCircleOutline
                                        style={{
                                          color: "yellow",
                                          marginLeft: "10px",
                                        }}
                                      />
                                    )}
                                  </p>
                                  <p>
                                    <span>Tarix</span>:{" "}
                                    {new Date(`${v.date}`).toLocaleDateString(
                                      "en-Us",
                                      {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      }
                                    ) || "N/A"}
                                  </p>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="errorMesage">Pasiyent Seçilməyib</p>
              )}
            </div>
          </div>
        </div>
      )}
      {Page === "HE" && (
        <div className="container">
          <div className="contentPatients">
            <div className="sider">
              {patient && doctor && (
                <div className="patient">
                  <div className="first">
                    <div className="icon">
                      <BsFillPersonCheckFill />
                    </div>
                    <div className="text">
                      <p>
                        {doctor.name} {doctor.surname} {doctor.fName}{" "}
                        {doctor.gender === "Kişi" ? "oğlu" : "qızı"}
                      </p>
                    </div>
                    <div className="btn">
                      <button
                        onClick={() => {
                          handleDoctor(doctor._id);
                        }}
                      >
                        Bax...
                      </button>
                    </div>
                  </div>
                  <div className="first">
                    <div className="icon">
                      <BsFillPersonCheckFill />
                    </div>
                    <div className="text">
                      <p>
                        {partner?.name} {partner?.surname} {partner?.fName}{" "}
                        {partner?.gender === "Kişi" ? "oğlu" : "qızı"}
                      </p>
                    </div>
                    <div className="btn">
                      <button
                        onClick={() => {
                          handleDoctor(partner._id);
                        }}
                      >
                        Bax...
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="paBody">
              {currentDoctor !== null ? (
                <div className="paInside">
                  <div className="patientInfo">
                    <div className="ownProfile">
                      <div className="imgName">
                        <div className="img">
                          <img
                            src={
                              currentDoctor?.gender === "Kişi"
                                ? "https://images.unsplash.com/photo-1620928269189-dc4ee9d981c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9jdG9yfGVufDB8fDB8fHww"
                                : "https://purepng.com/public/uploads/thumbnail/purepng.com-doctordoctorsdoctors-and-nursesclinicianmedical-practitionernotepadfemale-1421526857221xttxe.png"
                            }
                            alt="Doctor"
                          />
                        </div>
                        <h2>
                          {currentDoctor?.name} {currentDoctor?.surname}{" "}
                          {currentDoctor?.fName}{" "}
                          {currentDoctor?.gender === "Kişi" ? "oğlu" : "qızı"}
                        </h2>
                      </div>
                      <div className="about">
                        <p>
                          Ata adı: <span>{currentDoctor?.fName || "N/A"}</span>
                        </p>
                        <p>
                          Email: <span>{currentDoctor?.email || "N/A"}</span>
                        </p>
                        <p>
                          Poliklinika Adı:{" "}
                          <span>{hospital?.name || "N/A"}ı</span>
                        </p>
                        <p>
                          Doğum tarixi:{" "}
                          <span>{currentDoctor?.birthday || "N/A"}</span>
                        </p>
                        <p>
                          Əlaqə nömrəsi:{" "}
                          <span>{currentDoctor?.phoneNumber || "N/A"}</span>
                        </p>
                        <p>
                          Cinsiyyət:{" "}
                          <span>{currentDoctor?.gender || "N/A"}</span>
                        </p>
                      </div>
                      <div className="sendNotifcation">
                        <h2>Mesaj Əlavə edin</h2>
                        <div className="form">
                          <Formik
                            initialValues={{
                              name: "",
                            }}
                            validationSchema={AddMessageSchema}
                            onSubmit={async (values) => {
                              // const data = await controller.addNewData(
                              //   endpoints.,
                              //   values
                              // );
                            }}
                          >
                            {({ errors, touched }) => (
                              <Form>
                                <Field
                                  name="name"
                                  placeholder="Bildiriş mətnini daxil edin"
                                />
                                {errors.name && touched.name ? (
                                  <div>{errors.name}</div>
                                ) : null}
                                <button type="submit">Əlavə et</button>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="errorMesage">Həkim Seçilməyib</p>
              )}
            </div>
          </div>
        </div>
      )}
      {Page === "NO" && (
        <div className="container">
          <div className="NewsO">
            <div className="a">
              <h1>Müraciətlər</h1>
              <div className="row">
                {patient.appeals ? (
                  patient.appeals
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((n) => (
                      <div className="col-12 col-md-12 col-sm-12" key={n._id}>
                        <div className="notif">
                          <div className="content">
                            <div className="text">
                              <p>
                                {n.status === "Təsiq" ? (
                                  <i>
                                    <FaRegCircleCheck />
                                  </i>
                                ) : (
                                  <i className="sec">
                                    <IoIosNotificationsOutline />
                                  </i>
                                )}
                                {n.appeal}
                              </p>
                            </div>
                          </div>
                          <div
                            className={
                              n.type === "All" ? "actions" : "personal"
                            }
                          >
                            <button
                              onClick={() => {
                                deleteAppeal(n._id);
                              }}
                            >
                              Silin
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p>Heç bir bildiriş yoxdur</p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {patient && (
                  <div className="sendNotifcation">
                    <h2>Müraciət Əlavə edin</h2>
                    <div className="form">
                      <Formik
                        initialValues={{
                          appeal: "",
                        }}
                        validationSchema={AddAppealSchema}
                        onSubmit={async (values) => {
                          const data = await controller.editDataById(
                            endpoints.ap,
                            patient._id,
                            values
                          );
                        }}
                      >
                        {({ errors, touched }) => (
                          <Form>
                            <Field
                              name="appeal"
                              placeholder="Bildiriş mətnini daxil edin"
                            />
                            {errors.appeal && touched.appeal ? (
                              <div>{errors.appeal}</div>
                            ) : null}
                            <button type="submit">Əlavə et</button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {Page === "PR" && (
        <div className="container">
          <div className="contentPatients">
            <div className="sider">
              {patient &&
                patient.prescriptions?.map((p) => (
                  <div className="patient" key={p._id}>
                    <div className="first">
                      <div className="icon">
                        <BsFillPersonCheckFill />
                      </div>
                      <div className="text">
                        <p>{p.date.slice(0, 10)}</p>
                      </div>
                    </div>
                    <div className="btn">
                      <button
                        onClick={() => {
                          handlePresc(p._id);
                        }}
                      >
                        Bax...
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="paBody">
              {currentPresc !== null ? (
                <div className="paInside">
                  <div className="patientInfo">
                    <div className="ownProfile">
                      <div className="about presc">
                        <div className="pr">
                          <div className="prescF">
                            <p>
                              Həkim:{" "}
                              <span>
                                {doctor?.name || "N/A"}{" "}
                                {doctor?.surname || "N/A"}
                              </span>
                            </p>
                            <p>
                              Əlaqə nömrəsi:{" "}
                              <span>{doctor?.phoneNumber || "N/A"}</span>
                            </p>
                          </div>
                          <div className="prescS">
                            <p>
                              Pasiyent:{" "}
                              <span>
                                {patient?.name || "N/A"}{" "}
                                {patient?.surname || "N/A"}
                              </span>
                            </p>
                            <p>
                              Doğum tarixi:{" "}
                              <span>
                                {patient?.birthday.slice(0, 10) || "N/A"}
                              </span>
                            </p>
                            <br />
                            <p>
                              Müayinə tarixi:{" "}
                              <span>
                                {currentPresc?.date.slice(0, 10) || "N/A"}
                              </span>
                            </p>
                            <br />
                            <div className="img">
                              <img src="./images/Home/frame.png" alt="" />
                            </div>
                          </div>
                        </div>
                        <div className="r">
                          <p>
                            Diaqnoz:{" "}
                            <span>{currentPresc?.diagnosis || "N/A"}</span>
                          </p>
                          <br />
                          <p>
                            Resept:{" "}
                            <span>
                              {currentPresc?.prescriptionContent || "N/A"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="errorMesage">Resept Seçilməyib</p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default KabinetPatient;
