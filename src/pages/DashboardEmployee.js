// React
import { useState, useEffect } from "react"

// Components
import NewCar from "../components/employee/NewCar"
import NewReview from "../components/employee/NewReview"
import VerifyReviews from "../components/employee/VerifyReviews"

// Axios
import axios from "axios"

const DashboardEmployee = () => {
  const [loading, setLoading] = useState("true")

  // Current employee data //
  const [userEmail, setUserEmail] = useState("")
  
  // Get employee data
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "/auth", {
      withCredentials: true
    })
    .then((response) => {
      if(response.data.role !== "employee") {
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
              Pannel employé
            </h1>
            <p className="display-email">
              Connecté en tant que : <strong>{userEmail}</strong>
            </p>
            <section>
              <NewCar />
              <NewReview />
              <VerifyReviews />
            </section>
          </header>
        </section>
      )}

    </>

  )
}

export default DashboardEmployee 