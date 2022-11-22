import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiDelete } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setShowFullPageLoader } from "../../../../actions/fullPageLoader";
import { app } from "../../../../constants";
import { errorHandler, toastMessage } from "../../../../helpers";
import ImageLoader from "../../../image-loader";

function Hours({ showModal, setShowModal, item, token }) {
  const dispatch = useDispatch();
  const [hours, setHours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (from.trim() !== "" && to.trim() !== "") {
      dispatch(setShowFullPageLoader(true));
      axios
        .post(app.backendUrl + "/playgrounds/hours/", {
          from,
          to,
          id: item._id,
          token,
        })
        .then((res) => {
          dispatch(setShowFullPageLoader(false));
          toastMessage("success", res.data.msg);
          fetchHours();
          setFrom("");
          setTo("");
        })
        .catch((error) => {
          errorHandler(error);
          dispatch(setShowFullPageLoader(false));
        });
    }
  };
  const fetchHours = () => {
    setIsLoading(true);
    axios
      .get(
        app.backendUrl + "/playgrounds/hours/" + item._id + "?token=" + token
      )
      .then((res) => {
        setHours(res.data.hours);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  };

  const handleDelete = (id) => {
    dispatch(setShowFullPageLoader(true));
    axios
      .delete(app.backendUrl + "/playgrounds/hours/" + id + "?token=" + token)
      .then((res) => {
        fetchHours();
        dispatch(setShowFullPageLoader(false));
      })
      .catch((error) => {
        errorHandler(error);
        dispatch(setShowFullPageLoader(false));
      });
  };

  useEffect(() => {
    showModal && fetchHours();
  }, [showModal]);

  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={() => setShowModal(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Playground availabe hours</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-8 col-md-8">
            {isLoading ? (
              <ImageLoader />
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hours.map((item, i) => (
                    <tr key={i}>
                      <td>{item.from}</td>
                      <td>{item.to}</td>
                      <td>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(item._id)}
                        >
                          <FiDelete size={30} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="col-sm-4 col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>From</label>
                <input
                  type="time"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="form-control"
                  required
                />
              </div>{" "}
              <div className="mb-3">
                <label>To</label>
                <input
                  type="time"
                  className="form-control"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Save Hour
              </button>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Hours;
