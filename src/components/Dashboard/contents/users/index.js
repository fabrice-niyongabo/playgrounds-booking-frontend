import React from 'react'
import Axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import { app } from '../../../../constants'
import { useSelector } from 'react-redux'
import { errorHandler } from '../../../../helpers'
import ImageLoader from '../../../image-loader'
function Users() {
const [users,setUsers]= useState([])
const [loading,setLoading]= useState(false)
const {token} = useSelector(state => state.user)
useEffect(() => {
    setLoading(true)
    Axios.get(app.backendUrl+'/users/getAll?token='+token).then(res => {
        setLoading(false)
        setUsers(res.data.users)
    }).catch(error => {
        errorHandler(error)
        setLoading(false)
    })
},[])
  return (
    <div>
        <h2>Registered users</h2>
        {loading?<ImageLoader />:<>
        <table className='table'>
        <thead>
            <tr>
                <th>#</th>
                <th>Names</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Registration Date</th>
            </tr>
        </thead>
        <tbody>
            {users.map((item,index) => 
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.fullName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
            )}
        </tbody>
        </table>
        </>}
    </div>
  )
}

export default Users