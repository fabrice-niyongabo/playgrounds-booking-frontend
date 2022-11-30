import React,{useState,useEffect} from 'react'   
import Axios from "axios"
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { app } from '../../../constants';
import { errorHandler } from '../../../helpers';
import ImageLoader from '../../image-loader';

function Printer() { 
    const {keyword} = useParams()
  const {  token } = useSelector((state) => state.user); 
  const [isLoading, setIsLoading] = useState(true);  
  const [transactions, setTransactions] = useState([]); 
  const [results,setResults] = useState([])  

  const fetchData = () => {
    setIsLoading(true);
    Axios.get(app.backendUrl + "/booking/all/" + "?token=" + token+"&printer=1")
      .then((res) => {
        console.log(res.data.transactions);
        setIsLoading(false);
        setTransactions(res.data.transactions); 
        if(keyword && keyword!==""){ 
                const k = keyword.toLowerCase()
                setResults(res.data.transactions.filter(item => item?.client.fullName.toLowerCase().includes(k)  ||
                 item?.playground.title.toLowerCase().includes(k)  ||
                 item.randomTransactionId.toLowerCase().includes(k)  ||
                 item?.spTransactionId.toLowerCase().includes(k)
                ))
            }else{
                setResults(res.data.transactions) 
            }
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  };
 
  useEffect(() => {
    fetchData();
  }, []);


const calculateTotal = () => {
    let total = 0;
    for(let i=0;i<results.length;i++){
        total += Number(results[i].amountPaid)
    }
    return total
}

  return (
    <>  
      <div className="text-center">
            <img
              src={require("../../../assets/logo.png")}
              style={{ width: "100px" }}
            />
          </div>
          <h2 className='text-center'>Circle Sportif Transactions Report</h2>
        <div className="my-4">  
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
                  <th>MOMO TX ID</th>
                  <th>Client Names</th>
                  <th>Client Email</th>
                  <th>Date</th> 
                </thead>
                <tbody>
                  {results 
                    .map((item) => (
                      <tr>
                        <td>{item.randomTransactionId}</td>
                        <td>{item.amountPaid} RWF</td>
                        <td>{item.playground.title}</td>
                        <td>{item.playground.price} RWF</td>
                        <td>
                            {item?.bookedHours?.map((item, i) => (
                            <p className="m-0" key={i}>
                                {item.from}-{item.to}
                            </p>
                            ))}
                        </td>
                        <td className={item.status=="SUCCESS"?"text-success":item.status=="FAILED"?"text-danger":"text-dark"}>{item.status}</td> 
                        <td>{item?.spTransactionId}</td>
                        <td>{item?.client?.fullName}</td>
                        <td>{item?.client?.email}</td>
                        <td>{new Date(item.createdAt).toLocaleString()}</td> 
                      </tr>
                    ))}
                </tbody>
              </table>
            )}   
        <h3>TOTAL: {calculateTotal()} RWF</h3>
      </div>  
    </>
  );
}

export default Printer