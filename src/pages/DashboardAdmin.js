// React
import { useState, useEffect } from "react"

// Components
import NewEmployee from "../components/admin/NewEmployee"
import EditOpeningSchedules from "../components/admin/EditOpeningSchedules"
import EditClosingSchedules from "../components/admin/EditClosingSchedules"
import EditDaysOff from "../components/admin/EditDaysOff"

// Axios
import axios from "axios"

const DashboardAdmin = () => {
  const [loading, setLoading] = useState("true")
  
  // Current admin data //
  const [userEmail, setUserEmail] = useState("")
  
  // Get admin data
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "/auth", {
      withCredentials: true
    })
    .then((response) => {
      if(response.data.role !== "admin") {
        window.location.replace("/")
      } else {
        setLoading(false)
        setUserEmail(response.data.email)
      }
    })
    .catch((error) => {
      console.log(error.response.data)
    })
  }, [])

  return (
    <>
      {loading ? (
        <div style={{padding: "90px 20px"}}>
          Chargement...
        </div>
      ) : (
        <section className="container" id="adminPannel">
          <header className="container-md">
            <h1>
              Panneau d'administration
            </h1>
            <p className="display-email">
              Connecté en tant que : <strong>{userEmail}</strong>
            </p>
            <section>
              <NewEmployee />
              <EditDaysOff />
              <EditOpeningSchedules />
              <EditClosingSchedules />
            </section>
          </header>
        </section>
      )}

    </>

  )
}

export default DashboardAdmin 