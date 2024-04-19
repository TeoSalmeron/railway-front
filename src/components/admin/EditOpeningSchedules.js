import { useState, useEffect } from "react"

// Material UI
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// Axios
import axios from "axios"

const EditOpeningSchedules = () => {

    // Get Schedules data
    const [schedules, setSchedules] = useState([])
    const [reload, setReload] = useState(false)
    
    // Schedules
    const [mondayTime, setMondayTime] = useState("")
    const [tuesdayTime, setTuesdayTime] = useState("")
    const [wednesdayTime, setWednesdayTime] = useState("")
    const [thursdayTime, setThursdayTime] = useState("")
    const [fridayTime, setFridayTime] = useState("")
    const [saturdayTime, setSaturdayTime] = useState("")
    const [sundayTime, setSundayTime] = useState("")
    const [editSchedulesFormStatus, setEditSchedulesFormStatus] = useState("")
    const [statusColor, setStatusColor] = useState("red")

    // Handle form submit
    const handleEditSchedules = async (event) => {
        event.preventDefault()
        
        const newOpeningSchedule = [
            {
                day: 0,
                open_time: sundayTime
            },
            {
                day: 1,
                open_time: mondayTime
            },
            {
                day: 2,
                open_time: tuesdayTime
            },
            {
                day: 3,
                open_time: wednesdayTime
            },
            {
                day: 4,
                open_time: thursdayTime
            },
            {
                day: 5,
                open_time: fridayTime
            },
            {
                day: 6,
                open_time: saturdayTime
            },
        ]

        try {
            const response = await axios.patch(process.env.REACT_APP_API_URL + "/schedules/update/opening", newOpeningSchedule, {
                withCredentials: true
            })
            
            setEditSchedulesFormStatus(response.data)
            setStatusColor("green")
            setReload(!reload)
        } catch (error) {
            setEditSchedulesFormStatus(error.response.data)
            setStatusColor("red")
        }
    }
        
    // Handle time input change
    const handleTimeChange = (time, day) => {    
        switch(day) {
            case 0:
                setSundayTime(time)
                break
            case 1:
                setMondayTime(time)
                break
            case 2:
                setTuesdayTime(time)
                break    
            case 3:
                setWednesdayTime(time)
                break
            case 4:
                setThursdayTime(time)
                break
            case 5:
                setFridayTime(time)
                break
            case 6:
                setSaturdayTime(time)
                break
            default:
                return
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
        arie-controls="panel3-content"
        >
        <h2>
            Modifier les horaires d'ouverture
        </h2>
        </AccordionSummary>
        <AccordionDetails>
        <form onSubmit={handleEditSchedules}>
            <div style={{backgroundColor: "#363536", padding: 20, color: "#fff", marginBottom: "30px"}}>
                <strong>Planning de votre garage :</strong>
                <br />
                <br/>
                <ul style={{marginBottom: 20}}>
                    {schedules.map((schedule) => (
                        schedule.is_opened ? (
                            <li key={schedule.id}>
                                {schedule.day_name} : ouvert de <strong style={{color: "#f57c19"}}>{schedule.open_time.slice(0,5)}</strong> à {schedule.close_time.slice(0,5)}
                            </li>
                        ) : (
                            <li key={schedule.id}>
                                {schedule.day_name} : fermé
                            </li>
                        )
                    ))}
                </ul>
                <strong>Pour les jours fermés, veuillez mettre "00:00"</strong>
            </div>
            {editSchedulesFormStatus !== "" ? (
            <p style={{backgroundColor: statusColor}}>
                {editSchedulesFormStatus}
            </p>
            ) : ""}
            {schedules.map((schedule, index) => (
                <div className="form-item"  key={index}>
                <label htmlFor={schedule.id} style={{fontWeight: 700}}>
                    {schedule.day_name}
                </label>
                <input
                    type="time"
                    id={schedule.id}
                    value={schedule.day === 0 ? sundayTime : schedule.day === 1 ? mondayTime : schedule.day === 2 ? tuesdayTime : schedule.day === 3 ? wednesdayTime : schedule.day === 4 ? thursdayTime : schedule.day === 5 ? fridayTime : schedule.day === 6 ? saturdayTime : ""}
                    onChange={(e) => handleTimeChange(e.target.value, schedule.day)}
                />
                </div>
            ))}
            <button type="submit" className="submit">
            Modifier les horaires
            </button>
        </form>
        </AccordionDetails>
    </Accordion>
  )
}

export default EditOpeningSchedules