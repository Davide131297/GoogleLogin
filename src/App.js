import "./App.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const App = () => {

  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(true);

  function handleCallBackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject.given_name);
    setVisible(false);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
    client_id: "692201261838-l5ue14kognhskj8j6vf8s4t3ok740ne9.apps.googleusercontent.com",
    callback: handleCallBackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large", text: "signIn"}
    );
  }, []);

  return (
    <div className="App">
      {visible && <div id="signInDiv"></div>}
      {!visible && <h1>Erfolgreich Angemeldet, {user}!</h1>}
    </div>
  );
};

export default App;