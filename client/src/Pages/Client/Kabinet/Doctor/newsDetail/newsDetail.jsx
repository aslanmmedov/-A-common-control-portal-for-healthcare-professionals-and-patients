import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import controller from "../../../../../Api/controllers";
import { endpoints } from "../../../../../Api/constants";
import "./index.scss";
const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const navigate = useNavigate(null);

  const getData = async () => {
    const data = await controller.getDataById(endpoints.d_news, id);
    setNews(data.data);
  };

  useEffect(() => {
    getData();
  }, []);
  const getDetail = (id) => {
    navigate(-1);
  };
  return (
    <>
      <main id="detail">
        <div className="container">
          <div className="row">
            {news && (
              <div className="col-12">
                <div className="news">
                  <div className="img">
                    <img src={news.image} alt={news.name} />
                  </div>
                  <div className="name">
                    <h1>{news.name}</h1>
                  </div>
                  <div className="content">
                    <p>{news.news?`${news.news}`:`${news.description}`}</p>
                  </div>
                  <div className="btn">
                    <p>{news.date}</p>
                    <button
                      onClick={() => {
                        getDetail();
                      }}
                    >
                      Geri
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default NewsDetail;
