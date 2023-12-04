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
    
  const isPasswordValid = (password) => {

    const MIN_PASSWORD_LENGTH = 8;
    const minLengthMessage = 'Use 8 characters minimum for the password';
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    
    if (password.length < MIN_PASSWORD_LENGTH) {
    return minLengthMessage;
    }
    if (!passwordRegex.test(password)) {
      return 'Choose a stronger password. Try a combination of letters, numbers, and symbols.';
      }
      
      return '';
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
    onChange={(e) => {
    const newName = e.target.value;
    if (newName.length <= 100) {
    setName(newName);
    e.target.setCustomValidity(''); // Limpiar cualquier mensaje de error personalizado
    } else {
    setName(newName.slice(0, 100)); // Truncar el nombre a 100 caracteres
    e.target.setCustomValidity('Use a maximum of 100 characters for your name');
    }
    }}
    maxLength="100"
    required
  
    autoComplete="off"
    />
    </div>
    <div className="form-group">
    <label htmlFor="lastName">Last Name</label>
    <input
    type="text"
    id="lastName"
    className="form-control"
    onChange={(e) => {
    const newLastName = e.target.value;
    if (newLastName.length <= 100) {
    setLastName(newLastName);
    e.target.setCustomValidity(''); // Limpiar cualquier mensaje de error personalizado
    } else {
    setLastName(newLastName.slice(0, 100)); // Truncar el apellido a 100 caracteres
    e.target.setCustomValidity('Use a maximum of 100 characters for your last name');
    }
    }}
    maxLength="100"

    required
    autoComplete="off"

    />
    </div>
    
    <div className="form-group">
    <label htmlFor="userName">User Name</label>
    <input
    type="text"
    id="userName"
    className="form-control"
    onChange={(e) => {
    const newUserName = e.target.value;
    if (newUserName.length <= 6) {
    setUserName(newUserName);
    e.target.setCustomValidity(''); 
    } else {
    setUserName(newUserName.slice(0, 6));
    e.target.setCustomValidity('Use a maximum of 6 characters for your username');
    }
    }}
    maxLength="6"

    required
    autoComplete="off"

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
  autoComplete="off"

/>
          </div>
          
<div className="form-group">
<label htmlFor="password">Password</label>
<input
type="password"
id="password"
className="form-control"
onChange={(e) => {
const newPassword = e.target.value;
const error = isPasswordValid(newPassword);
e.target.setCustomValidity(error);
setPassword(newPassword);
}}
onInvalid={(e) => {
if (e.target.value === '') {
e.target.setCustomValidity("This field is required");
} else {
const error = isPasswordValid(e.target.value);
e.target.setCustomValidity(error || "This field is required");
}
}}
onInput={(e) => e.target.setCustomValidity('')}
required
autoComplete="off"

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
autoComplete="off"

/>
</div>
<button className="submit" type="submit">Sign Up</button>
<p > 
</p>
<div className="mb-3">
Already have an account? <Link to="/signin" className="signin">Sign-In</Link>
</div>
</form>
</div>

</div>

</>
);
};
