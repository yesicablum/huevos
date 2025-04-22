import React, { useState } from 'react';
import '../App.css';

export default function Sales() {
    const [form, setForm] = useState({
        client: '',
        color: '',
        size: '',
        unit: 'cubeta',
        quantity: '',
    });

    const [cart, setCart] = useState([]);
    const IVA = 0.05;

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const addToCart = () => {
        const item = {
            color: form.color,
            size: form.size,
            unit: form.unit,
            quantity: parseInt(form.quantity),
            price: 18000, // ejemplo fijo, podrías calcular según unidad
        };
        setCart([...cart, item]);
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * IVA;
    const total = subtotal + tax;

    return (
        <div className="sales-wrap">
            <h1>🛒 Ventas</h1>
            <p>Realice ventas de huevos y genere facturas para sus clientes.</p>

            <div className="sales-main">
                {/* Formulario */}
                <div className="sales-form">
                    <h2>Nueva Venta</h2>
                    <p>Seleccione el cliente y los productos para realizar la venta</p>

                    <label>Cliente</label>
                    <select name="client" value={form.client} onChange={handleChange}>
                        <option value="">Seleccione</option>
                        <option value="María López">María López (Persona Natural)</option>
                    </select>
                    <small>Cliente natural: Puede comprar por cubeta o docena</small>

                    <div className="row">
                        <div>
                            <label>Color</label>
                            <select name="color" value={form.color} onChange={handleChange}>
                                <option value="">Seleccione</option>
                                <option value="Rojo">Rojo</option>
                                <option value="Blanco">Blanco</option>
                            </select>
                        </div>
                        <div>
                            <label>Tamaño</label>
                            <select name="size" value={form.size} onChange={handleChange}>
                                <option value="">Seleccione</option>
                                <option value="A">A</option>
                                <option value="AA">AA</option>
                                <option value="B">B</option>
                                <option value="EXTRA">EXTRA</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div>
                            <label>Unidad de Venta</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="unit"
                                        value="cubeta"
                                        checked={form.unit === 'cubeta'}
                                        onChange={handleChange}
                                    />
                                    Cubeta (30 unidades)
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="unit"
                                        value="docena"
                                        checked={form.unit === 'docena'}
                                        onChange={handleChange}
                                    />
                                    Docena (12 unidades)
                                </label>
                            </div>
                        </div>
                        <div>
                            <label>Cantidad</label>
                            <input
                                type="number"
                                name="quantity"
                                value={form.quantity}
                                onChange={handleChange}
                            />
                            <small>Seleccione color, tamaño y unidad para ver precios</small>
                        </div>
                    </div>

                    <button className="btn-add" onClick={addToCart}>➕ Añadir al Carrito</button>
                </div>

                {/* Resumen */}
                <div className="sales-summary">
                    <h2>Resumen de Venta</h2>
                    <p>Cliente: {form.client}</p>

                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.color} {item.size} <br /><small>{item.quantity} {item.unit}s</small></td>
                                    <td>${(item.quantity * item.price).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="summary-totals">
                        <p>Subtotal: <b>${subtotal.toLocaleString()}</b></p>
                        <p>IVA (5%): <b>${tax.toLocaleString()}</b></p>
                        <h3>Total: ${total.toLocaleString()}</h3>
                        <button className="btn-complete">🧾 Completar Venta</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
