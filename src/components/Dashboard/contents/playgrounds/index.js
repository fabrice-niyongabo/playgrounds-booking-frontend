import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowFullPageLoader } from "../../../../actions/fullPageLoader";
import { errorHandler, toastMessage, uploadImage } from "../../../../helpers";
import Axios from "axios";
import { app } from "../../../../constants";
import { useEffect } from "react";
import ImageLoader from "../../../image-loader";
import PlaygroundItem from "./playgroundItem";

const initialState = {
  title: "",
  summary: "",
  description: "",
  image: "",
  price: 10000,
};

function Playgrounds() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [playgrounds, setPlaygrounds] = useState([]);
  const [state, setState] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setShowFullPageLoader(true));
    try {
      const rsp = await uploadImage(state.image);
      const { fileName } = rsp.data;
      Axios.post(app.backendUrl + "/playgrounds/", {
        ...state,
        image: fileName,
        token,
      })
        .then((res) => {
          dispatch(setShowFullPageLoader(false));
          toastMessage("success", res.data.msg);
          fetchPlaygrounds();
          setState(initialState);
        })
        .catch((error) => {
          dispatch(setShowFullPageLoader(false));
          errorHandler(error);
        });
    } catch (error) {
      errorHandler(error);
      dispatch(setShowFullPageLoader(false));
    }
  };

  const fetchPlaygrounds = () => {
    setIsLoading(true);
    Axios.get(app.backendUrl + "/playgrounds/")
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

  useEffect(() => {
    fetchPlaygrounds();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2>Playgrounds</h2>

              {isLoading ? (
                <ImageLoader />
              ) : (
                <div>
                  {playgrounds.map((item, i) => (
                    <PlaygroundItem
                      playground={item}
                      key={i}
                      token={token}
                      fetchPlaygrounds={fetchPlaygrounds}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2>Add Playground</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Playground title"
                    value={state.title}
                    required
                    onChange={(e) =>
                      setState({ ...state, title: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Playground's short summary"
                    value={state.summary}
                    maxLength={100}
                    required
                    onChange={(e) =>
                      setState({ ...state, summary: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Playground's full description"
                    value={state.description}
                    required
                    onChange={(e) =>
                      setState({ ...state, description: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price per hour (RWF)"
                    required
                    value={state.price}
                    onChange={(t) =>
                      setState({ ...state, price: t.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Playground image</label>
                  <input
                    type="file"
                    className="form-control"
                    required
                    onChange={(t) =>
                      setState({ ...state, image: t.target.files[0] })
                    }
                  />
                </div>
                <button className="btn btn-primary">Save Playground</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Playgrounds;
