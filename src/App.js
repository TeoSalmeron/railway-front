// Pages
import Login from "./pages/Login"
import Home from "./pages/Home"

// React auth kit
import createStore from 'react-auth-kit/createStore'
import AuthProvider from 'react-auth-kit'

// Router
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
})

function App() {

  return (
    <AuthProvider
      store={store}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
