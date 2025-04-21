import React from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import Card from '../components/Card';


const Home = () => {
    return (
        <div className="home-container">
            <h1 className="title">Avícola Llano Grande SAS</h1>
            <p className="subtitle">Sistema de gestión de inventario y ventas de huevos</p>

            <div className="cards-container">
                {/* Inventario */}
                <Card>
                    <div className="card-icon green">
                        <i className="fas fa-box"></i>
                    </div>
                    <h2>Inventario</h2>
                    <p>Consulta el inventario actual de huevos por tipo y tamaño.</p>
                    <div className="options">
                        <button className="btn-option red">Rojos</button>
                        <button className="btn-option gray">Blancos</button>
                    </div>
                    <Link to="/inventario" className="btn green">Ver Inventario</Link>
                </Card>
                {/* Registrar Huevos */}
                <Card>
                    <div className="card-icon orange">
                        <i className="fas fa-egg"></i>
                    </div>
                    <h2>Registrar Huevos</h2>
                    <p>Añade huevos al inventario según su tipo y tamaño.</p>
                    <div className="options">
                        <button className="btn-option">A</button>
                        <button className="btn-option">AA</button>
                        <button className="btn-option">B</button>
                        <button className="btn-option">EXTRA</button>
                    </div>
                    <Link to="/registro-huevos" className="btn green">Registrar</Link>
                </Card>

                {/* Ventas */}
                <Card>
                    <div className="card-icon yellow">
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                    <h2>Ventas</h2>
                    <p>Realiza ventas de huevos y genera facturas.</p>
                    <div className="options">
                        <button className="btn-option lightgreen">Cubeta</button>
                        <button className="btn-option lightblue">Docena</button>
                    </div>
                    <Link to="/ventas" className="btn green">Realizar Venta</Link>
                </Card>
            </div>
        </div>
    );
};
export default Home
