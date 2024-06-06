import React, { useState } from "react";
import axios from "axios";

function VerificationForm({ phoneNumber }) {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/verify-code", { phoneNumber, code })
      .then((response) => {
        if (response.data.success) {
          alert("Numéro de téléphone vérifié avec succès !");
        } else {
          alert("Code de confirmation invalide.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Erreur lors de la vérification du code.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Code de confirmation:
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Vérifier</button>
    </form>
  );
}

export default VerificationForm;
