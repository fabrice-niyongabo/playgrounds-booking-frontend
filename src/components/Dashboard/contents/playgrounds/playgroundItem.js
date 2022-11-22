import { makeStyles } from "@mui/styles";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import { FiDelete } from "react-icons/fi";
import { BsClockHistory } from "react-icons/bs";
import { app } from "../../../../constants";
import { useState } from "react";
import Hours from "./hours";
import Images from "./images";
import Edit from "./edit";
import { useDispatch } from "react-redux";
import { setShowFullPageLoader } from "../../../../actions/fullPageLoader";
import axios from "axios";
import { errorHandler } from "../../../../helpers";

function PlaygroundItem({ playground, token, fetchPlaygrounds }) {
  const classes = useStyles();
  const [showHoursModal, setShowHoursModal] = useState(false);
  const [showImagesModal, setShowimagesModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(setShowFullPageLoader(true));
    axios
      .delete(
        app.backendUrl + "/playgrounds/" + playground._id + "?token=" + token
      )
      .then((res) => {
        dispatch(setShowFullPageLoader(false));
        fetchPlaygrounds();
      })
      .catch((error) => {
        errorHandler(error);
        dispatch(setShowFullPageLoader(false));
      });
  };
  return (
    <>
      <div
        className="flex-space"
        style={{ borderBottom: "1px solid #CCC", marginBottom: "10px" }}
      >
        <img
          src={app.fileBaseUrl + playground.images[0]}
          style={{ width: 200 }}
        />
        <div style={{ width: "100%", marginLeft: "10px" }}>
          <h3 className="m-0">{playground.title}</h3>
          <p className="m-0">{playground.summary}</p>
          <p className="m-0">
            <b>Price Per Hour:</b> {playground.price} RWF
          </p>
          <div className="flex-space">
            <span>
              <b>Status: </b> {playground.status}
            </span>
            <div>
              <div
                onClick={() => setShowHoursModal(true)}
                className={classes.icon}
                title="Playground availabe hours"
              >
                <BsClockHistory size={20} />
              </div>
              <div
                onClick={() => setShowimagesModal(true)}
                className={classes.icon}
                title="Playground's images"
              >
                <IoIosImages size={20} />
              </div>
              <div
                onClick={() => setShowEditModal(true)}
                className={classes.icon}
                title="Edit"
              >
                <FaEdit size={20} />
              </div>
              <div
                className={classes.icon}
                title="Delete"
                onClick={() => handleDelete()}
              >
                <FiDelete size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Hours
        setShowModal={setShowHoursModal}
        showModal={showHoursModal}
        token={token}
        item={playground}
      />
      <Images
        setShowModal={setShowimagesModal}
        showModal={showImagesModal}
        fetchPlaygrounds={fetchPlaygrounds}
        token={token}
        item={playground}
      />
      <Edit
        setShowModal={setShowEditModal}
        showModal={showEditModal}
        fetchPlaygrounds={fetchPlaygrounds}
        token={token}
        item={playground}
      />
    </>
  );
}

export default PlaygroundItem;

const useStyles = makeStyles((theme) => ({
  icon: {
    display: "inline",
    marginLeft: "10px",
    "&:hover": {
      color: "red",
      cursor: "pointer",
    },
  },
}));
