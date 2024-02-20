import "./App.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./Config";

const App = () => {

  const [user, setUser] = useState({}); //Google
  const [visible, setVisible] = useState(true); //Google
  const { instance } = useMsal(); //Microsoft

  //Anmelden bei Google
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

  //Anmelden bei Microsoft
  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };

  return (
    <div className="App">
      <div className="Google Login">
        {visible && <div id="signInDiv"></div>}
        {!visible && <h1>Erfolgreich bei Google Angemeldet, {user}!</h1>}
      </div>
      <div className="Microsoft Login">
        <DropdownButton
          variant="secondary"
          className="ml-auto"
          drop="start"
          title="Sign In"
        >
          <Dropdown.Item as="button" onClick={() => handleLogin("popup")}>
            Sign in using Popup
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={() => handleLogin("redirect")}>
            Sign in using Redirect
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
};

export default App;