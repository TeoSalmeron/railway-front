// React
import { useState, useEffect } from "react"

// Material UI
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// Axios
import axios from "axios"

const Cars = () => {

    const [brand, setBrand] = useState("")
    const [allYears, setAllYears] = useState([])
    const [yearFrom, setYearFrom] = useState("")
    const [yearTo, setYearTo] = useState("")
    const [minKilometers, setMinKilometers] = useState("")
    const [maxKilometers, setMaxKilometers] = useState("")
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")

    const [formStatus, setFormStatus] = useState("")

    const [queryResponse, setQueryResponse] = useState([])
    
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
    ]

    function displayYears() {
        const endYear = new Date().getFullYear()
        const selectYears = []
        for (let i = 1900; i <= endYear; i++) {
            selectYears.push(i)
        }
        setAllYears(selectYears)
    }

    function renderNumber(number) {
        const numberToString = number.toString()
        if(numberToString.length <= 3) {
          return numberToString
        }
    
        if(numberToString.length === 4) {
          return `${numberToString.slice(0,1)} ${numberToString.slice(1)}`
        }
    
        if(numberToString.length === 5) {
          return `${numberToString.slice(0,2)} ${numberToString.slice(2)}`
        }
    
        if(numberToString.length === 6) {
          return `${numberToString.slice(0,3)} ${numberToString.slice(3)}`
        }
    
        if(numberToString.length === 7) {
          return `${numberToString.slice(0,1)} ${numberToString.slice(1,4)} ${numberToString.slice(4)}`
        }
    }

    const resetData = () => {
        setBrand("")
        setYearFrom("")
        setYearTo("")
        setMinKilometers("")
        setMaxKilometers("")
        setMinPrice("")
        setMaxPrice("")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData()

        if(brand === "" && yearFrom === "" && yearTo === "" && minPrice === "" && maxPrice === "" && minKilometers === "" && maxKilometers === "") {
            setFormStatus("Le formulaire est vide")
            setQueryResponse({})
            return
        }

        if(brand !== "") {
            formData.append("brand", brand)
            setFormStatus("")
        }

        if(yearFrom !== "" && yearTo !== "") {
            if(parseInt(yearFrom) > parseInt(yearTo)) {
               setFormStatus("La date minimum ne peut être supérieure à la date maximale") 
               return
            }
            formData.append("year_from", parseInt(yearFrom))
            formData.append("year_to", parseInt(yearTo))
            setFormStatus("")
        } else if ((yearFrom !== "" && yearTo === "") || (yearFrom === "" && yearTo !== "")) {
            setFormStatus("Veuillez sélectionner une seconde date")
            return
        }

        if(minPrice !== "" && maxPrice !== "") {
            if(parseInt(minPrice) > parseInt(maxPrice)) {
                setFormStatus("Le prix minimum ne peut être supérieur au prix maximum")
                return
            }
            formData.append("min_price", parseInt(minPrice))
            formData.append("max_price", parseInt(maxPrice))
            setFormStatus("")
        } else if ((minPrice !== "" && maxPrice === "") || (minPrice === "" && maxPrice !== "")) {
            setFormStatus("Veuillez sélectionner un second prix")
            return
        }

        if(minKilometers !== "" && maxKilometers !== "") {
            if(parseInt(minKilometers) > parseInt(maxKilometers)) {
                setFormStatus("Le kilométrage minimum ne peut être supérieur au kilométrage maximum")
                return
            }
            formData.append("min_kilometers", parseInt(minKilometers))
            formData.append("max_kilometers", parseInt(maxKilometers))
            setFormStatus("")
        } else if ((minKilometers !== "" && maxKilometers === "") || (minKilometers === "" && maxKilometers !== "")) {
            setFormStatus("Veuillez insérer une seconde valeur pour le kilométrage")
            return
        }
        
        try {
            await axios.post(process.env.REACT_APP_API_URL + "/cars/search", formData)
            .then((response) => {
                if(!response.data.results) {
                    setFormStatus(response.data.message)
                    setQueryResponse({})
                } else {
                    setQueryResponse(response.data.results)
                }
            })            
        } catch (error) {
            setFormStatus(error.response.data)
        }
    }

    useEffect(() => {
        displayYears()
    }, [])

  return (
    <section className="container" id="cars">
        <div className="container-md">
            <h1>
                Nos voitures d'occasions
            </h1>
            <p className="desc">
                Plongez dans notre sélection méticuleuse de voitures d'occasion, où chaque modèle promet non seulement fiabilité et performance, mais aussi une histoire unique à partager. Nos véhicules, soigneusement inspectés et entretenus, représentent l'opportunité parfaite de conduire une pièce d'exception sans compromis sur la qualité. Que vous recherchiez élégance, puissance, ou durabilité, notre gamme diversifiée répondra à vos attentes les plus précises. Faites le choix de l'excellence et de la tranquillité d'esprit avec notre collection de voitures d'occasion.
            </p>
            <h2 style={{marginBottom: 20}}>Effectuez une recherche</h2>
            <form onSubmit={handleSubmit}>
                {formStatus ? (
                    <>
                        <p style={{backgroundColor: "red", color: "#fff", padding: 10, margin: "10px 0px"}}>
                            {formStatus}
                        </p>
                        <br />
                    </>
                ) : ""}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        arie-controls="panel1-content"
                    >
                        Filtrer la recherche
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="form-item">
                            <label htmlFor="brand">
                                Marque
                            </label>
                            <select value={brand} onChange={(e) => setBrand(e.target.value)} id="brand">
                                <option value="">
                                    Choisissez la marque
                                </option>
                                {carBrands.map((car) => (
                                    <option value={car} key={car}>
                                        {car}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-item">
                            <label htmlFor="year">
                                Année de mise en circulation
                            </label>
                            <div>
                                <span>Entre : </span>
                                <select value={yearFrom} onChange={(e) => setYearFrom(e.target.value)}>
                                    <option value="">
                                        Choisissez l'année
                                    </option>
                                    {allYears.map((year) => (
                                        <option value={year} key={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <span>Et : </span>
                                <select value={yearTo} onChange={(e) => setYearTo(e.target.value)}>
                                    <option value="">
                                        Choisissez l'année
                                    </option>
                                    {allYears.map((year) => (
                                        <option value={year} key={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-item">
                            <label htmlFor="price">
                                Prix
                            </label>
                            <div>
                                <span>Entre : </span>
                                <input
                                    type="number"
                                    placeholder="Prix minimum"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    min={0}
                                />
                            </div>
                            <div>
                                <span>Et : </span>
                                <input
                                    type="number"
                                    placeholder="Prix maximum"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    min={0}
                                />
                            </div>
                        </div>
                        <div className="form-item">
                            <label htmlFor="kilometers">
                                Kilométrages
                            </label>
                            <div>
                                <span>Entre : </span>
                                <input
                                    type="number"
                                    placeholder="Kilométrage minimum"
                                    value={minKilometers}
                                    onChange={(e) => setMinKilometers(e.target.value)}
                                    min={0}
                                />
                            </div>
                            <div>
                                <span>Et : </span>
                                <input
                                    type="number"
                                    placeholder="Kilométrage maximum"
                                    value={maxKilometers}
                                    onChange={(e) => setMaxKilometers(e.target.value)}
                                    min={0}
                                />
                            </div>
                        </div>
                        <div className="buttons">
                            <button type="submit">
                                Rechercher
                            </button>
                            <button type="reset" onClick={resetData}>
                                Réinitialiser
                            </button>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </form>
            {queryResponse.length > 0 ? (
                <div className="searched-cars">
                    {queryResponse.map((car) => (
                        <div className="car-card" key={car.id}>
                            <h3>
                                {car.title}
                            </h3>
                            <div className="image-container" style={{backgroundImage:`url(${process.env.REACT_APP_API_URL}/images/${car.image})`, backgroundSize: "cover", backgroundPosition: "center"}}>
                            </div>
                            <ul>
                                <li>
                                    <strong>Marque : </strong> {car.brand}
                                </li>
                                <li>
                                    <strong>Année de mise en circulation : </strong> {car.year}
                                </li>
                                <li>
                                    <strong>Kilométrage : </strong> {renderNumber(car.kilometers)} km
                                </li>
                                <li>
                                    <strong>Prix : </strong> {renderNumber(car.price)} €
                                </li>
                                <li>
                                    <strong>Description : </strong> <br/> {car.description}
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            ) : ""}
        </div>
    </section>
  )
}

export default Cars