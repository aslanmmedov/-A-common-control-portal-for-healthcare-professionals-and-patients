import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegHospital } from "react-icons/fa";
import { MdPersonAddAlt } from "react-icons/md";
import { MdOutlineMedicalServices } from "react-icons/md";
import { Counter } from "../../../Components/otoCounter";
import { CiCalendarDate } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import controller from "../../../Api/controllers";
import { endpoints } from "../../../Api/constants";
import { GoPerson } from "react-icons/go";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { KabinetContext } from "../../../Context/KabinetContext";
const Home = () => {
  const [news, setNews] = useState([]);
  const { handleOpen, handleClose, open, setOpen } = useContext(KabinetContext);

  const getNewsData = async () => {
    const { data } = await controller.getAllData(endpoints.news);
    setNews(data);
  };
  useEffect(() => {
    getNewsData();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    height: 400,
    borderRadius: "20px",
    p: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection:"column",
    gap: 3,
    ".link": {
      border: "none",
      borderRadius: "25px",
      p: "2rem 4rem",
      backgroundColor: "#0474acf2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap:2,
      transition:"all 0.6s",
      "&:hover":{
        backgroundColor: "#0085c9",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      },
      a: {
        color: "white",
        fontSize: "1.3rem",
      },
      ".person": {
        color: "white",
        fontSize: "1.8rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  };

  return (
    <>
      <main>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          disableScrollLock
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style} className="modalKabinet">
              <div className="link patient">
                <NavLink to="/patient">Vətəndaş Kimi giriş </NavLink>
                <p className="person">
                <FaUser />
                </p>
              </div>
              <div className="link doctor">
                <NavLink to="/doctor">Tibb işçisi kimi giriş </NavLink>
                <p className="person">
                  <FaUserDoctor />
                </p>
              </div>
            </Box>
          </Fade>
        </Modal>
        <section id="heroBanner">
          <div className="container">
            <div className="herobanner">
              <div className="heroText">
                <h1>Poliklinikaların elektron nəzarət və idarəetmə portalı</h1>
                <p>
                  E-Poliklinika-nın fəaliyyətinin əsas məqsədi tibb
                  müəssisələrində tibbi xidmətlərin təşkilini təmin etməkdən və
                  tibbi xidmətlərin keyfiyyətinin yüksəldilməsi üçün tədbirlər
                  görməkdən ibarətdir.
                </p>
                <button>
                  Ətraflı məlumat
                  <span>
                    <FaArrowRightLong />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id="otoCounter">
          <div className="container">
            <div className="otocounter">
              <h1>Xidmətinizdəyik!</h1>
              <p>Statistik məlumatlar 2024-cü ili əhatə edir.</p>
              <div className="row">
                <div className="col-4 col-md-12 col-sm-12">
                  <div className="otoflex">
                    <div className="holder">
                      <h3>
                        <FaRegHospital />
                      </h3>
                      <Counter start={0} end={1745} duration={4} />
                    </div>
                    <p>Ümumi poliklinika sayı</p>
                  </div>
                </div>
                <div className="col-4 col-md-12 col-sm-12">
                  <div className="otoflex">
                    <div className="holder">
                      <h3>
                        <MdPersonAddAlt />
                      </h3>
                      <Counter start={0} end={1257896} duration={4} />
                    </div>
                    <p>Qeydiyyatlı şəxslərin sayı</p>
                  </div>
                </div>
                <div className="col-4 col-md-12 col-sm-12">
                  <div className="otoflex">
                    <div className="holder">
                      <h3>
                        <MdOutlineMedicalServices />
                      </h3>
                      <Counter start={0} end={26352763} duration={4} />
                    </div>
                    <p>Göstərilmiş xidmətlər</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="e-Services">
          <div className="container">
            <div className="e-services">
              <div className="head">
                <h1>Elektron xidmətlər</h1>
              </div>
              <div className="row">
                <div className="col-4 col-md-6 col-sm-12">
                  <div className="e-serviceCard img1">
                    <div className="text">
                      <h2>Peyvənd və vaksinasiya nəzarəti</h2>
                      <p>
                        Doğum tarixindən etibarən olan peyvənd tarixçəsi və
                        peyvənd məlumatlarına elektron nəzarət.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-4 col-md-6 col-sm-12">
                  <div className="e-serviceCard img2">
                    <div className="text">
                      <h2>Dispanser müayinə</h2>
                      <p>
                        Dispanser müayinə tarixçəsi və müayinəsinə elektron
                        baxış.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-4 col-md-6 col-sm-12">
                  <div className="e-serviceCard img3">
                    <div className="text">
                      <h2>Qeydiyyat proseslərinə elektron nəzarət</h2>
                      <p>
                        Qeydiyyat məlumatlarının dəyiştirilməsi və qeydiyyatda
                        olunan poliklinikadan çıxış.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h3>
                <NavLink to="/">Digərlərinə nəzər sal..</NavLink>
              </h3>
            </div>
          </div>
        </section>
        <section id="newsSection">
          <div className="container">
            <div className="newssection">
              <div className="newsHead">
                <h1>Ən son xəbərlər</h1>
              </div>
              <div className="row">
                {news &&
                  news.map((news) => (
                    <div className="col-4 col-sm-12 col-sm-12" key={news.id}>
                      <div className="newsCard">
                        <div className="image">
                          <img src={news.image} alt="" />
                        </div>
                        <h2>{news.name}</h2>
                        <p>
                          <CiCalendarDate />
                          {news.date}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
