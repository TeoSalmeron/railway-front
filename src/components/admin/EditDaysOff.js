import { useState, useEffect } from "react"

// Material UI
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// React Icons
import { GiConfirmed } from "react-icons/gi"

// Axios
import axios from "axios"

const EditOpeningSchedules = () => {

    // Get Schedules data
    const [schedules, setSchedules] = useState([])
    const [reload, setReload] = useState(false)
    
    // Schedules
    const [monday, setMonday] = useState("")
    const [tuesday, setTuesday] = useState("")
    const [wednesday, setWednesday] = useState("")
    const [thursday, setThursday] = useState("")
    const [friday, setFriday] = useState("")
    const [saturday, setSaturday] = useState("")
    const [sunday, setSunday] = useState("")
    const [editSchedulesFormStatus, setEditSchedulesFormStatus] = useState("")
    const [statusColor, setStatusColor] = useState("red")

    const handleChange = (event, day) => {

      const isOpen = event.target.value === "1" ? 1 : 0

      switch(day) {
        case 0:
          setSunday(isOpen)
          break
        case 1:
          setMonday(isOpen)
          break
        case 2:
          setTuesday(isOpen)
          break
        case 3:
          setWednesday(isOpen)
          break
        case 4:
          setThursday(isOpen)
          break
        case 5:
          setFriday(isOpen)
          break
        case 6:
          setSaturday(isOpen)
          break
        default:
          return
      }
    }

    const handleSubmit = async (event, day) => {
      event.preventDefault()

      const dayToUpdate = {
        day: day,
        is_opened: day === 0 ? sunday : day === 1 ? monday : day === 2 ? tuesday : day === 3 ? wednesday : day === 4 ? thursday : day === 5 ? friday : day === 6 ? saturday : ""
      }
      
      try {
        const response = await axios.patch(process.env.REACT_APP_API_URL + "/schedules/update/days-off", dayToUpdate, {
          withCredentials: true 
        })

        setEditSchedulesFormStatus(response.data)
        setStatusColor("green")
        setReload(!reload)

      } catch (error) {
        setEditSchedulesFormStatus(error.response.data)
        setStatusColor("#880000")
      }
      
    }


    // Get all schedules
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/schedules", {
          withCredentials: true
        })
        .then((response) => {
          setSchedules(response.data.schedules)
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    }, [reload])

  return (
    <Accordion className="accordion">
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        arie-controls="panel2-content"
        >
        <h2>
            Modifier les jours de fermeture
        </h2>
        </AccordionSummary>
        <AccordionDetails>
            {editSchedulesFormStatus ? (
              <p style={{backgroundColor: statusColor, padding: 10, marginBottom: 10, color: "#fff"}}>
                {editSchedulesFormStatus}
              </p>
            ) : ""}
            <div style={{backgroundColor: "#c3c3c3", padding: 20, color: "#363536", marginBottom: "30px"}}>
              <strong>
                Planning de votre garage :
              </strong>
              <br />
              <br />  
              <ul>
                {schedules.map((schedule) => (
                  <li key={schedule.id}>
                    {schedule.day_name} : {schedule.is_opened === 1 ? (
                      <span style={{color: "green"}}>Ouvert</span>
                    ) : (
                      <span style={{color: "#880000"}}>Fermé</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {schedules.map((schedule) => (
              <form onSubmit={(e) => handleSubmit(e, schedule.day)} key={schedule.id} style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20}}>
                <div style={{display: "flex", alignItems: "center"}}>
                  <label htmlFor={schedule.id} style={{width: 100}}>
                    {schedule.day_name}
                  </label>
                  <select id={schedule.id} name="is_opened" defaultValue="" onChange={(e) => handleChange(e, schedule.day)}>
                    <option value="" disabled>
                      Choisir une option
                    </option>
                    <option value="1">
                      Ouvert
                    </option>
                    <option value="0">
                      Fermé
                    </option>
                  </select>
                </div>
                <button type="submit" style={{display: "flex", fontSize: "26px", border: "none", background: "none", color: "green"}}>
                  <GiConfirmed />
                </button>
              </form>
            ))}
        </AccordionDetails>
    </Accordion>
  )
}

export default EditOpeningSchedules