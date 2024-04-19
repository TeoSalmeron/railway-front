// React
import { useState, useEffect } from "react"

// React router
import { Link } from "react-router-dom"

// React icons
import { MdCarRepair } from "react-icons/md"
import { GiAutoRepair } from "react-icons/gi"
import { FaMoneyBillWave } from "react-icons/fa"
import { MdOutlineTipsAndUpdates } from "react-icons/md"
import { RiStarSFill } from "react-icons/ri"

// Material UI
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

// Axios
import axios from "axios"

// Components
import Footer from "../components/Footer"

const Home = () => {
  // Reviews data
  const [reviews, setReviews] = useState([])
  const [score, setScore] = useState("")
  const [comment, setComment] = useState("")
  const [newReviewStatus, setNewReviewStatus] = useState("")
  const [newReviewStatusColor, setNewReviewStatusColor] = useState("")

  // Cars data
  const [latestCars, setLatestCars] = useState([])

  // Create new review from customer
  const handleReviewSubmit = async (event) => {
    event.preventDefault()

    if(score === "" || score === null || comment === "") {
      setNewReviewStatusColor("#880000")
      setNewReviewStatus("Des données sont manquantes dans le formulaire")
    }
    
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + "/reviews/create", {
        score: parseInt(score),
        comment: comment,
        verified: false
      })
      
      setNewReviewStatusColor("green")
      setNewReviewStatus(response.data)
    } catch (error) {
      setNewReviewStatusColor("#880000")
      setNewReviewStatus(error.response.data)

    }
  }

  function reviewDate(date) {
  
    const parts = date.slice(0,10).split("-")
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`
    return formattedDate
  }

  function renderStars(score) {
    let stars = []
    for (let i = 0; i < score; i++) {
      stars.push(<RiStarSFill className="star" key={i}/>)
    }
    return stars

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

  // Get verified reviews
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "/reviews/verified")
    .then((response) => {
      setReviews(response.data)
    })
    .catch((error) => {
      console.log(error.response)
    })
  }, [])

  // Get 3 last cars
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "/cars/latest")
    .then((response) => {
      setLatestCars(response.data)
    })
    .catch((error) => {
      console.log(error.response)
    })
  }, [])

  return (
    <section className="container" id="home">
      <header>
        <h1>
          Votre Compagnon de Route <span>Fiable</span> et <span>Expérimenté</span>
        </h1>
        <p>
          Plongez au cœur de notre passion pour l'automobile. Notre garage, fort d'une expérience reconnue, s'engage à offrir expertise et conseils personnalisés. Ici, chaque véhicule raconte une histoire, soigneusement préservée par nos soins. Découvrez un lieu où tradition et innovation se rencontrent pour redéfinir l'excellence.
        </p>
        <Link to="/cars" className="call-to-action">
          Voir nos voitures
        </Link>
      </header>
      <section className="container-md services">
        <h2>
          Nos Services
        </h2>
        <ul>
          <li>
            <MdCarRepair />
            <strong>Entretien et Réparation</strong>
            Notre équipe de mécaniciens certifiés utilise les dernières technologies pour diagnostiquer et réparer votre véhicule avec précision, garantissant sa performance optimale.
          </li>
          <li>
            <GiAutoRepair />
            <strong>Restauration de Véhicules Anciens</strong>
            Nous redonnons vie à votre héritage automobile grâce à notre service de restauration spécialisé, où chaque détail compte pour restaurer la gloire d'origine de votre précieux véhicule.
          </li>
          <li>
            <FaMoneyBillWave />
            <strong>Vente de Véhicules d'Occasion</strong>
            Découvrez notre sélection rigoureusement choisie de véhicules d'occasion. Chaque voiture a été inspectée minutieusement par nos experts pour assurer sa qualité et sa fiabilité.
          </li>
          <li>
            <MdOutlineTipsAndUpdates />
            <strong>Conseils Personnalisés</strong>
            Que vous soyez à la recherche d'un nouveau véhicule ou que vous ayez besoin de conseils pour entretenir votre voiture actuelle, notre équipe est là pour vous offrir un accompagnement sur mesure.
          </li>
        </ul>
      </section>
      <section className="container about">
        <div className="container-md">
          <h2>
            Pourquoi choisir le Garage Parrot ?
          </h2>
          <ul>
            <li>
              <strong>Expertise Reconnue : </strong>
              Découvrez un monde où l'excellence mécanique et le soin du détail règnent en maîtres. Nos techniciens, véritables orfèvres de l'automobile, déploient leur savoir-faire pour répondre à vos besoins avec précision et diligence.
            </li>
            <li>
              <strong>Une Histoire de Passion : </strong>
              Chaque voiture a son histoire, et au Garage Parrot, nous écrivons le prochain chapitre. Que ce soit par une restauration minutieuse de classiques ou par la maintenance méticuleuse de votre quotidien, votre véhicule est entre les mains d'experts passionnés.            
            </li>
            <li>
              <strong>Services Sur Mesure : </strong>
              Nous comprenons que chaque conducteur et chaque voiture est unique. C'est pourquoi nous offrons des solutions personnalisées, du conseil à l'achat jusqu'à l'entretien, pour que votre expérience soit parfaitement adaptée à vos attentes.
            </li>
          </ul>
          <h3>
            Engagement envers la Communauté
          </h3>
          <p>
            Au-delà des services, le Garage Parrot est un pilier de la communauté locale, participant activement à des événements et soutenant des initiatives qui nous tiennent à cœur. Nous croyons en la force de la communauté et en l'importance de redonner, pour bâtir ensemble un avenir meilleur.
          </p>
          <h3>
            Innovation et Tradition
          </h3>
          <p>
            Marchant à la croisée des chemins entre tradition et modernité, notre garage incarne l'harmonie parfaite entre les techniques éprouvées et les technologies de pointe. Cette fusion nous permet de vous offrir le meilleur des deux mondes, garantissant performance, sécurité et satisfaction.
          </p>
          <p>
            Votre aventure automobile commence ici, au Garage Parrot. Venez découvrir un espace où vos attentes sont non seulement rencontrées, mais dépassées. Visitez-nous et ressentez la différence que seul le Garage Parrot peut offrir.
          </p>
        </div>
      </section>
      <section className="container-md cars">
        <h2>
          Nos voitures
        </h2>
        <p className="desc">
        Explorez nos dernières arrivées : trois merveilles alliant performance et esthétique, prêtes à transformer chaque voyage en expérience exceptionnelle. Découvrez-les et laissez-vous séduire par l'innovation et le design.
        </p>
        <div className="latest-cars">
          {latestCars.map((car) => (
            <div className="latest-car" key={car.id}>
              <div className="car-image">
                <img src={process.env.REACT_APP_API_URL + "/images/" + car.image} alt={car.title}/>
              </div>
              <h3>
                {car.title}
              </h3>
              <p>
                <strong>Marque : </strong> {car.brand}
              </p>
              <p>
                <strong>Année de mise en circulation : </strong> {car.year}
              </p>
              <p>
                <strong>Kilométrages : </strong> {renderNumber(car.kilometers)} km
              </p>
              <p>
                <strong>Prix : </strong> {renderNumber(car.price)} €
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="container-md reviews">
        <h2>
          Les avis de nos clients
        </h2>
        <div className="reviews-list">
          {reviews.map((review) => (
            <div className="review" key={review.id}>
              <div key={review.id}>
                {renderStars(review.score)}
              </div>
              <div className="review-date">
                Posté le {reviewDate(review.createdAt)}
              </div>
              <div>
                {review.comment}
              </div>
            </div>
          ))}
        </div>
        <h2 style={{marginBottom: 40 }}>
          Partagez votre expérience chez nous !
        </h2>
        <form onSubmit={handleReviewSubmit}>
          {newReviewStatus !== "" ? (
            <p style={{marginBottom: 20,backgroundColor: newReviewStatusColor, color: "#fff", padding: "10px", fontFamily: "'Open Sans', sans-serif", fontSize: "0.9rem"}}>
              {newReviewStatus}
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
              <label htmlFor="comment">
                Commentaire :
              </label>
              <textarea
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Insérez votre commentaire"
              >
              </textarea>
              <button type="submit" className="submit">
                Envoyer votre avis
              </button>
            </div>
        </form>
      </section>
      <Footer />
    </section>
  )
}

export default Home