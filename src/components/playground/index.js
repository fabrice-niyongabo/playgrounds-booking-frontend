import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { errorHandler } from "../../helpers";
import Header from "../Header";
import Axios from "axios";
import { app } from "../../constants";
import ImageLoader from "../image-loader";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Book from "./book";

function Playground() {
  const params = useParams();
  const { id } = params;
  const classes = useStyles();
  const [playground, setPlayground] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPlaygrounds();
  }, []);

  const fetchPlaygrounds = () => {
    setIsLoading(true);
    Axios.get(app.backendUrl + "/playgrounds/client/" + id)
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          setPlayground(res.data.playground);
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  };
  return (
    <>
      <Header />

      {isLoading ? (
        <div className="mt-5">
          <ImageLoader />
        </div>
      ) : (
        <div
          className={classes.mainContainer}
          // style={{
          //   backgroundImage: `url("${app.fileBaseUrl}${
          //     playground.images ? playground?.images[0] : ""
          //   }")`,
          //   backgroundSize: "100% 100%",
          //   backgroundRepeat: "no-repeat",
          // }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                {playground.images && (
                  <Carousel>
                    {playground.images.map((item, i) => (
                      <div>
                        <img
                          src={app.fileBaseUrl + item}
                          key={i}
                          style={{ borderRadius: "10px", maxHeight: "60vh" }}
                        />
                        {/* <p className="legend">Legend 1</p> */}
                      </div>
                    ))}
                  </Carousel>
                )}
              </div>
              <div className="col-md-5">
                <h2>{playground.title}</h2>
                <p>{playground.summary}</p>
                <p>{playground.description}</p>
                <h6>PRICE PER HOUR: {playground.price} RWF</h6>
                <button
                  className={classes.button}
                  onClick={() => setShowModal(true)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
          <Book
            item={playground}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
      )}
    </>
  );
}

export default Playground;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "100%",
    minHeight: "80vh",
    // background: "#000",
    paddingTop: "1rem",
    background: "#f1e8d7",
  },
  button: {
    border: "none",
    color: "#FFF",
    padding: "0.5rem 1rem",
    backgroundColor: "#f46a06",
    boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "5px",
  },
}));
