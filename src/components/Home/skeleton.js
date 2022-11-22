import React from "react";
import { Skeleton } from "@mui/material";

function Loader() {
  return (
    <div className="row w-100">
      <div className="col-md-4">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          className="my-2"
          style={{ borderRadius: 20 }}
          animation="wave"
        />
      </div>
      <div className="col-md-4">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          className="my-2"
          style={{ borderRadius: 20 }}
          animation="wave"
        />
      </div>
      <div className="col-md-4">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          className="my-2"
          style={{ borderRadius: 20 }}
          animation="wave"
        />
      </div>
      <div className="col-md-4">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          className="my-2"
          style={{ borderRadius: 20 }}
          animation="wave"
        />
      </div>
      <div className="col-md-4">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          className="my-2"
          style={{ borderRadius: 20 }}
          animation="wave"
        />
      </div>
      <div className="col-md-4">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          className="my-2"
          style={{ borderRadius: 20 }}
          animation="wave"
        />
      </div>
    </div>
  );
}

export default Loader;
