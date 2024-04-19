import { useState } from "react"

// Material UI
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// Axios
import axios from "axios"


const NewEmployee = () => {

    // new Employee data //
    const [employeeEmail, setEmployeeEmail] = useState("")
    const [employeePassword, setEmployeePassword] = useState("")
    const [employeeConfirmPassword, setEmployeeConfirmPassword] = useState("")
    const [employeeFormStatus, setEmployeeFormStatus] = useState("")
    const [employeeFormStatusColor, setEmployeeFormStatusColor] = useState("")

    // Handle new Employee form //
    const handleCreateNewEmployee = (event) => {
        event.preventDefault()
        const employee = {
            email: employeeEmail,
            password: employeePassword,
            confirmPassword: employeeConfirmPassword
        }
        axios.post(process.env.REACT_APP_API_URL + "/create-employee", employee, {
            withCredentials: true
        })
        .then((response) => {
            setEmployeeFormStatus(response.data)
            setEmployeeFormStatusColor("green")
        })
        .catch((error) => {
            setEmployeeFormStatus(error.response.data)
            setEmployeeFormStatusColor("red")
        })
    }

  return (
    <Accordion className="accordion">
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        arie-controls="panel1-content"
        >
        <h2>
            Créer un compte employé
        </h2>
        <br />
        </AccordionSummary>
        <AccordionDetails>
        <form onSubmit={handleCreateNewEmployee}>
            {employeeFormStatus !== "" ? (
            <p style={{backgroundColor: "unset", color: employeeFormStatusColor, textAlign: "center"}}>
                { employeeFormStatus }
            </p>
            ) : ""}
            <input 
            type="email"
            name="employee_email"
            id="employeeEmail"
            placeholder="E-mail"
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
            required
            />
            
            <p>
            Le mot de passe doit faire au moins 8 caractères, avoir une minuscule, une majuscule, un chiffre et un caractère spécial "@$!%*?&".
            </p>
            
            <input
            type="password"
            name="employee_password"
            id="employeePassword"
            placeholder="Mot de passe"
            value={employeePassword}
            onChange={(e) => setEmployeePassword(e.target.value)}
            required
            />
            
            <input
            type="password"
            name="employee_confirm_password"
            id="employeeConfirmPassword"
            placeholder="Confirmez le mot de passe"
            value={employeeConfirmPassword}
            onChange={(e) => setEmployeeConfirmPassword(e.target.value)}
            required
            />
            <button type="submit" className="submit">
            Créer le compte
            </button>
        </form>
        </AccordionDetails>
    </Accordion>
  )
}

export default NewEmployee