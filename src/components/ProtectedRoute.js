import { Navigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from "axios"

export default function ProtectedRoute({ children }) {
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL + "/auth",
                {
                    withCredentials: true
                })
                if (response.data.auth) {
                    setAuth(true)
                }
            } catch (error) {
                console.log(error.response.data)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    if (loading) {
        return <div>Chargement...</div>
    }

    return auth ? children : <Navigate to="/" replace/>
}
