import React, {useContext, useEffect, useState} from 'react';
import '../Css/Invoice.css'
import axios from "axios";
import {Store} from "../Store";

const Invoice = () => {
    const [invoiceData, setInvoiceData] = useState(null);
    const { state } = useContext(Store);
    const { userInfo } = state;

    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    const email = JSON.parse(localStorage.getItem('buy-email'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo) {
                    const {data} = await axios.get(`/api/orders/mine/${userInfo._id}`);
                    if (data && data.length > 0) {
                        const filteredData = data.filter(order => order.createdAt && order.updatedAt);
                        const lastInvoice = filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
                        setInvoiceData(lastInvoice);
                        console.log(lastInvoice.user.name)
                    }
                }
            } catch (error) {
                console.error('Error al obtener los datos de la factura:', error);
            }
        };

        fetchData();
    }, [userInfo]);

    const sendEmail = async () => {
        let to = email.email;
        let subject = 'Invoice';
        const htmlContent = ReactDOMServer.renderToString(
            <div className="invoice">

                <div>
                    <h2 className={'commerce-name'}><span className={'commerce-name_aux'}>MY</span>PETSHOP</h2>
                    <h1>Invoice</h1>
                </div>

                <div>
                    <p className={'date'}><span>Invoice ID: </span>{invoiceData._id}</p>
                    <p className={'date'}><span>Date: </span>{new Date(invoiceData.createdAt).toLocaleDateString()}</p>
                </div>

                <div className={'invoice-bill_send'}>
                    <div>
                        <h3>Bill to</h3>
                        <p>{shippingAddress.fullName}</p>
                    </div>
                    <div>
                        <h3>Send to</h3>
                        <p>{`${shippingAddress.city}, ${shippingAddress.address}`}</p>
                    </div>
                </div>

                <div>
                    <h3>NIT</h3>
                    <p>{shippingAddress.nit}</p>
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
                        {invoiceData.orderItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>Bs. {item.price}</td>
                                <td>Bs. {item.quantity * item.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className={'prices-invoice'}>

                    <div className={'total-price'}>
                        <h3>Tax price:</h3>
                        <p>Bs. {invoiceData.taxPrice}</p>
                    </div>
                    <div className={'total-price'}>
                        <h3>Total:</h3>
                        <p>Bs. {invoiceData.totalPrice}</p>
                    </div>

                </div>
            </div>
        );
        // Agregar estilos en línea al HTML
        const styledHtml = `
            <style>
              .invoice {
                    background-color: #f0f0f0;
                    width: 90%;
                    padding: 20px;
                    border-radius: 10px;
                    margin: auto;
                }
                
                .invoice h2, .invoice h3 {
                    color: #333;
                }
                
                .invoice h1 {
                    text-align: center;
                }
                
                .date {
                    text-align: end;
                }
                
                .invoice-bill_send {
                    display: flex;
                    gap: 30px;
                }
                
                .invoice span {
                    font-weight: bold;
                }
                
                .invoice p {
                    color: #666;
                }
                
                .invoice table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .invoice table, .invoice th, .invoice td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                
                .invoice th {
                    padding-top: 12px;
                    padding-bottom: 12px;
                    text-align: left;
                    background-color: #005593;
                    color: white;
                }
                
                .commerce-name {
                    font-weight: bold;
                    text-align: center;
                }
                
                .commerce-name_aux {
                    color: #ff4500;
                }
                
                .total-price {
                    display: flex;
                    justify-content: end;
                    align-items: center;
                    gap: 15px;
                    margin-right: 10px;
                }
                
                .total-price p {
                    margin: 0;
                    font-size: 20px;
                }
                
                .total-price h3 {
                    font-size: 20px;
                    margin: 0;
                }
                
                .send-button {
                    background-color: #005593;
                    color: white;
                    padding: 7px 27px;
                }
                
                .button-container_invoice{
                    width: 90%;
                    padding: 20px;
                    margin: auto auto 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .greetings {
                    font-weight: bold;
                
                }
                
                .greetings span{
                    color: #ff4500;
                }
                
                .prices-invoice {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
            </style>
            ${htmlContent}
          `;

        // Configurar el contenido HTML en el correo electrónico
        let html = styledHtml;

        let res = await axios.post('/api/send-email', { to, subject, html });

        console.log(res.data);
    };



    if (!invoiceData) {
        return <div>Cargando factura...</div>;
    }

    return (
        <>
            <div className="invoice">

                <div>
                    <h2 className={'commerce-name'}><span className={'commerce-name_aux'}>MY</span>PETSHOP</h2>
                    <h1>Invoice</h1>
                </div>

                <div>
                    <p className={'date'}><span>Invoice ID: </span>{invoiceData._id}</p>
                    <p className={'date'}><span>Date: </span>{new Date(invoiceData.createdAt).toLocaleDateString()}</p>
                </div>

                <div className={'invoice-bill_send'}>
                    <div>
                        <h3>Bill to</h3>
                        <p>{shippingAddress.fullName}</p>
                    </div>
                    <div>
                        <h3>Send to</h3>
                        <p>{`${shippingAddress.city}, ${shippingAddress.address}`}</p>
                    </div>
                </div>

                <div>
                    <h3>NIT</h3>
                    <p>{shippingAddress.nit}</p>
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
                        {invoiceData.orderItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>Bs. {item.price}</td>
                                <td>Bs. {item.quantity * item.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className={'prices-invoice'}>

                    <div className={'total-price'}>
                        <h3>Tax price:</h3>
                        <p>Bs. {invoiceData.taxPrice}</p>
                    </div>
                    <div className={'total-price'}>
                        <h3>Total:</h3>
                        <p>Bs. {invoiceData.totalPrice}</p>
                    </div>

                </div>
            </div>

            <div className={'button-container_invoice'}>
                <p className={'greetings'}><span>Thanks </span>for you preference!</p>
                <button className={'send-button'} onClick={sendEmail}>Send copy to mail</button>
            </div>

        </>
    );
}

export default Invoice;