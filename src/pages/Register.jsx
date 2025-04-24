import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const RegisterEggs = () => {
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [count, setCount] = useState('');

    const clearForm = () => {
        setColor('');
        setSize('');
        setCount('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!color || !size || !count) {
            alert('Por favor completa todos los campos.');
            return;
        }

        try {
            await axios.post('https://app-huevos-backend.onrender.com/registro_huevos', {
                tipo_huevo: color,
                tamaño: size,
                cantidad: parseInt(count),
            });
            alert('Huevos registrados exitosamente.');
            clearForm();
        } catch (error) {
            console.error('Error al registrar huevos:', error);
            alert('Hubo un problema al registrar los huevos.');
        }
    };

    return (
        <div className="reg-box">
            <h1>🥚 Registro de Huevos</h1>
            <p>Añade huevos con color, tamaño y cantidad.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="color">Color</label>
                <select id="color" value={color} onChange={(e) => setColor(e.target.value)}>
                    <option value="">Selecciona un color</option>
                    <option value="red">Rojo</option>
                    <option value="white">Blanco</option>
                </select>

                <label htmlFor="size">Tamaño</label>
                <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
                    <option value="">Selecciona un tamaño</option>
                    <option value="A">A</option>
                    <option value="AA">AA</option>
                    <option value="B">B</option>
                    <option value="EXTRA">EXTRA</option>
                </select>

                <label htmlFor="count">Cantidad</label>
                <input
                    type="number"
                    id="count"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    min="1"
                />

                <div className="btns">
                    <button type="button" className="btn-clear" onClick={clearForm}>
                        Limpiar
                    </button>
                    <button type="submit" className="btn-submit">
                        Registrar Huevos
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterEggs;
