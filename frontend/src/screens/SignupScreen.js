import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import '../Css/AddUser.css';


export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { dispatch: ctxDispatch } = useContext(Store);
  useEffect(() => {
    const storedFormData = localStorage.getItem('signupFormData');
    if (storedFormData) {
    const { name, lastName, userName, email, confirmPassword } = JSON.parse(storedFormData);
    setName(name);
    setLastName(lastName);
    setUserName(userName);
    setEmail(email);
    setConfirmPassword(confirmPassword);
    }
    }, []);
    
    useEffect(() => {
    const formData = { name, lastName, userName, email, confirmPassword };
    localStorage.setItem('signupFormData', JSON.stringify(formData));
    }, [name, lastName, userName, email, confirmPassword]);
    
  const handleUserNameChange = (e) => {
    const inputUserName = e.target.value;
    if (inputUserName.length <= 6) {
      setUserName(inputUserName);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    if (name.trim() === '' || lastName.trim() === '' || userName.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      toast.error('Please complete all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
        lastName,
        userName,
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

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
    <div className="blue-background"> {/* Agregar esta línea */}

      <div className="form-container">
      <div className="centered-title">
         <h1>Sign Up</h1>
      </div>
        <form onSubmit={submitHandler} className="custom-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              onInvalid={(e) => e.target.setCustomValidity("This field is required")}
              onInput={(e) => e.target.setCustomValidity('')}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="form-control"
              onChange={(e) => setLastName(e.target.value)}
              onInvalid={(e) => e.target.setCustomValidity("This field is required")}
              onInput={(e) => e.target.setCustomValidity('')}
              required
            />
          </div>
          <div className="form-group">
  <label htmlFor="userName">User Name (Max 6 characters)</label>
  <input
    type="text"
    id="userName"
    className="form-control"
    value={userName}
    onChange={handleUserNameChange}
    maxLength={6} // Limitar a 6 caracteres
    onInvalid={(e) => e.target.setCustomValidity("Please enter a maximum of 6 characters")}
    onInput={(e) => e.target.setCustomValidity('')}
    required
  />
</div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
  type="email"
  id="email"
  className="form-control"
  onChange={(e) => setEmail(e.target.value)}
  onInvalid={(e) => {
    if (!isEmailValid(e.target.value)) {
      e.target.setCustomValidity("Please enter a valid email address");
    } else {
      e.target.setCustomValidity("This field is required");
    }
  }}
  onInput={(e) => {
    if (isEmailValid(e.target.value)) {
      e.target.setCustomValidity('');
    }
  }}
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
              onInvalid={(e) => e.target.setCustomValidity("This field is required")}
              onInput={(e) => e.target.setCustomValidity('')}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              onChange={(e) => setConfirmPassword(e.target.value)}
              onInvalid={(e) => e.target.setCustomValidity("This field is required")}
              onInput={(e) => e.target.setCustomValidity('')}
              required
            />
          </div>
          <button className="submit" type="submit">Sign Up</button>
                <p className="signin">Register with</p>
                <div className="social-buttons-container">
    <button className="social-button google-button" onClick={(e) => e.preventDefault()}>
        <img src="https://static.vecteezy.com/system/resources/previews/010/353/285/original/colourful-google-logo-on-white-background-free-vector.jpg" alt="Google" />
        Google
    </button>
    <button className="social-button facebook-button" onClick={(e) => e.preventDefault()}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png" alt="Facebook" />
        Facebook
    </button>
                
          </div>
          <div className="mb-3">
            Already have an account? <Link to="/signin" className="signin">Sign-In</Link>
            </div>
        </form>
      </div>

      </div>

    </>
  );
};