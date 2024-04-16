import { useEffect } from "react"
import axios from "axios"
const Home = () => {
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/",
        {
            withCredentials: true
        })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])
  return (
    <div>Home</div>
  )
}

export default Home