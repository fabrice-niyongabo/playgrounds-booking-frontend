import React,{useState,useEffect} from 'react'
import TransactionDetails from '../../../Profile/transactionDetails';
import Axios from "axios"
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { app } from '../../../../constants';
import { errorHandler, toastMessage } from '../../../../helpers';
import ImageLoader from '../../../image-loader';

function Transactions() { 
  const {  token } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("PENDING"); 
  const [isLoading, setIsLoading] = useState(true); 
  const [showModal2, setShowModal2] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [results,setResults] = useState([])
  const [keyword,setKeyword] = useState("")

  const fetchData = () => {
    setIsLoading(true);
    Axios.get(app.backendUrl + "/booking/all/" + "?token=" + token)
      .then((res) => {
        console.log(res.data.transactions);
        setIsLoading(false);
        setTransactions(res.data.transactions);
        setResults(res.data.transactions)
        // toastMessage("success", res.data.msg);
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  };

  const fetchData2 = () => {
    Axios.get(app.backendUrl + "/booking/all/" + "?token=" + token)
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

 useEffect(() => {
  if(keyword.trim() ===""){
    setResults(transactions)
  }else{
    const k = keyword.toLowerCase()
    setResults(transactions.filter(item => item?.client.fullName.toLowerCase().includes(k)  ||
     item?.playground.title.toLowerCase().includes(k)  ||
     item.randomTransactionId.toLowerCase().includes(k)  ||
     item?.spTransactionId.toLowerCase().includes(k)
    ))
  }
 },[keyword])

  return (
    <> 
      <div className="container"> 
      <h4>Transactions</h4> 
        <div className="my-4"> 
          <div className='flex-space'>
            <div className='form-group' style={{width:"100%"}}>
              <input type="text" className='form-control' value={keyword} onChange={e=> setKeyword(e.target.value)} placeholder='Search by TID,MOMO TID, Client names or playground title' />
            </div>
            {/* <div className='form-group' style={{}}>
              <input type="date" className='form-control'  />
            </div> */}
          </div>
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
                  {results
                    // .filter((item) => item.status === activeTab)
                    .map((item) => (
                      <tr>
                        <td>{item.randomTransactionId}</td>
                        <td>{item.amountPaid} RWF</td>
                        <td>{item.playground.title}</td>
                        <td>{item.playground.price} RWF</td>
                        <td>{item.bookedHours.length}</td>
                        <td className={item.status=="SUCCESS"?"text-success":item.status=="FAILED"?"text-danger":"text-dark"}>{item.status}</td>
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
      <TransactionDetails
        showModal={showModal2}
        setShowModal={setShowModal2}
        transaction={selectedTransaction}
      />
    </>
  );
}

export default Transactions