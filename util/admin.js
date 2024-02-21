var admin = require("firebase-admin");

var serviceAccount = require("/Users/Ahsan Ali/Downloads/muet-api-firebase-adminsdk-jsu7e-c229b27a4e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = { admin, db };

