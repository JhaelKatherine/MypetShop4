import React from 'react'
import Header from './Header'
import '../Css/Invoice.css'

const Invoice = ({
    invoiceNumber = "100",
    billTo = "Denis Jorge Gandarillas Delgado",
    sendTo = "Ladislao Cabrera, Cochabamba, Bolivia",
    nit = 12345678,
    products = [
        { name: 'Product 1', quantity: 2, unitPrice: 10.00 },
        { name: 'Product 2', quantity: 1, unitPrice: 15.00 },
    ]
}) => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
    const day = currentDate.getDate().toString().padStart(2, '0');

    let hours = currentDate.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');

    const total = products.reduce((acc, product) => {
        return acc + product.quantity * product.unitPrice;
      }, 0);

  return (
    <div>
        <div className='invoice-subheader'>
            <div className="logo">
                <img 
                    width={140} 
                    src="https://www.mypetshop.co.za/wp-content/uploads/2019/11/My-petshop-LOGO.png" 
                    alt="Logo" 
                />
            </div>
            <table>
                <tr>
                    <td className='table-title-details'><strong ># Invoice</strong></td>
                    <td className='table-value-details'>{invoiceNumber}</td>
                </tr>
                <tr>
                    <td className='table-title-details'>
                        <strong>Date</strong>
                    </td>
                    <td className='table-value-details'>{`${month}/${day}/${year} ${hours}:${minutes} ${ampm}`}</td>
                </tr>
            </table>
        </div>

        <h1 className='invoice-title'>Invoice</h1>

        <div className='invoice-subheader'>
            <div className='invoice-to-subcontainer'>
                <h3>Bill to</h3>
                <p>{billTo}</p>
            </div>
            <div className='invoice-to-subcontainer'>
                <h3>Send to</h3>
                <p>{sendTo}</p>
            </div>
        </div>

        <div className='nit-container'>
            <h4>NIT</h4>
            <div>{nit}</div>
        </div>

        <div>
            <table className='products-table'>
                <thead>
                    <tr>
                        <th style={{ width: "50vw" }}>Item</th>
                        <th style={{ width: "16vw" }} className='cell-centered'>Quantity</th>
                        <th style={{ width: "16vw" }} className='cell-centered'>Unit Price</th>
                        <th style={{ width: "16vw" }} className='cell-centered'>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                        <td>{product.name}</td>
                        <td className='cell-centered'>{product.quantity}</td>
                        <td className='cell-centered'>{`Bs. ${product.unitPrice.toFixed(2)}`}</td>
                        <td className='cell-centered'>{`Bs. ${(product.quantity * product.unitPrice).toFixed(2)}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='total-container'>
                <h5>Total</h5>
                <div>{`Bs. ${total.toFixed(2)}`}</div>
            </div>

            <h4 className='thank-you-text'>Thank you!</h4>
        </div>
    </div>
  )
}

export default Invoice