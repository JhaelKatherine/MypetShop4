import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true);
        const { data } = await Axios.get('/api/orders'); // Cambié la ruta para obtener todas las órdenes
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order history:', error); // Agregar este console.log

        setError('Error fetching order history');
        
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt ? order.createdAt.substring(0, 10) : 'No Date'}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistoryScreen;
