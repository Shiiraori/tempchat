import React, { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function LoginLogout() {
    const [email, setEmail] = useState("Test@gmail.com");
    const [password, setPassword] = useState("test123");
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerInformation, setRegisterInformation] = useState({
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: ""
    });
  
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
  
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          navigate("/dashboard");
        }
      });
    }, []);
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSignIn = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/dashboard");
        })
        .catch((err) => alert(err.message));
    };

  
    const handleRegister = () => {
      if (registerInformation.email !== registerInformation.confirmEmail) {
        alert("Please confirm that email are the same");
        return;
      } else if (
        registerInformation.password !== registerInformation.confirmPassword
      ) {
        alert("Please confirm that password are the same");
        return;
      }
      createUserWithEmailAndPassword(
        auth,
        registerInformation.email,
        registerInformation.password
      )
        .then(() => {
          navigate("/dashboard");
        })
        .catch((err) => alert(err.message));
    };
  
    const handleGoogleLogin = () => {
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    };

      return (
        <div className="welcome">
          <video  loop={true} muted={true} playsInline={true} autoPlay={true} className="welcome-video">
            <source src="img/clouds.mp4" type="video/mp4" />
          </video>
          <h1 className="text__title position-absolute top-0 start-50 translate-middle-x pt-4">TempChat</h1>
          <div className="position-absolute top-50 start-50 translate-middle">
          <div className="container rounded border bg-white texttext">
            
            {isRegistering ? (
              <>
                <h1>Register</h1>
                <label htmlFor="RegisterEmail" className="form-label">
                      Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="RegisterEmail"
                  placeholder="Email"
                  value={registerInformation.email}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      email: e.target.value
                    })
                  }
                />
                <label htmlFor="RegisterConfirmEmail" className="form-label">
                  Confirm Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="RegisterConfirmEmail"
                  placeholder="Confirm Email"
                  value={registerInformation.confirmEmail}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      confirmEmail: e.target.value
                    })
                  }
                />
                <label htmlFor="RegisterPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="RegisterPassword"
                  placeholder="Password"
                  value={registerInformation.password}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      password: e.target.value
                    })
                  }
                />
                <label htmlFor="RegisterConfirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="RegisterConfirmPassword"
                  placeholder="Confirm Password"
                  value={registerInformation.confirmPassword}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      confirmPassword: e.target.value
                    })
                  }
                />
                <button className="btn btn-success my-2 mx-2" onClick={handleRegister}>Register</button>
                <button className="btn btn-danger" onClick={() => setIsRegistering(false)}>Go back</button>
              </>
            ) : (
              <>
              
                <h1>Log in</h1>
                <label htmlFor="Email" className="form-label">
                      Email
                    </label>
                <input 
                  type="email" 
                  className="form-control"
                  id="Email"
                  placeholder="Email" 
                  onChange={handleEmailChange} 
                  value={email} />
                  <label htmlFor="Password" className="form-label">
                      Password
                  </label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  onChange={handlePasswordChange}
                  value={password}
                  placeholder="Password"
                />
                <button className="btn btn-success" onClick={handleSignIn}>
                  Log in
                </button>
                <button
                  className="btn btn-primary my-2 mx-2"
                  onClick={() => setIsRegistering(true)}
                >
                  Create an account
                </button>
                <button 
                onClick={handleGoogleLogin} className="btn btn-info btn-block">
                  Sign in with Google
                </button>
              </>
            )}
          </div>
          </div>
        </div>
      );
  }