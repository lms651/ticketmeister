import './App.css'
import Header from "./components/Header.jsx"
import LandingPage from "./components/LandingPage.jsx"
import Register from "./components/Register.jsx"
import Checkout from './components/Checkout.jsx'
import EventDetails from './components/EventDetails.jsx'
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { CartProvider } from "react-use-cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  )
}

export default App
