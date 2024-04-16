import axios from "axios"
import { useEffect, useState } from "react"

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL)
    .then((response) => {
      setUsers(response.data)
    }) 
    .catch((err) => {
      console.log(err.response)
    })
  }, [])

  return (
    <div className="App">
      {users.map((user) => (
        <div key={user.id}>
          {user.email} <br/>
        </div>
      ))}
    </div>
  );
}

export default App;
