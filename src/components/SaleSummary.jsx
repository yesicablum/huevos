import React from 'react';

export default function SaleSummary({ form, cart, subtotal, tax, total, completeSale, loading }) {
    return (
        <div className="sales-summary">
            <h2>Resumen de Venta</h2>
            <p>Cliente: {form.client} ({form.clientType})</p>
            <p>Cédula: {form.cedula}</p>

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
                            <td>{item.color === 'red' ? 'Rojo':'Blanco'} {item.size} <br /><small>{item.quantity} {item.unit}s</small></td>
                            <td>${(item.quantity * item.price).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="summary-totals">
                <p>Subtotal: <b>${subtotal.toLocaleString()}</b></p>
                <p>IVA (5%): <b>${tax.toLocaleString()}</b></p>
                <h3>Total: ${total.toLocaleString()}</h3>
                <button
                    className="btn-complete"
                    onClick={completeSale}
                    disabled={loading || cart.length === 0}
                >
                    {loading ? 'Procesando...' : '🧾 Completar Venta'}
                </button>
            </div>
        </div>
    );
}
