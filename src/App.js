import "./App.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./Config";
import MicrosoftLogo from "./MicrosoftLogin.png";

const App = () => {

  const [user, setUser] = useState({}); //Google
  const [visibleGoogle, setVisibleGoogle] = useState(true); //Google
  const [MicrosoftUser, setMicrosoftUser] = useState({}); //Microsoft
  const [visibleMicrosoft, setVisibleMicrosoft] = useState(true); //Microsoft
  const { instance } = useMsal(); //Microsoft

  //Anmelden bei Google
  function handleCallBackResponse(response) {
    console.log("Google Token: " + response.credential);
    const GoogleUser = jwtDecode(response.credential);
    console.log(GoogleUser);
    setUser(GoogleUser.given_name);
    setVisibleGoogle(false);
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
  const handleLogin = () => {
    instance.loginPopup(loginRequest).then((response) => {
      // Hier erhältst du den Access Token
      console.log("Microsoft Token:", response.accessToken);
      const MicrosoftUser = jwtDecode(response.accessToken);
      console.log(MicrosoftUser);
      setMicrosoftUser(MicrosoftUser);
      setVisibleMicrosoft(false);
    }).catch((e) => {
      console.log(e);
    });
    setVisibleMicrosoft(false);
  };

  return (
    <div className="App">
      <div className="Google Login">
        {visibleGoogle && <div id="signInDiv"></div>}
        {!visibleGoogle && <h1>Erfolgreich bei Google Angemeldet, {user}!</h1>}
      </div>
      <div className="Microsoft Login">
        <div id="MicrosoftButton">
          {visibleMicrosoft && <img src={MicrosoftLogo} alt="Microsoft Login" onClick={handleLogin} /> }
        </div>
        {!visibleMicrosoft && <h1>Erfolgreich bei Microsoft Angemeldet, {MicrosoftUser.given_name}!</h1>}
      </div>
    </div>
  );
};

export default App;