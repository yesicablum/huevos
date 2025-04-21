import { Link } from 'react-router-dom'


function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <span role="img" aria-label="huevo">🥚</span>
                <h1>Avícola Llano Grande</h1>
            </div>

            <ul className="navbar-links">
                <li>
                    <Link to="/"><i className="fas fa-home"></i><span>Inicio</span></Link>
                </li>
                <li>
                    <Link to="/inventario"><i className="fas fa-boxes"></i><span>Inventario</span></Link>
                </li>
                <li>
                    <Link to="/registro-huevos"><i className="fas fa-plus-circle"></i><span>Registrar</span></Link>
                </li>
                <li>
                    <Link to="/ventas"><i className="fas fa-shopping-cart"></i><span>Ventas</span></Link>
                </li>
            </ul>
        </nav>
    )
}



export default Navbar
