// Axios
import axios from "axios"

// React
import { useState, useEffect } from "react"

// React icons
import { GiConfirmed } from "react-icons/gi"
import { MdDelete } from "react-icons/md"

// Material UI
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const VerifyReviews = () => {
  const [unverifiedReviews, setUnverifiedReviews] = useState([])
  const [formStatus, setFormStatus] = useState("")
  const [formStatusColor, setFormStatusColor] = useState("")
  const [reload, setReload] = useState(false)
  const [action, setAction] = useState("")
  const [id, setId] = useState("")

  const setActionAndId = (action, id) => {
    setAction(action)
    setId(id)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      if(typeof(id) !== "number") {
        setFormStatus("L'identifiant de l'avis est incorrect")
        setFormStatusColor("red")
        return
      }

      if(typeof(action) !== "string") {
        setFormStatus("L'action définie est incorrecte")
        setFormStatusColor("red")
        return
      }

      const response = await axios.post(process.env.REACT_APP_API_URL + "/reviews/manage",{
        id: id,
        action: action
      })

      setFormStatus(response.data)
      setFormStatusColor("green")
      setReload(!reload)
    } catch (error) {
      setFormStatus(error.response)
      setFormStatusColor("red")
    }
  }

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "/reviews/unverified")
    .then((response) => {
      setUnverifiedReviews(response.data)
    })
    .catch((error) => {
      console.log(error.response)
    })
  }, [reload])
  return (
    <Accordion className='accordion'>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        arie-controls="panel1-content"
      >
        <h2>
           Modérer les avis clients
        </h2>
      </AccordionSummary>
      {unverifiedReviews ? (
        <AccordionDetails>
          {formStatus ? (
            <p style={{backgroundColor: formStatusColor, padding: 10, color: "#fff"}}>
              {formStatus}
            </p>
          ) : ""}
          {unverifiedReviews.map((review) => (
            <div style={{marginBottom: 20}} key={review.id}>
              <p>
                <strong>Note : </strong> {review.score} / 5
              </p>
              <p>
                <strong>Commentaire : </strong> <br/>
                {review.comment}
              </p>
              <form onSubmit={handleSubmit}>
                <input 
                  type="checkbox"
                  defaultValue={review.id}
                  id={review.id}
                  name="review-id"
                  style={{display: "none"}}
                />
                <div>
                  <button type="submit" onClick={() => setActionAndId("confirm", review.id)} style={{fontSize: "2rem", border: "none", background: "none", color: "green", marginRight: 10}}>
                    <GiConfirmed />
                  </button>
                  <button type="submit" onClick={() => setActionAndId("delete", review.id)} style={{fontSize: "2rem", border: "none", background: "none", color: "red"}}>
                    <MdDelete />
                  </button>
                </div>
              </form>
            </div>
          ))}
        </AccordionDetails>
      ) : (
        <AccordionDetails>
          Vous n'avez pas d'avis à modérer
        </AccordionDetails>
      )} 
    </Accordion>
  )
}

export default VerifyReviews