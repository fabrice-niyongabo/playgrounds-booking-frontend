import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiDelete } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setShowFullPageLoader } from "../../actions/fullPageLoader";
import { app } from "../../constants";
import { errorHandler, toastMessage } from "../../helpers";

function Book({ showModal, setShowModal, item, token }) {
  const dispatch = useDispatch();
  const [hours, setHours] = useState([]);
  const [selectedHours, setSelectedHours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(setShowFullPageLoader(true));
    axios
      .post(app.backendUrl + "/playgrounds/hours/", {
        id: item._id,
        token,
      })
      .then((res) => {
        dispatch(setShowFullPageLoader(false));
        toastMessage("success", res.data.msg);
      })
      .catch((error) => {
        errorHandler(error);
        dispatch(setShowFullPageLoader(false));
      });
  };
  const fetchHours = () => {
    dispatch(setShowFullPageLoader(true));
    axios
      .get(app.backendUrl + "/playgrounds/hours/" + item._id)
      .then((res) => {
        setHours(res.data.hours);
        setTimeout(() => {
          dispatch(setShowFullPageLoader(false));
        }, 2000);
      })
      .catch((error) => {
        dispatch(setShowFullPageLoader(false));
        errorHandler(error);
      });
  };

  useEffect(() => {
    showModal && fetchHours();
  }, [showModal]);

  const handleSelect = (item) => {
    const hour = selectedHours.find((i) => i.from == i.from && i.to == item.to);
    if (!hour) {
      setSelectedHours([...selectedHours, item]);
    } else {
      setSelectedHours(
        selectedHours.filter((i) => i.from !== item.from && i.to !== item.to)
      );
    }
  };

  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={() => setShowModal(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{item.title} - Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              placeholder="Enter your organisation name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Choose Booking date</label>
            <input
              type="date"
              placeholder="Enter your organisation name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3 border p-2">
            <label>Pick hours you want to book</label>
            <div className="row mt-2">
              {hours.map((i, index) => (
                <div className="col-md-3 mb-2">
                  <div
                    className={`text-center ${
                      selectedHours.filter(
                        (tt) => tt.from == i.from && tt.to == i.to
                      ).length > 0
                        ? "bg-primary"
                        : "bg-light"
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelect(i)}
                  >
                    {i.from}-{i.to}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group mb-3">
            <label>
              Payment phone number{" "}
              <smal>
                <b>
                  NB: Enter a valid MTN/AIRTEL-TIGO phone number, otherwise the
                  transaction will fail. EX: 078....or 073....
                </b>
              </smal>
            </label>
            <input
              type="number"
              placeholder="07............................................."
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <b>
              TOTAL PRICE: {selectedHours.length}*{item.price} ={" "}
              {item.price * selectedHours.length} RWF
            </b>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default Book;
