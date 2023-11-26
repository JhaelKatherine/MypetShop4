import React from 'react';
import '../Css/Invoice.css'

const Invoice = () => {
    // Datos de la factura
    const invoiceData = {
        id: '31442F52V52',
        date: '10/27/2023 8:00 AM',
        billTo: 'Dennis Jorge Dennis Jorge',
        sendTo: 'Ladisla Ceballos, Cochabamba',
        nit: '123123123123',
        items: [
            {
                description: 'Bath towel for small dog',
                quantity: 1,
                unitPrice: 163,
            },
            {
                description: 'Bath towel for small dog',
                quantity: 1,
                unitPrice: 163,
            },
            {
                description: 'Bath towel for small dog',
                quantity: 1,
                unitPrice: 163,
            },
            {
                description: 'Bath towel for small dog',
                quantity: 1,
                unitPrice: 163,
            },
        ],
        total: 316,
    };

    return (
        <>
            <div className="invoice">

                <div>
                    <h2 className={'commerce-name'}><span className={'commerce-name_aux'}>MY</span>PETSHOP</h2>
                    <h1>Invoice</h1>
                </div>

                <div>
                    <p className={'date'}><span>Invoice ID: </span>{invoiceData.id}</p>
                    <p className={'date'}><span>Date: </span>{invoiceData.date}</p>
                </div>

                <div className={'invoice-bill_send'}>
                    <div>
                        <h3>Bill to</h3>
                        <p>{invoiceData.billTo}</p>
                    </div>
                    <div>
                        <h3>Send to</h3>
                        <p>{invoiceData.sendTo}</p>
                    </div>
                </div>

                <div>
                    <h3>NIT</h3>
                    <p>{invoiceData.nit}</p>
                </div>

                <div>
                    <h3>Items</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {invoiceData.items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.description}</td>
                                <td>{item.quantity}</td>
                                <td>Bs. {item.unitPrice}</td>
                                <td>Bs. {item.quantity * item.unitPrice}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className={'total-price'}>
                    <h3>Total:</h3>
                    <p>Bs. {invoiceData.total}</p>
                </div>
            </div>

            <div className={'button-container_invoice'}>
                <p className={'greetings'}><span>Thanks </span>for you preference!</p>
                <button className={'send-button'}>Send copy to mail</button>
            </div>

        </>

    );
};

export default Invoice;