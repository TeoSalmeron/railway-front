// React
import { useEffect } from "react"

// Axios
import axios from "axios"

const Logout = () => {

    useEffect(() => {
        // Disconnect user
        axios.get(process.env.REACT_APP_API_URL + "/logout",
        {
            withCredentials: true
        })
        .then((response) => {
            if(response.data.logout) {
                window.location.assign("/")
            }
        })
        .catch((error) => {
            return
        })
    }, [])

  return <></>
}

export default Logout