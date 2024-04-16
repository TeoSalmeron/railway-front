// Pages
import Login from "./pages/Login"
import Home from "./pages/Home"
import DashboardAdmin from "./pages/DashboardAdmin"

// Components
import ProtectedRoute from "./components/ProtectedRoute"

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
          <Route path="/dashboard/admin" element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          }/>
        </Routes>
      </Router>
    );
  }

export default App;
