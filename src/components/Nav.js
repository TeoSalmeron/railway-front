// React
import { useState } from "react"

// Axios
import axios from "axios"

// React Router
import { Link } from "react-router-dom"

// React Icons
import { HiMenu } from "react-icons/hi"
import { IoClose } from "react-icons/io5"
import { FaHome } from "react-icons/fa"
import { FaCar } from "react-icons/fa"
import { IoLogOut } from "react-icons/io5"
import { IoLogIn } from "react-icons/io5"
import { MdOutlineSpaceDashboard } from "react-icons/md"

const Nav = () => {
    const [active, setActive] = useState(false)
    const [logged, setLogged] = useState(false)
    const [role, setRole] = useState("")

    const isUserConnected = async () => {
        try {
            await axios.get(process.env.REACT_APP_API_URL + "/auth", {
                withCredentials: true
            })
            .then((response) => {
                if(response.data.auth) {
                    setLogged(true)
                    setRole(response.data.role)
                } else {
                    setLogged(false)
                }
            })
        } catch (error) {
            setLogged(false)
        }
    }

    isUserConnected()

  return (
    <>
        <nav id="mainNav">
            <div id="navItems">
                <Link to="/">
                    Garage Parrot
                </Link>
                <button type="button" onClick={() => setActive(!active)}>
                    <HiMenu />
                </button>
            </div>
        </nav>
        <ul id="navMenu" className={active ? "nav-active" : ""}>
            <button type="button" onClick={() => setActive(!active)}>
                <IoClose />
            </button>
            <li>
                <Link to="/" onClick={() => setActive(!active)}>
                    <FaHome />
                    Accueil
                </Link>
            </li>
            <li>
                <Link to="/cars" onClick={() => setActive(!active)}>
                    <FaCar />
                    Voitures d'occasion
                </Link>
            </li>
            { logged ? (
                <>
                    <li>
                        <Link to={`/dashboard/${role}`} onClick={() => setActive(!active)}>
                            <MdOutlineSpaceDashboard />
                            Tableau de bord
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout" onClick={() => setActive(!active)}>
                            <IoLogOut />
                            Se déconnecter
                        </Link>
                    </li>
                </>
            ) : (
                <li>
                    <Link to="/login" onClick={() => setActive(!active)}>
                        <IoLogIn />
                        Se connecter
                    </Link>
                </li>
            )}
        </ul>
    </>
  )
}

export default Nav