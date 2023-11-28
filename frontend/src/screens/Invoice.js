import React, {useContext, useEffect, useState} from 'react';
import '../Css/Invoice.css'
import axios from "axios";
import {Store} from "../Store";
import {renderToString} from 'react-dom/server';
import { useNavigate } from "react-router-dom";

const Invoice = () => {
    const navigate = useNavigate()
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
        let html = renderToString(
            <div className="invoice"
                 style={{backgroundColor: "#f0f0f0", width: "90%", padding: "20px", borderRadius: "10px", margin: "auto"}}>

                <div>
                    <h2 className={'commerce-name'} style={{color: "#333", fontWeight: "bold", textAlign: "center", fontSize: "30px"}}><span
                        className={'commerce-name_aux'} style={{color: "#ff4500", fontSize: "30px"}}>MY</span>PETSHOP</h2>
                    <h1 style={{textAlign: "center", fontSize: "25px"}}>Invoice</h1>
                </div>

                <div>
                    <p className={'date'} style={{textAlign: "end"}}><span
                        style={{fontWeight: "bold", fontSize: "15px"}}>Invoice ID: </span>{invoiceData._id}</p>
                    <p className={'date'} style={{textAlign: "end"}}><span
                        style={{fontWeight: "bold", fontSize: "15px"}}>Date: </span>{new Date(invoiceData.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <div className={'invoice-bill_send'} style={{display: "flex"}}>
                    <div style={{marginRight: "30px"}}>
                        <h3 style={{color: "#333", fontSize: "20px"}}>Bill to</h3>
                        <p style={{color: "#666", fontSize: "20px"}}>{shippingAddress.fullName}</p>
                    </div>
                    <div>
                        <h3 style={{color: "#333", fontSize: "20px"}}>Send to</h3>
                        <p style={{color: "#666", fontSize: "20px"}}>{`${shippingAddress.city}, ${shippingAddress.address}`}</p>
                    </div>
                </div>

                <div>
                    <h3 style={{color: "#333", fontSize: "20px"}}>NIT</h3>
                    <p style={{color: "#666", fontSize: "20px"}}>{shippingAddress.nit}</p>
                </div>

                <div>
                    <h3 style={{color: "#333", fontSize: "20px"}}>Items</h3>
                    <table style={{width: "100%", borderCollapse: "collapse"}}>
                        <thead>
                        <tr>
                            <th style={{paddingTop: "12px", paddingBottom: "12px", textAlign: "left", backgroundColor: "#005593", color: "white", border: "1px solid #ddd", padding: "8px", fontSize: "20px"}}>Item</th>
                            <th style={{paddingTop: "12px", paddingBottom: "12px", textAlign: "left", backgroundColor: "#005593", color: "white", border: "1px solid #ddd", padding: "8px", fontSize: "20px"}}>Quantity</th>
                            <th style={{paddingTop: "12px", paddingBottom: "12px", textAlign: "left", backgroundColor: "#005593", color: "white", border: "1px solid #ddd", padding: "8px", fontSize: "20px"}}>Unit
                                Price
                            </th>
                            <th style={{paddingTop: "12px", paddingBottom: "12px", textAlign: "left", backgroundColor: "#005593", color: "white", border: "1px solid #ddd", padding: "8px", fontSize: "15px"}}>Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {invoiceData.orderItems.map((item, index) => (
                            <tr key={index}>
                                <td style={{border: "1px solid #ddd", padding: "8px"}}>{item.name}</td>
                                <td style={{border: "1px solid #ddd", padding: "8px"}}>{item.quantity}</td>
                                <td style={{border: "1px solid #ddd", padding: "8px"}}>Bs. {item.price}</td>
                                <td style={{border: "1px solid #ddd", padding: "8px"}}>Bs. {item.quantity * item.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className={'prices-invoice'} style={{marginTop: "6px"}}>

                    <div className={'total-price'} style={{display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "15px", marginRight: "10px"}}>
                        <h3 style={{fontSize: "20px", margin: "0", color: "#333"}}>Tax price:</h3>
                        <p style={{margin: "0", fontSize: "20px", color: "#666"}}>Bs. {invoiceData.taxPrice}</p>
                    </div>
                    <div className={'total-price'} style={{display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "15px", marginRight: "10px"}}>
                        <h3 style={{fontSize: "20px", margin: "0", color: "#333"}}>Total:</h3>
                        <p style={{margin: "0", fontSize: "20px", color: "#666"}}>Bs. {invoiceData.totalPrice}</p>
                    </div>

                </div>
            </div>
        );

        let res = await axios.post('/api/send-email', { to, subject, html });

        console.log(res.data);
    };

    const sendEmailAndRedirect = () => {

        sendEmail();
        navigate("/");
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
                        <p>Bs. {invoiceData.taxPrice.toFixed(2)}</p>
                    </div>
                    <div className={'total-price'}>
                        <h3>Total:</h3>
                        <p>Bs. {invoiceData.totalPrice}</p>
                    </div>

                </div>
            </div>

            <div className={'button-container_invoice'}>
                <p className={'greetings'}><span>Thanks </span>for you preference!</p>
                <button className={'send-button'} onClick={sendEmailAndRedirect}>Send copy to mail and go home</button>
            </div>

        </>
    );
}

export default Invoice;