import React from 'react';

const FormSection = ({ form, handleChange, stock, stockError, getTotalUnits, addToCart }) => {
    return (
        <div className="sales-form">
            <h2>Nueva Venta</h2>
            <p>Digita el nombre del cliente, selecciona el tipo y los productos para realizar la venta</p>

            <div className="row">
                <div>
                    <label>Nombre del Cliente</label>
                    <input
                        type="text"
                        name="client"
                        value={form.client}
                        onChange={handleChange}
                        placeholder="Ej. María López"
                    />
                </div>
                <div>
                    <label>Cédula</label>
                    <input
                        type="text"
                        name="cedula"
                        value={form.cedula}
                        onChange={handleChange}
                        placeholder="Ej. 1234567890"
                    />
                </div>
                <div>
                    <label>Tipo de Cliente</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="clientType"
                                value="natural"
                                checked={form.clientType === 'natural'}
                                onChange={handleChange}
                            />
                            Persona Natural
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="clientType"
                                value="juridica"
                                checked={form.clientType === 'juridica'}
                                onChange={handleChange}
                            />
                            Persona Jurídica
                        </label>
                    </div>
                </div>
            </div>

            <small>Cliente natural: Puede comprar por cubeta o docena</small>
            <small>Cliente jurídico: Puede comprar por cubeta </small>

            <div className="row">
                <div>
                    <label>Color</label>
                    <select name="color" value={form.color} onChange={handleChange}>
                        <option value="">Seleccione</option>
                        <option value="red">Rojo</option>
                        <option value="white">Blanco</option>
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

            {stock !== null && <small>Stock disponible: {stock} unidades</small>}
            {stockError && <small style={{ color: 'red' }}>{stockError}</small>}

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
                        {form.clientType === 'natural' && (
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
                        )}
                    </div>
                </div>

                <div>
                    <label>Cantidad</label>
                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        min="1"
                        max={stock ? Math.floor(stock / (form.unit === 'cubeta' ? 30 : 12)) : ''}
                        disabled={!form.unit || !stock}
                    />
                    {stock && form.quantity && getTotalUnits() > stock && (
                        <small style={{ color: 'red' }}>
                            No puede superar el stock disponible ({stock} unidades)
                        </small>
                    )}
                    <small>Seleccione color, tamaño y unidad para ver precios</small>
                </div>
            </div>

            <button className="btn-add" onClick={addToCart}>➕ Añadir al Carrito</button>
        </div>
    );
};

export default FormSection;
