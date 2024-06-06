import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import VerificationForm from "./VerificationForm";
import "./App.css";

function App() {
  const [registeredPhoneNumber, setRegisteredPhoneNumber] = useState(null);

  const handleRegister = (phoneNumber) => {
    setRegisteredPhoneNumber(phoneNumber);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Inscription</h1>
        {registeredPhoneNumber ? (
          <VerificationForm phoneNumber={registeredPhoneNumber} />
        ) : (
          <RegistrationForm onRegister={handleRegister} />
        )}
      </header>
    </div>
  );
}

export default App;
