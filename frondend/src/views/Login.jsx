import React, { useState } from 'react';
import '../style.css';  
import { signup, login } from '../config/firebase';

function Login() {
  const [currState, setCurrState] = useState("Sign up");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (currState === "Sign up") {
      if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      };
      signup(username, email, password);
      console.log("Inscription réussie :", {
        username: username,
        email: email,
        password: password,
      });

    } else {
      
      login(email, password);
      console.log("Connexion réussie :", {
        email: email,
        password: password,
      });
    }
  };

  return (
    <div id='login'>
      <div className="auth-container">
        <h2 className="auth-title">
          {currState === "Sign up" ? 'Inscription' : 'Connexion'}
        </h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {currState === "Sign up" ? (
            <>
              <div className="form-group">
                <label>Nom d'utilisateur:</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
    
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
    
              <div className="form-group">
                <label>Mot de passe:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
    
              <div className="form-group">
                <label>Confirmer le mot de passe:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Nom d'utilisateur ou Email:</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="Entrez votre email"
                  className="form-input"
                />
              </div>
    
              <div className="form-group">
                <label>Mot de passe:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
            </>
          )}
    
          <button type="submit" className="submit-btn">
            {currState === "Sign up" ? "S'inscrire" : "Se connecter"}
          </button>
        </form>
    
        <div className="toggle-form">
          {currState === "Sign up" ? (
            <p>
              Vous avez déjà un compte ?{" "}
              <button onClick={() => setCurrState("Login")} className="link-btn">
                Connectez-vous
              </button>
            </p>
          ) : (
            <p>
              Vous n'avez pas de compte ?{" "}
              <button onClick={() => setCurrState("Sign up")} className="link-btn">
                Inscrivez-vous
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
  
}

export default Login;
