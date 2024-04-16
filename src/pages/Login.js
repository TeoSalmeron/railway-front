// React
import { useState } from "react"

// React router
import { Link } from "react-router-dom"


// React icons
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"

// React auth kit
// import useSignIn from "react-auth-kit/hooks/useSignIn"

// Axios
import axios from "axios"

const Login = () => {
    // React auth kit
    // const signIn = useSignIn()

    // Email
    const [email, setEmail] = useState("")

    // Password
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    // Form status
    const [formStatus, setFormStatus] = useState("")

    // Form submit
    const handleSubmit = (event) => {
        event.preventDefault()

        axios.post(process.env.REACT_APP_API_URL + "/login", {
            email: email,
            password: password
        },
        {
          withCredentials: true
        })
        .then((response) => {
            if(response.data.token) {
                if(response.data.user.role === "admin") {
                    window.location.assign("/dashboard/admin")
                } else if (response.data.user.role === "employee") {
                    window.location.assign("/dashboard/employee")
                }
            } else {
                setFormStatus("Impossible de procéder à la redirection")
            }
        })  
        .catch((error) => {
            setFormStatus(error.response.data)
        })
    }

  return (
    <div className="container" id="login">
        <>
            <h1>
                Se connecter
            </h1>
            <form onSubmit={handleSubmit} className="form">
                <p>
                    Connectez-vous à votre compte
                </p>
                { formStatus !== "" ? (
                    <p style={{color: "red"}}>
                        {formStatus}
                    </p>
                ) : ""}
                <div className="form-item">
                    <div className="label-box">
                        <label htmlFor="email">
                            E-mail
                        </label>
                    </div>
                    <input 
                        type="email"
                        placeholder="E-mail"
                        id="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-item" style={{marginBottom: 30}}>
                    <div className="label-box">
                        <label htmlFor="password">
                            Mot de passe
                        </label>
                    </div>
                    <div className="password-box">
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe"
                            required
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            { showPassword ? (
                                <FaEyeSlash />
                            ) : (
                                <FaEye />
                            )}
                        </button>
                    </div>
                </div>
                <button className="submit-btn call-to-action">
                    Se connecter
                </button>
                <Link to="/mot-de-passe-oublie">
                    Mot de passe oublié
                </Link>
            </form>
        </>
    </div>
  )
}

export default Login