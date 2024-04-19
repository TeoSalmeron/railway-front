// React
import { useState } from "react"

// Material UI
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'



// Axios
import axios from "axios"

const NewReview = () => {
  // Review data
  const [score, setScore] = useState("")
  const [comment, setComment] = useState("")
  const [formStatus, setFormStatus] = useState("")
  const [formStatusColor, setFormStatusColor] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    if(score === "" || comment === "") {
      setFormStatus("Des données sont manquantes dans le formulaire")
      return
    } else {
      try {
        const response = await axios.post(process.env.REACT_APP_API_URL + "/reviews/create",
          {
            score: parseInt(score),
            comment: comment,
            verified: true
          },
          {
            withCredentials: true
          })

        setFormStatusColor("green")
        setFormStatus(response.data)
      } catch (error) {
        setFormStatusColor("red")
        setFormStatus(error.response.data)
      }
    }
  }
  return (
    <Accordion className='accordion'>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        arie-controls="panel2-content"
      >
        <h2>
            Poster un nouvel avis
        </h2>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit}>
          {formStatus ? (
            <p style={{backgroundColor: formStatusColor}}>
              {formStatus}
            </p>
          ) : ""}
          <FormControl variant="standard">
            <InputLabel id="score">Note</InputLabel>
            <Select
              labelId="score"
              id="selectScore"
              value={score}
              label="Note"
              onChange={(e) => setScore(e.target.value)}
              style={{width: 60, marginBottom: 20}}
              required
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <div className="form-item">
            <label htmlFor="comment" style={{marginBottom: "20px"}}>
              Commentaire :
            </label>
            <textarea
              placeholder="Insérez le commentaire"
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            > 

            </textarea>
          </div>
          <button type="submit" className="submit"> 
            Créer le nouvel avis
          </button>
        </form>
      </AccordionDetails>
    </Accordion>
  )
}

export default NewReview