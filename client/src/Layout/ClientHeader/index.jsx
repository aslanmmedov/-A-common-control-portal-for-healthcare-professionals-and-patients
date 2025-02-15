import React from 'react'
import { FiPhone } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import "./index.scss"
import { NavLink } from 'react-router-dom';
import ResponsiveDrawer from '../../Components/Menu';
const ClientHeader = () => {
  return (
    <>
        <header id = "clientHeader">
          <nav>
            <div className="container">
              <div className="navTop">
                <div className="phoneAndEmail">
                  <p><FiPhone /> +994 345 6789</p>|
                  <p><FaRegEnvelope />e-poliklinika@gov.az</p>
                </div>
                <div className="links">
                  <ul>
                    <li><a href="#"><FaFacebookF /></a></li>
                    <li><a href="#"><RiInstagramFill/></a></li>
                    <li><a href="#"><FaXTwitter /></a></li>
                    <li><a href="#"><FaLinkedinIn /></a></li>
                    <li><a href="#"><FaYoutube /></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='line'></div>
            <div className="container">
            <div className="navDown">
                <div className="logo">
                  <img src="../public/images/Home/SehiyyeLogo.jpg" alt="" />
                  <h1>E-Poliklinika</h1>
                </div>
                <div className="pageLinks">
                  <ul>
                    <li><NavLink to ="/">Haqqımızda</NavLink><p></p></li> 
                    <li><NavLink to = "/">Əlaqə</NavLink><p></p></li>
                  </ul>
                </div>
                <div className="menuBar"><ResponsiveDrawer/></div>
              </div>
            </div>
          </nav>
        </header>
    </>
  )
}

export default ClientHeader