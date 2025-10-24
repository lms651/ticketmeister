import './App.css'
import Header from "./components/Header.jsx"
import LandingPage from "./components/LandingPage.jsx"
import Register from "./components/Register.jsx"
import Checkout from './components/Checkout.jsx'
import EventDetails from './components/EventDetails.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PurchaseComplete from './components/PurchaseComplete.jsx'
import React from "react"


function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);


  return (
    <Router>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path="/" element={<LandingPage loggedIn={loggedIn} />} />
        <Route path="/register" element={<Register setLoggedIn={setLoggedIn} />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/purchase" element={<PurchaseComplete />} />
      </Routes>
    </Router>
  )
}

export default App
