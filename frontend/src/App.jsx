import './App.css'
import Header from "./components/Header.jsx"
// import LandingPage from "./components/LandingPage.jsx"
// import Register from "./components/Register.jsx"
import Checkout from './components/Checkout.jsx'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {

  return (
    <>
    <Header />
    {/* <LandingPage /> */}
    {/* <Register /> */}
    <Checkout />
    </>
  )
}

export default App
