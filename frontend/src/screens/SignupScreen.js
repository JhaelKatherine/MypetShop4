import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import '../Css/AddUser.css';
import Googlelogin from 'react-google-login';
import {gapi} from 'gapi-script';
import FacebookLogin from 'react-facebook-login';


export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const clientID = "193456824707-ocuqc0ttv4142b56i6eb8cc0opfuaka8.apps.googleusercontent.com";
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [emailExistsError, setEmailExistsError] = useState('');


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const responseFacebook = (response) => {
    console.log(response);
  }
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

const responseGoogle = async (response) => {
  console.log(response);
  console.log(response.profileObj);
  try {
    const { data } = await Axios.post('/api/users/signup-google', {
      tokenId: response.tokenId,
    });
    ctxDispatch({ type: 'USER_SIGNIN', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    navigate(redirect || '/');
  } catch (err) {
    toast.error(getError(err));
  }
};
};
useEffect(() => {
  const start = () =>{
  gapi.auth2.init({
  clientId:clientID,
  })
  }
  gapi.load("client:auth2", start)
  },[])
  
const onSuccess = (response) => {
  console.log("something want wrong")
}

const onFailure = (response) => {
  console.log("something want wrong2")
}

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
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              id="userName"
              className="form-control"
              onChange={(e) => setUserName(e.target.value)}
              onInvalid={(e) => e.target.setCustomValidity("This field is required")}
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
              onInvalid={(e) => e.target.setCustomValidity("This field is required")}
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
    <div  >
    <Googlelogin
  clientId={clientID}
  buttonText="Registrarse con Google"
  onSuccess={responseGoogle}
  onFailure={responseGoogle}
  cookiePolicy={'single_host_origin'}/>
    </div>
    <div >
    <FacebookLogin
    appId="6509151565860998"
    autoLoad={false}
    fields="name,email,picture"
    callback={responseFacebook} />
    </div>
                
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