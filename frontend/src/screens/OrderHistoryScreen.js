import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import Button from 'react-bootstrap/esm/Button';
import { format } from 'date-fns';
import '../Css/stile.css';
import empty_plate from '../img/empty_plate.svg'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    orders: [], // Initialize orders as an empty array
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        if (userInfo) {
          const { data } = await axios.get(`/api/orders/mine/${userInfo._id}`);
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        }
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div style={{ marginBottom: '400px' }}>
      <Helmet>
        <title>Order History</title>
      </Helmet>

      <h1>My order</h1>
      <p>You can see your orders here</p>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : orders.length === 0 ? ( // Check if there are no orders
        <div className="empty-state-container">
          <div className="empty-state-text">
            <h2>Oops, this is empty!</h2>
            <p>Explore our catalog to see what we have to offer.</p>
            <div className="empty-state-button">
            <Link to="/">
    <Button>Explorar nuestro catálogo</Button>
  </Link>
            </div>
          </div>
          <div className="empty-state-image">
            <img src={empty_plate} alt="Empty State" />
          </div>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.NumberProduct}</td>
                <td>{order.createdAt ? format(new Date(order.createdAt), 'MM-dd-yyyy') : 'Invalid Date'}</td>
                <td>${' '}{order.itemsPrice ? order.itemsPrice.toFixed(2) : 'N/A'}</td>    
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
