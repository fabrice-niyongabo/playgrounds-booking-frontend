import axios from "axios";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiDelete } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setShowFullPageLoader } from "../../../../actions/fullPageLoader";
import { app } from "../../../../constants";
import { errorHandler, toastMessage, uploadImage } from "../../../../helpers";

function Images({ showModal, setShowModal, item, token, fetchPlaygrounds }) {
  const [newImage, setNewImage] = useState("");
  const newImageRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (newImage !== "") handleSubmit();
  }, [newImage]);

  const handleSubmit = async () => {
    dispatch(setShowFullPageLoader(true));
    try {
      const rsp = await uploadImage(newImage);
      const { fileName } = rsp.data;
      const request = await axios.post(
        app.backendUrl + "/playgrounds/images/",
        {
          images: [...item.images, fileName],
          id: item._id,
          token,
        }
      );
      dispatch(setShowFullPageLoader(false));
      setShowModal(false);
      toastMessage("success", request.data.msg);
      fetchPlaygrounds();
    } catch (error) {
      errorHandler(error);
      dispatch(setShowFullPageLoader(false));
    }
  };

  const handleDelete = (name) => {
    if (item.images.length > 1) {
      dispatch(setShowFullPageLoader(true));
      axios
        .put(app.backendUrl + "/playgrounds/images/", {
          token,
          updatedImages: item.images.filter((item) => item !== name),
          id: item._id,
        })
        .then((res) => {
          dispatch(setShowFullPageLoader(false));
          setShowModal(false);
          fetchPlaygrounds();
        })
        .catch((error) => {
          errorHandler(error);
          dispatch(setShowFullPageLoader(false));
        });
    } else {
      toastMessage("error", "You cant delete all images from this playground");
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
        <Modal.Title>Playground images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          {item.images.map((i, index) => (
            <div className="col-md-4">
              <img
                className="mb-2"
                src={app.fileBaseUrl + i}
                style={{ width: "100%" }}
              />
              <Button
                type="button"
                variant="danger"
                onClick={() => handleDelete(i)}
              >
                Delete Image
              </Button>
            </div>
          ))}
          <div className="col-md-4">
            <input
              type="file"
              className="d-none"
              ref={newImageRef}
              onChange={(t) => setNewImage(t.target.files[0])}
            />
            <Button
              onClick={() => newImageRef.current.click()}
              type="button"
              variant="primary"
            >
              Add Image
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Images;
