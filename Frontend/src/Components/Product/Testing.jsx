import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../Api'
export const Testing = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}/transhist`,{withCredentials:true})
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
    }, [])
    return (
        <div>

        </div>
    )
}
