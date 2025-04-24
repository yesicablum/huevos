import { CUBETA_SIZE, DOCENA_SIZE, chickenASCII, eggASCII } from './data';

export const generateInvoice = (sale) => {
  const { client, items, subtotal, iva, total, date } = sale;

  // Formatear fecha
  const formattedDate = new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);

  // Preparar el contenido de la factura
  const invoiceContent = [
    // Espacio para los ASCII arts
    `${chickenASCII.split('\n').map((line) => line.padEnd(50)).join('\n')}${eggASCII.split('\n').map((line) => line.padStart(30)).join('\n')}`,

    // Encabezado
    '\n\n',
    '='.repeat(80),
    '\n',
    'AVÍCOLA LLANO GRANDE SAS'.padStart(50),
    '\n',
    'NIT: 870545489-0'.padStart(45),
    '\n',
    '='.repeat(80),
    '\n\n',
    'FACTURA DE VENTA'.padStart(48),
    '\n\n',
    
    // Información del cliente
    `Cliente: ${client.name}`,
    '\n',
    `${client.type === 'natural' ? 'CC' : 'NIT'}: ${client.identification}`,
    '\n',
    `Fecha: ${formattedDate}`,
    '\n\n',
    
    // Tabla de productos
    'CANTIDAD | DESCRIPCIÓN'.padEnd(50) + 'PRECIO UNIT | SUBTOTAL',
    '\n',
    '-'.repeat(80),
    '\n',
  ];
  
  // Detalles de los productos
  items.forEach((item) => {
    const units = item.unit === 'cubeta' ? CUBETA_SIZE : DOCENA_SIZE;
    console.log('🚀 ~ units:', units);
    const description = `${item.color === 'red' ? 'Rojo' : 'Blanco'} ${item.size} (${item.unit})`;
    
    invoiceContent.push(
      `${item.quantity.toString().padEnd(8)} | ${description.padEnd(40)} $${item.unitPrice.toLocaleString().padEnd(10)} | $${item.subtotal.toLocaleString()}`,
      '\n'
    );
  });
  
  // Resumen
  invoiceContent.push(
    '\n',
    '-'.repeat(80),
    '\n',
    `${'SUBTOTAL:'.padEnd(68)} $${subtotal.toLocaleString()}`,
    '\n',
    `${'IVA (5%):'.padEnd(68)} $${iva.toLocaleString()}`,
    '\n',
    '='.repeat(80),
    '\n',
    `${'TOTAL A PAGAR:'.padEnd(68)} $${total.toLocaleString()}`,
    '\n\n',
    'Gracias por su compra!'.padStart(48),
    '\n\n',
    '='.repeat(80),
  );
  
  return invoiceContent.join('');
};

export const downloadInvoice = (invoice, clientName) => {
  // Crear un blob con el contenido de la factura
  const blob = new Blob([invoice], { type: 'text/plain;charset=utf-8' });
  
  // Crear un enlace para descargar el archivo
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  
  // Nombre del archivo: factura_clienteName_fecha.txt
  const date = new Date().toISOString().slice(0, 10);
  const fileName = `factura_${clientName.replace(/\s+/g, '_')}_${date}.txt`;
  
  link.download = fileName;
  
  // Simular clic en el enlace para descargar el archivo
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};