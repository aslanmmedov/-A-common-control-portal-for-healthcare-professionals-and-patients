import React from "react";
import "./index.scss";
import { FaArrowRightLong } from "react-icons/fa6";
const Home = () => {
  return (
    <>
      <main>
        <section id="heroBanner">
          <div className="container">
            <div className="herobanner">
                <div className="heroText">
                <h1>Poliklinikaların elektron nəzarət və idarəetmə portalı</h1>
                <p>E-Poliklinika-nın fəaliyyətinin əsas məqsədi tibb müəssisələrində tibbi xidmətlərin təşkilini təmin etməkdən və tibbi xidmətlərin keyfiyyətinin yüksəldilməsi üçün tədbirlər görməkdən ibarətdir.</p>
                <button>Ətraflı məlumat<span><FaArrowRightLong /></span></button>
                </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
