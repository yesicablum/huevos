import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <h2>🐣 HuevosApp</h2>
            <ul >
                <li><Link to="/" >Inicio</Link></li>
                <li><Link to="/inventario" >Inventario</Link></li>
                <li><Link to="/registro-huevos" >Registro</Link></li>
                <li><Link to="/ventas" >Ventas</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
