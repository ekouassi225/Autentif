import React, { useState } from "react";

function RegistrationForm({ onRegister }) {
  const [pseudo, setPseudo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = (e) => {
    e.preventDefault();

    fetch("/send-confirmation-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCodeSent(true);
          alert("Code de confirmation envoyé.");
        } else {
          alert("Échec de l'envoi du code de confirmation.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Erreur lors de l'envoi du code de confirmation.");
      });
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();

    // Logique pour vérifier le code de confirmation côté client ou envoyer une autre requête pour vérifier côté serveur
    // Ici, nous simulons simplement l'enregistrement réussi
    if (confirmationCode) {
      onRegister(phoneNumber);
    } else {
      alert("Veuillez entrer le code de confirmation.");
    }
  };

  return (
    <div>
      {!codeSent ? (
        <form onSubmit={handleSendCode}>
          <label>
            Pseudo:
            <input
              type="text"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Numéro de téléphone:
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Envoyer le code de confirmation</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode}>
          <label>
            Code de confirmation:
            <input
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Vérifier le code</button>
        </form>
      )}
    </div>
  );
}

export default RegistrationForm;
