import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const onSuccess = (response) => {
    console.log(response);
    setIsLoggedIn(true);
    setUserInfo(response.profileObj);
  };

  const onFailure = (error) => {
    console.log("Login fehlgeschlagen:", error);
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return (
    <GoogleOAuthProvider clientId="692201261838-l5ue14kognhskj8j6vf8s4t3ok740ne9.apps.googleusercontent.com">
      <div>
        <h1>Anmeldung mit Google</h1>
        {isLoggedIn && userInfo ? (
          <div>
            <p>Angemeldet als {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>
            <button onClick={onLogout}>Abmelden</button>
          </div>
        ) : (
          <GoogleLogin
            buttonText="Mit Google anmelden"
            onSuccess={onSuccess}
            onFailure={onFailure}
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;