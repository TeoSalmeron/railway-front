// React
import { useState, useEffect } from "react"

// React icons
import { FaFacebook } from "react-icons/fa"
import { FaInstagramSquare } from "react-icons/fa"
import { FaSquareXTwitter } from "react-icons/fa6"

// Axios
import axios from "axios"

const Footer = () => {
    const [schedules, setSchedules] = useState([])
    
  // Get schedules info
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "/schedules", {
        withCredentials: true
    })
    .then((response) => {
      setSchedules(response.data.schedules)
    })
    .catch((error) => {
      console.log(error.response)
    })
  }, [])

  return (
    <footer className='container'>
        <h3>
            Retrouvez-nous sur les réseaux sociaux
        </h3>
        <div className="social-networks">
            <button type="button">
                <FaFacebook />
            </button>
            <button type="button">
                <FaInstagramSquare />
            </button>
            <button type="button">
                <FaSquareXTwitter />
            </button>
        </div>
        <h3>
            Horaires d'ouverture
        </h3>
        <div className='schedules'>
            {schedules.map((schedule) => (
                <div key={schedule.id}>
                    {schedule.is_opened ? (
                        <>
                            <strong>{schedule.day_name}</strong> : de {schedule.open_time.slice(0,5)} à {schedule.close_time.slice(0,5)}
                        </>
                    ) : (
                        <>
                            <strong>{schedule.day_name}</strong> : fermé
                        </>
                    )}
                </div>
            ))}
        </div>
        <div>
            COPYRIGHT © Téo Salmeron | All rights reserved 2024
        </div>
    </footer>
  )
}

export default Footer