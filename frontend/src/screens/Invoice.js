import React, {useContext, useEffect, useState} from 'react';
import '../Css/Invoice.css'
import axios from "axios";
import {Store} from "../Store";

const Invoice = () => {
    const [invoiceData, setInvoiceData] = useState(null);
    const { state } = useContext(Store);
    const { userInfo } = state;

    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));

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
        let to = 'diegofiguesevi@gmail.com';
        let subject = 'Test email';
        let html = '<p>Hola mundo</p>';

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