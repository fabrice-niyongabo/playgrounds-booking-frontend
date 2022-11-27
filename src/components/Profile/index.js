import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../Header";
import { AiFillEdit } from "react-icons/ai";
import "../../styles/profile.scss";
import Axios from "axios";
import { errorHandler, toastMessage } from "../../helpers";
import ProfileDetails from "./ProfileDetails";
import { useParams } from "react-router-dom";
import { app } from "../../constants";
import ImageLoader from "../image-loader";
import TransactionDetails from "./transactionDetails";
function Profile() {
  const params = useParams();
  const { fullName, token } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});

  const fetchData = () => {
    setIsLoading(true);
    Axios.get(app.backendUrl + "/booking/" + "?token=" + token)
      .then((res) => {
        console.log(res.data.transactions);
        setIsLoading(false);
        setTransactions(res.data.transactions);
        toastMessage("success", res.data.msg);
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  };

  const fetchData2 = () => {
    Axios.get(app.backendUrl + "/booking/" + "?token=" + token)
      .then((res) => {
        setTransactions(res.data.transactions);
      })
      .catch((error) => {
        errorHandler(error);
      });
  };

  let interval = null;
  useEffect(() => {
    interval = setInterval(() => {
      if (transactions.length > 0) {
        fetchData2();
      }
    }, 7000);
    return () => {
      clearInterval(interval);
    };
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="text-end mt-4">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <h3 className="quicksand-font mb-0">{fullName}</h3>
            <span>&nbsp;&nbsp;</span>
            <AiFillEdit
              size={30}
              color="#f46a06"
              style={{ cursor: "pointer" }}
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
        <div className="my-4">
          <table className="w-100">
            <tr>
              <td colSpan={3} className="bg-light pt-2">
                <h4 className="text-center">Transactions</h4>
              </td>
            </tr>
            <tr>
              <td
                className={
                  activeTab === "PENDING"
                    ? "tab p-2 text-center bg-light active"
                    : "tab p-2 text-center bg-light"
                }
                onClick={() => setActiveTab("PENDING")}
              >
                Pending (
                {
                  transactions.filter((item) => item.status === "PENDING")
                    .length
                }
                )
              </td>
              <td
                className={
                  activeTab === "FAILED"
                    ? "tab p-2 text-center bg-light active"
                    : "tab p-2 text-center bg-light"
                }
                onClick={() => setActiveTab("FAILED")}
              >
                Failed (
                {transactions.filter((item) => item.status === "FAILED").length}
                )
              </td>
              <td
                className={
                  activeTab === "SUCCESS"
                    ? "tab p-2 text-center bg-light active"
                    : "tab p-2 text-center bg-light"
                }
                onClick={() => setActiveTab("SUCCESS")}
              >
                Successfull (
                {
                  transactions.filter((item) => item.status === "SUCCESS")
                    .length
                }
                )
              </td>
            </tr>
          </table>
          <div>
            {isLoading ? (
              <ImageLoader />
            ) : (
              <table className="table table-bordered">
                <thead>
                  <th>#</th>
                  <th>Amount</th>
                  <th>Playground</th>
                  <th>Price/hr</th>
                  <th>Booked Hours</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {transactions
                    .filter((item) => item.status === activeTab)
                    .map((item) => (
                      <tr>
                        <td>{item.randomTransactionId}</td>
                        <td>{item.amountPaid} RWF</td>
                        <td>{item.playground.title}</td>
                        <td>{item.playground.price} RWF</td>
                        <td>{item.bookedHours.length}</td>
                        <td>{item.status}</td>
                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                        <td>
                          <button
                            className="btn btn-info"
                            onClick={() => {
                              setSelectedTransaction(item);
                              setShowModal2(true);
                            }}
                          >
                            More details
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <ProfileDetails
        setShowLoader={setShowLoader}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <TransactionDetails
        showModal={showModal2}
        setShowModal={setShowModal2}
        transaction={selectedTransaction}
      />
    </>
  );
}

export default Profile;
