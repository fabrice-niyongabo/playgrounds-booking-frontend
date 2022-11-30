import React, { useEffect, useState } from "react";
import Header from "../Header";

import "../../styles/home.scss";
import Footer from "../Footer";
import { app } from "../../constants";
import { errorHandler } from "../../helpers";
import Axios from "axios";
import Loader from "./skeleton";
import { Link } from "react-router-dom";

function Home() {
  const [playgrounds, setPlaygrounds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchPlaygrounds();
  }, []);
  const fetchPlaygrounds = () => {
    setIsLoading(true);
    Axios.get(app.backendUrl + "/playgrounds/client/")
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          setPlaygrounds(res.data.playgrounds);
        }, 1000);
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  };
  return (
    <div>
      <Header />
      <div className="welcome-main-container">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="welcome-container">
                <h2>Circle sportif</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium optio,
                  eaque rerum!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur
                </p>
                <button
                  onClick={() =>
                    document.getElementById("playgrounds").scrollIntoView()
                  }
                >
                  Get Started
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <img
                style={{ width: "100%" }}
                src={require("../../assets/landing.png")}
                // src={require("../../assets/logo.png")}
                alt="features"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <hr />
        <div className="nearest-facilities-list-tab mb-4" id="playgrounds">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="row w-100">
              {playgrounds.map((item, position) => (
                <div className="col-md-4 my-2" key={position}>
                  <Link to={`/${item._id}`}>
                    <img
                      src={app.fileBaseUrl + item.images[0]}
                      style={{ width: "100%", height: 250, borderRadius: 15 }}
                    />
                  </Link>
                  <p
                    className="m-0"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100%",
                    }}
                  >
                    <b>{item.title}</b>
                  </p>
                  <small
                    className="d-block"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100%",
                    }}
                  >
                    {item.summary}
                  </small>
                  <small className="d-block">
                    <b>PRICE {item.price} RWF</b>
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
