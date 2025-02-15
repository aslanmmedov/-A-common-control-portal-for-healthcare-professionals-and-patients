import React from 'react'
import { NavLink } from 'react-router-dom'
import { CiLocationOn } from "react-icons/ci";
import { FaRegEnvelope } from "react-icons/fa";
import { HiOutlinePhone } from "react-icons/hi";
import "./index.scss"
const ClientFooter = () => {
  return (
    <>
    <footer id="clientFooter">
      <section id = "footerTop">
        <div className="container">
          <div className="row">
            <div className="col-3 col-md-12 col-sm-12">
              <div className="footerLogo">
              <img src="../public/images/Home/SehiyyeLogo.jpg" alt="" />
              <h1>E-Poliklinika</h1>
              </div>
            </div>
            <div className="col-3 col-md-6 col-sm-12">
              <div className="kecidler">
                <h2>Keçidlər</h2>
                <ul>
                  <li><NavLink>Xidmətlər</NavLink></li>
                  <li><NavLink>Xəbərlər</NavLink></li>
                  <li><NavLink>Haqqımızda</NavLink></li>
                </ul>
              </div>
            </div>
            <div className="col-3 col-md-6 col-sm-12">
            <div className="kecidler">
                <h2>Yardım</h2>
                <ul>
                  <li><NavLink>Tez-tez verilən suallar(FAQ)</NavLink></li>
                  <li><NavLink>Əlaqə</NavLink></li>
                  <li><NavLink>Kabinet</NavLink></li>
                </ul>
              </div>
            </div>
            <div className="col-3 col-md-12 col-sm-12">
            <div className="kecidlerLast">
                <h2>Əlaqə</h2>
                <ul>
                  <li><CiLocationOn />Azərbaycan, Bakı AZ 1022 akad.</li>
                  <li><FaRegEnvelope /> e-poliklinika@gov.az</li>
                  <li><HiOutlinePhone /> +994 345 6789</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="footerEnd">
        <div className="line"></div>
        <div className="container">
          <div className="endParag">
            <p>© 2025 e-Poliklinika web project.  Bir dövlət qurumuna aid real web səhifə deyildir.</p>
          </div>
        </div>
      </section>
    </footer>
    </>
  )
}

export default ClientFooter