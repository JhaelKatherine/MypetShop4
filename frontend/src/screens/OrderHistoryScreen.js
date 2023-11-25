import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';

const OrderHistoryScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;

  useEffect(() => {
    if (userInfo) {
      dispatch(listOrderMine());
    } else {
      // Si el usuario no está autenticado, redirige al inicio de sesión
      // Puedes personalizar esto según tus necesidades
      // Por ejemplo: history.push('/login');
    }
  }, [dispatch, userInfo]);

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
                <td>{order.createdAt.substring(0, 10)}</td>
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
