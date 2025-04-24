import React, { useEffect, useState } from 'react';
import '../App.css';
import FormSection from '../components/FormSection';
import SaleSummary from '../components/SaleSummary';
import { downloadInvoice, generateInvoice } from '../components/invoice';

const priceTable = {
    red: {
        A: 12000,
        AA: 13500,
        B: 11000,
        EXTRA: 15000,
    },
    white: {
        A: 10000,
        AA: 11500,
        B: 9500,
        EXTRA: 14000,
    },
};

export default function Sales() {
    const [form, setForm] = useState({
        client: '',
        cedula: '',
        clientType: '',
        color: '',
        size: '',
        unit: 'cubeta',
        quantity: '',
    });
    const [stock, setStock] = useState(null);
    const [stockError, setStockError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const [cart, setCart] = useState([]);
    const IVA = 0.05;

    useEffect(() => {
        const { color, size } = form;
        if (color && size) {
            fetch(`https://app-huevos-backend.onrender.com/consultar_stock?tipo_huevo=${color}&tamaño=${size}`)
                .then(res => {
                    if (!res.ok) throw new Error('Stock no disponible');
                    return res.json();
                })
                .then(data => {
                    setStock(data.stock);
                    setStockError('');
                })
                .catch(() => {
                    setStock(null);
                    setStockError('No hay stock disponible para este tipo y tamaño.');
                });
        } else {
            setStock(null);
            setStockError('');
        }
    }, [form.color, form.size]);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const calculatePrice = () => {
        const { color, size, unit } = form;
        if (!color || !size) return 0;

        const basePrice = priceTable[color]?.[size] || 0;
        const multiplier = unit === 'cubeta' ? 30 : 12;

        return basePrice * multiplier;
    };

    const addToCart = () => {
        const totalUnits = getTotalUnits();
        if (totalUnits > stock) {
            alert('La cantidad supera el stock disponible');
            return;
        }

        const item = {
            color: form.color,
            size: form.size,
            unit: form.unit,
            quantity: parseInt(form.quantity),
            price: calculatePrice(),
        };
        setCart([...cart, item]);
    };

    const getTotalUnits = () => {
        if (!form.quantity) return 0;
        const unitSize = form.unit === 'cubeta' ? 30 : 12;
        return parseInt(form.quantity) * unitSize;
    };

    const handleInvoice = () => {
        // Datos proporcionados
        const itemData = {
            color: form.color,
            size: form.size,
            unit: form.unit,
            quantity: parseInt(form.quantity),
            price: calculatePrice(),
        };
        // Crear objeto completo para la venta
        const sale = {
            client: {
            name: form.client,
            type: form.clientType,
            identification: form.cedula,
            },
            items: [
            {
                ...itemData,
                unitPrice: itemData.price,
                subtotal: itemData.price * itemData.quantity
            }
            ],
            subtotal: itemData.price * itemData.quantity,
            iva: itemData.price * itemData.quantity * IVA,
            total: itemData.price * itemData.quantity * (1 + IVA),
            date: new Date()
        };
        // Generar la factura
        const invoice = generateInvoice(sale);
        console.log(invoice);
        // Para descargar la factura
        downloadInvoice(invoice, sale.client.name);
    };

    const completeSale = async () => {
        // Validaciones básicas
        if (!form.client || !form.cedula || !form.clientType || cart.length === 0) {
            setMessage({ text: 'Complete todos los campos y añada productos al carrito', type: 'error' });
            return;
        }

        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            // Procesar cada item del carrito
            for (const item of cart) {
                const endpoint = form.clientType.toLowerCase() === 'juridica'
                    ? 'https://app-huevos-backend.onrender.com/venta_huevos_juridica'
                    : 'https://app-huevos-backend.onrender.com/venta_huevos';

                const saleData = {
                    tipo_cliente: form.clientType.toLowerCase(),
                    unidad: item.unit,
                    tipo_huevo: item.color,
                    tamaño: item.size,
                    cantidad: item.quantity
                };

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(saleData)
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Error al procesar la venta');
                }
            }

            // Si todo fue exitoso
            setMessage({ text: 'Venta registrada correctamente', type: 'success' });
            handleInvoice();
            // Limpiar el carrito y resetear el formulario
            setCart([]);
            setForm({
                client: '',
                cedula: '',
                clientType: '',
                color: '',
                size: '',
                unit: 'cubeta',
                quantity: '',
            });
        } catch (error) {
            setMessage({ text: error.message, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * IVA;
    const total = subtotal + tax;

    return (
        <div className="sales-wrap">
            <h1>🛒 Ventas</h1>
            <p>Realice ventas de huevos y genere facturas para sus clientes.</p>

            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="sales-main">
                {/* Formulario */}
                <FormSection
                    form={form}
                    handleChange={handleChange}
                    stock={stock}
                    stockError={stockError}
                    getTotalUnits={getTotalUnits}
                    addToCart={addToCart}
                />

                {/* Resumen */}
                <SaleSummary
                    form={form}
                    cart={cart}
                    subtotal={subtotal}
                    tax={tax}
                    total={total}
                    completeSale={completeSale}
                    loading={loading}
                />

            </div>
        </div>
    );
}