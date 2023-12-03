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


  
  const isPasswordStrong = (password) => {
    // La contraseña debe tener al menos 8 caracteres
    const minLengthMessage = 'Use 8 characters minimum for the password';

    if (password.length < 8) {
      return minLengthMessage;
    }

    // La contraseña debe incluir al menos una minúscula, una mayúscula, un número y un carácter especial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'Choose a stronger password. Try a combination of letters, numbers, and symbols.';
    }

    return '';
  };

  const handlePasswordChange = (e) => {
    const passwordErrorMessage = isPasswordStrong(e.target.value);
    e.target.setCustomValidity(passwordErrorMessage);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      e.target.setCustomValidity('Passwords do not match');
    } else {
      setConfirmPasswordError('');
      e.target.setCustomValidity('');
    }
  };

 
  
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
    
    const passwordErrorMessage = isPasswordStrong(password);
    if (passwordErrorMessage) {
      e.target.elements.password.setCustomValidity(passwordErrorMessage);
      e.target.reportValidity();
      return;
    }
    const confirmPassword = e.target.elements.confirmPassword.value;
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      e.target.elements.confirmPassword.setCustomValidity('Passwords do not match');
      e.target.reportValidity();
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
                onChange={handlePasswordChange}
                required
              />
              {e.target && e.target.elements && e.target.elements.password.validationMessage && (
                <div className="error-message">
                  {e.target.elements.password.validationMessage}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                onChange={handleConfirmPasswordChange}
                required
              />
              {confirmPasswordError && (
                <div className="error-message">
                  {confirmPasswordError}
                </div>
              )}
            </div>
          <button className="submit" type="submit">Sign Up</button>
          <div>
            <p>

            </p>
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