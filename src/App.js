import "./App.css";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const App = () => {

  function handleCallBackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
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
      <div id="signInDiv"></div>
    </div>
  );
};

export default App;