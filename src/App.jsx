// importing comps
import Header from './components/Header'
import Footer from './components/Footer'


// routing
import { Outlet } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import './App.css'

function App() {

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}


export default App
