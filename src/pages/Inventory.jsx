import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Inventory = () => {
    const [inventory, setInventory] = useState({ red: [], white: [], total: 0 });

    useEffect(() => {
        axios.get('http://localhost:8000/api/inventory/')  // Ajusta la URL si es necesario
            .then(response => {
                setInventory(response.data);
            })
            .catch(error => console.error('Error cargando inventario:', error));
    }, []);

    return (
        <div className="inventory-container">
            <h1><i className="fas fa-cube"></i> Inventario de Huevos</h1>
            <p className="subtext">Consulta el inventario actual de huevos clasificados por color y tamaño.</p>

            <div className="egg-groups">
                <div className="group red-eggs">
                    <h2>Huevos Rojos</h2>
                    <span className="group-total">Total: {inventory.red.reduce((acc, item) => acc + item.count, 0)}</span>
                    <div className="egg-list">
                        {inventory.red.map((item, idx) => (
                            <div key={idx} className="egg-card">
                                <span className="egg-label">Tamaño:</span>
                                <span className="egg-size">{item.size}</span>
                                <span className="egg-label">Cantidad:</span>
                                <span className="egg-count">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="group white-eggs">
                    <h2>Huevos Blancos</h2>
                    <span className="group-total">Total: {inventory.white.reduce((acc, item) => acc + item.count, 0)}</span>
                    <div className="egg-list">
                        {inventory.white.map((item, idx) => (
                            <div key={idx} className="egg-card">
                                <span className="egg-label">Tamaño:</span>
                                <span className="egg-size">{item.size}</span>
                                <span className="egg-label">Cantidad:</span>
                                <span className="egg-count">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="total-summary">
                <h2>Total en Inventario</h2>
                <p className="total-eggs">{inventory.total} huevos</p>
                <p className="detail">49 cubetas completas y 8 huevos sueltos</p>
            </div>
        </div>
    );
};

export default Inventory;
