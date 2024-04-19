// React
import { useState } from "react"

// Axios
import axios from "axios"

// Material UI
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const NewCar = () => {

  // Car data
  const [title, setTitle] = useState("")
  const [brand, setBrand] = useState("")
  const [year, setYear] = useState("")
  const [kilometers, setKilometers] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [formStatus, setFormStatus] = useState("")
  const [formStatusColor, setFormStatusColor] = useState("")
  
  const handleSubmit = async (event) => {
    event.preventDefault()

    if(title === "") {
      setFormStatus("Veuillez indiquer un titre pour l'annonce")
      setFormStatusColor("red")
      return
    } else {
      setFormStatus("")
    }

    if(brand === "") {
      setFormStatus("Veuillez sélectionner une marque pour l'annonce")
      setFormStatusColor("red")
      return
    } else {
      setFormStatus("")
    }

    if(year === "") {
      setFormStatus("Veuillez indiquer une année de mise en circulation pour l'annonce")
      setFormStatusColor("red")
      return
    } else {
      setFormStatus("")
    }

    if(kilometers === "") {
      setFormStatus("Veuillez indiquer un kilométrage pour l'annonce")
      setFormStatusColor("red")
      return
    } else {
      setFormStatus("")
    }

    if(price === "") {
      setFormStatus("Veuillez indiquer un prix pour l'annonce")
      setFormStatusColor("red")
      return
    } else {
      setFormStatus("")
    }

    const file = event.target[5].files[0]

    if(!file) {
      setFormStatusColor("red")
      setFormStatus("Veuillez ajouter une image pour l'annonce")
      return 
    } else {
      setFormStatus("")
    }

    if(file.size > 5242880) {
      setFormStatusColor("red")
      setFormStatus("Le fichier est trop lourd")
      return
    } else {
      setFormStatus("")
    }

    if(!(file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/webp")) {
      setFormStatusColor("red")
      setFormStatus("Le format du fichier est incorrect")
      return
    } else {
      setFormStatus("")
    }
    
    if(description === "") {
      setFormStatusColor("red")
      setFormStatus("Veuillez insérer une description pour l'annonce")
      return
    } else {
      setFormStatus("")
    }

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("year", year)
      formData.append("kilometers", kilometers)
      formData.append("brand", brand)
      formData.append("price", price)
      formData.append("description", description)
      formData.append("image", file)
      formData.append("garage_id", 1)

      const response = await axios.post(process.env.REACT_APP_API_URL + "/cars/create", formData)
      
      setFormStatus(response.data)
      setFormStatusColor("green")
      
    } catch (error) {
      setFormStatusColor("red")
      setFormStatus(error.response)
    }
  }

  const carBrands = [
    "Acura",
    "Alfa Romeo",
    "Aston Martin",
    "Audi",
    "Bentley",
    "BMW",
    "Bugatti",
    "Buick",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Citroën",
    "Dacia",
    "Daewoo",
    "Daihatsu",
    "Dodge",
    "Ferrari",
    "Fiat",
    "Ford",
    "Genesis",
    "GMC",
    "Honda",
    "Hyundai",
    "Infiniti",
    "Isuzu",
    "Jaguar",
    "Jeep",
    "Kia",
    "Koenigsegg",
    "Lamborghini",
    "Lancia",
    "Land Rover",
    "Lexus",
    "Lincoln",
    "Lotus",
    "Maserati",
    "Maybach",
    "Mazda",
    "McLaren",
    "Mercedes-Benz",
    "Mercury",
    "MG",
    "Mini",
    "Mitsubishi",
    "Nissan",
    "Opel",
    "Pagani",
    "Peugeot",
    "Pontiac",
    "Porsche",
    "RAM",
    "Renault",
    "Rolls-Royce",
    "Saab",
    "Saturn",
    "Scion",
    "Seat",
    "Škoda",
    "Smart",
    "Subaru",
    "Suzuki",
    "Tesla",
    "Toyota",
    "Vauxhall",
    "Volkswagen",
    "Volvo"
  ];
  
  return (
    <Accordion className='accordion'>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        arie-controls="panel1-content"
      >
        <h2>
            Créer une voiture d'occasion
        </h2>
      </AccordionSummary>
      <AccordionDetails>
        {formStatus !== "" ? (
          <p style={{backgroundColor: formStatusColor, padding: 10, color: "#fff", marginBottom: 20}}>
            {formStatus}
          </p>
        ) : ""}
        <form onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="title">
              Titre de l'annonce
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de l'annonce"
            />
          </div>
          <div className="form-item" style={{marginBottom: 20}}>
            <label htmlFor="brand">
              Marque
            </label>
            <select value={brand} onChange={(e) => setBrand(e.target.value)} id="brand">
              <option value="" disabled>
                Choisir la marque
              </option>
              {carBrands.map((car) => (
                <option key={car} value={car}>
                  {car}
                </option>
              ))}
            </select>
          </div>
          <div className="form-item">
            <label htmlFor="year">
              Année de mise en circulation
            </label>
            <input
              placeholder="Année"
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="form-item">
              <label htmlFor="kilometers">
                Kilométrage
              </label>
              <input
                type="number"
                id="kilometers"
                value={kilometers}
                onChange={(e) => setKilometers(e.target.value)}
                placeholder="Kilométrage"
              />
          </div>
          <div className="form-item">
              <label htmlFor="price">
                Prix
              </label>
              <input
                placeholder="Prix"
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="image">
              Image
            </label>
            <small>
              L'image doit être au format jpg, jpeg, png ou webp et ne doit pas excéder 5mo
            </small>
            <input 
              type="file"
              accept=".jpg, .jpeg, .png, .webp"
            />
          </div>
          <div className="form-item">
              <label htmlFor="description">
                Description 
              </label>
              <textarea
                placeholder="Description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{resize: "none", maxWidth: "unset", height: "300px"}}
              >

              </textarea>
          </div>
          <button type="submit" className="submit">
              Créer la nouvelle annonce
          </button>
        </form>
      </AccordionDetails>
    </Accordion>
  )
}

export default NewCar