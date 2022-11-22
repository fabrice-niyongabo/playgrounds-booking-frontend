import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiDelete } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setShowFullPageLoader } from "../../../../actions/fullPageLoader";
import { app } from "../../../../constants";
import { errorHandler, toastMessage, uploadImage } from "../../../../helpers";

function Edit({ showModal, setShowModal, item, token, fetchPlaygrounds }) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (showModal) {
      setTitle(item.title);
      setSummary(item.summary);
      setDescription(item.description);
      setPrice(item.price);
      setStatus(item.status);
    }
  }, [showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setShowFullPageLoader(true));
    try {
      const request = await axios.put(app.backendUrl + "/playgrounds/", {
        title,
        summary,
        description,
        price,
        id: item._id,
        token,
        status,
      });
      dispatch(setShowFullPageLoader(false));
      setShowModal(false);
      toastMessage("success", request.data.msg);
      fetchPlaygrounds();
    } catch (error) {
      errorHandler(error);
      dispatch(setShowFullPageLoader(false));
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
        <Modal.Title>Edit playground</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label>Summary</label>
            <textarea
              className="form-control"
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group mb-3">
            <label>Price per hour</label>
            <input
              type="number"
              className="form-control"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label>Status</label>
            <select
              className="form-control"
              required
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
          <Button type="submit" variant="primary">
            Save changes
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default Edit;
