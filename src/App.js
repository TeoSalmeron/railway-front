// Pages
import Login from "./pages/Login"
import Home from "./pages/Home"
import DashboardAdmin from "./pages/DashboardAdmin"
import Logout from "./pages/Logout"
// Components
import ProtectedRoute from "./components/ProtectedRoute"
import Nav from "./components/Nav"

// Router
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import DashboardEmployee from "./pages/DashboardEmployee"

  function App() {

    return (
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/dashboard/admin" element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          }/>
          <Route path="/dashboard/employee" element={
            <ProtectedRoute>
              <DashboardEmployee />
            </ProtectedRoute>
          }/>
        </Routes>
      </Router>
    );
  }

export default App;
