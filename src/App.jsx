import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Sales from './pages/Sales'
import Inventory from './pages/Inventory'
import Register from './pages/Register'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventario" element={<Inventory />} />
        <Route path="/registro-huevos" element={<Register />} />
        <Route path="/ventas" element={<Sales />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
