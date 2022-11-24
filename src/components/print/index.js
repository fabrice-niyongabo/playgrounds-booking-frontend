import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { app } from "../../constants";
import { errorHandler } from "../../helpers";
import ImageLoader from "../image-loader";
import Axios from "axios";

function Print() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [transaction, setTransaction] = useState({});
  const { fullName, token } = useSelector((state) => state.user);
  const { id } = params;

  useEffect(() => {
    Axios.get(app.backendUrl + "/booking/" + id + "?token=" + token)
      .then((res) => {
        setTransaction(res.data?.transaction[0]);
        setIsLoading(false);
        setTimeout(() => {
          window.print();
        }, 1500);
      })
      .catch((error) => {
        errorHandler(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="mt-5 pt-5">
          <ImageLoader />
        </div>
      ) : (
        <div
          style={{ width: "60%", marginLeft: "auto", marginRight: "auto" }}
          className="border p-3"
        >
          <div className="text-center">
            <img
              src={require("../../assets/logo.png")}
              style={{ width: "100px" }}
            />
          </div>
          <h2>Circle Sportif Payment Receipt</h2>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>
                  <b>Playground Name</b>
                </td>
                <td>{transaction?.playground?.title}</td>
              </tr>
              <tr>
                <td>
                  <b>Amount Paid </b>
                </td>
                <td>{transaction.amountPaid} RWF</td>
              </tr>
              <tr>
                <td>
                  <b>Booked Hours: </b>
                </td>
                <td>
                  {transaction?.bookedHours?.map((item, i) => (
                    <p className="m-0" key={i}>
                      {item.from}-{item.to}
                    </p>
                  ))}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Booked Date: </b>
                </td>
                <td>{transaction.bookedDate}</td>
              </tr>
              <tr>
                <td>
                  <b>Transaction ID: </b>
                </td>
                <td>{transaction.randomTransactionId}</td>
              </tr>
              <tr>
                <td>
                  <b>MOMO Transaction ID: </b>
                </td>
                <td>{transaction?.spTransactionId}</td>
              </tr>
              <tr>
                <td>
                  <b>Payment Status: </b>
                </td>
                <td>{transaction.status}</td>
              </tr>
              <tr>
                <td>
                  <b>Transaction Date: </b>
                </td>
                <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Print;
