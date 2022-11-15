import React from "react";
import Header from "../Header";

import "../../styles/home.scss";
import Footer from "../Footer";

function Home() {
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
                alt="features"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <hr />
        <div className="nearest-facilities-list-tab mb-4" id="playgrounds">
          contents
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
