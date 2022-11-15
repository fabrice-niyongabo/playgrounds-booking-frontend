import React, { useState } from "react";
import { errorHandler, uploadImage } from "../../../../helpers";

function Playgrounds() {
  const [state, setState] = useState({
    title: "",
    summary: "",
    description: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const rsp = await uploadImage(state.image);
      console.log(rsp);
    } catch (error) {
      errorHandler(error);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2>Playgrounds</h2>
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
