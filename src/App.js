// Pages
import Login from "./pages/Login"
import Home from "./pages/Home"

  // Router
  import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom"

  function App() {

    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </Router>
    );
  }

export default App;
