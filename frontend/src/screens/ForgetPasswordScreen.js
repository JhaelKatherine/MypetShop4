import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../utils';
import '../Css/AddUser.css';



export default function ForgetPasswordScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/forget-password', {
        email,
      });
      toast.success(data.message);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <>
    <div className="blue-background">
      <div className="form-container">
      <div className="centered-title">
         <h1>Forget Password</h1>
      </div>
        <form onSubmit={submitHandler} className="custom-form">
         
      
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              onInvalid={(e) => e.target.setCustomValidity("This field is required")}
              onInput={(e) => e.target.setCustomValidity('')}
              required
            />
          </div>
          
          <button className="submit" type="submit">submit</button>
        </form>
      </div>

      </div>

    </>
  );
};
