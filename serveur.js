const twilio = require("twilio");
const express = require("express");
const app = express();

require("dotenv").config();

// Middleware pour analyser les données JSON des requêtes entrantes
app.use(express.json());

// Configuration de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Route pour envoyer le code de confirmation par SMS
app.post("/send-confirmation-code", (req, res) => {
  const { phoneNumber } = req.body;

  // Générer un code de confirmation aléatoire (à 6 chiffres par exemple)
  const confirmationCode = Math.floor(100000 + Math.random() * 900000);

  // Envoyer le code de confirmation par SMS avec Twilio
  client.messages
    .create({
      body: `Votre code de confirmation est : ${confirmationCode}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    })
    .then((message) => {
      console.log(`SMS envoyé avec SID : ${message.sid}`);
      res.status(200).send({ success: true, confirmationCode });
    })
    .catch((error) => {
      console.error(`Erreur lors de l'envoi du SMS : ${error.message}`);
      res.status(500).send({
        success: false,
        message: "Échec de l'envoi du code de confirmation",
      });
    });
});

// Démarrez le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
