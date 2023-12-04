import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import '../Css/AddUser.css';

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!isEmailValid(email)) {
        toast.error('Please enter a valid email address');
        return;
      }
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <>
      <div className="blue-background"> 
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <div className="form-container">
          <div className="centered-title">
            <h1>Sign In</h1>
          </div>
          <form onSubmit={submitHandler} className="custom-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                onInvalid={(e) => e.target.setCustomValidity('Please enter a valid email address')}
                onInput={(e) => e.target.setCustomValidity('')}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                onInvalid={(e) => e.target.setCustomValidity('This field is required')}
                onInput={(e) => e.target.setCustomValidity('')}
                required
              />
            </div>
            <button className="submit" type="submit">
              Sign In
            </button>
            <div className="mb-3 d-flex justify-content-start">
              New customer?{' '}
              <Link to={`/signup?redirect=${redirect}`} className="add-space">Create your account</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
