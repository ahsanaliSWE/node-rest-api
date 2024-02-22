
const express = require('express');
const admin = require('firebase-admin');
require('dotenv').config();
const app = express();

const serviceAccountKey = {
  "type": "service_account",
  "project_id": "muet-api",
  "private_key_id": "c229b27a4ebdf26b2c4ee2cc4988ad18fc366694",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3QmdUNR0FDN3F\n0ZWrQCJHyBncuUCczjwzAVuaC1vMaBW4gdX7s7dBSmHOx5HhTf+uf212A2wlNgWs\ng9+ZPM7cuSYnIwos0I/T6/LHj00QH/eQqVe6ThiEyJLQ1pgqLKDZcZGlSzb6ibXe\nu3h057WU7x7wRKtFjIG/q/cfCCwMep5zRVdinyzfdlz5QnA2r8Id1aCfUAm1LFf4\nSnI3OiHfhXnEIpsj/muU1XgXcpm3wwzXT14rbO9dJWVfysMuC7u0AYp0jnQdwuoC\nKCGGTtHKnkLw6vYUalmGsKrrulYrM9zMGjPEjK4jEl07xWxJQgCTKKWvbkpsBek+\nJYt0jgLrAgMBAAECggEAHgJ1wUhhVC5jMr27cKuz8WVHNunvNr5fBUs3oOYzRinV\nRL2eOPWZEMwJcD8mGGsZb43WcvjkgMNz8mg1+XYHugVnxgjq5aPRqbZ9r0g8KmPR\nupLAlvWq9jOSNzis+lsMjA8Y9qR2gFiEu9CfTSWUiqsNufLEyULVDHowoZhI/lHf\nKCfW4UzuD9nGwH/a7B1HS5KbHzoFTuwndSf8tWaSubufwBtDsTFu3xnmu72FklSC\nLGW6dixlYuaDgztauwO+Xjt4rmUhqwLTPlcNEZYQsSIheIjaHxdN8ilc6BZmj3CQ\nsMLzhElsk8ICsINDG0VtCdgeZ4V4gLbI1FEyFFWjwQKBgQDZi21BUtuReGSk0lOs\n9BrA2ajJGlQ2JwrPw2c1oxwsZjtKDcaYlOuSHmtiqXVT0flHhtaLS2+zeGSJ3P4l\nP0pRBmaSdsfymEu6gre9OHjNcDCZR1wROAu+rqJZLNWf2OTwqFzDgtHJ5ckZFagU\n1dDhHeGGquXKgIq39SW1/uKRKQKBgQDXp3ZnVBYPshHZHJDKzHPo6j+TEBKFxN1Z\nOxpXpLyJXFKkmlSq9NrvNF5Nx/XMoMDKKK+elu2Yp3+5+no5+dwyDLDYRNEYdyQ3\nMtxqlhYU+YOkQWeE+DJnGAA4VJ3yMteN7sr7Gsct96qgi+BhUFD139RUje9C/hqw\nyCPX/9aR8wKBgQCP6qlQudwAFMGgOHSayrKYOmZrBDwJxzJj2EWDOnD8/nTivNJR\nRtPBStaH4st3tEVRiGaOqE0xUchRXB3VzlT/3VgmNOZ6Gz6eGLQtPhrM7hd4j7jc\nu1MpxqYokHySzw5GF1unC/h1tMqhCa60ee9Bvl7glFaI7RjYMhnMmN6SYQKBgBv5\nH/W1RYtRqNkFyI5VyO88e3SjEBQD/kZV0UvvFXmn3Rx23Ga0jjWbEGR8fJjHfVp7\nvpQOtdEoYPwJzpL4oyRm2wWin5DR24PBeC/nOgQMfZPv2/K2kysmRNkJuNcy2x0R\nDYlW5uFCkAJ1Qmy9E1NhblRteMyy01l9DJE3IWkbAoGBAKQSGZ2yNkkroNOQUqNX\noFnyKeJzo61bNdRy3M3m965aREzC7dqRqOOkyCsIRzqQqa0fHRzZyVd6r82tfFZr\nUJ8mkxoRUN6oe/sTtH3srxNx4kB2PTXsetC8yeKejQyfUGiXPGJ3U9/pM22a+/XD\nh4LB3sggM3J8Af6bsePmnoDU\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-jsu7e@muet-api.iam.gserviceaccount.com",
  "client_id": "106121180160763375322",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jsu7e%40muet-api.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


const PORT = process.env.PORT || 3000;
//const serviceAccount = require(serviceAccountKey);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

app.use(cors());
app.use(express.json()); // Enable JSON body parsing
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded body parsing

const db = admin.firestore(); // Reference to Firestore database

// Create users endpoint
app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const docRef = await db.collection('users').add(user); // Add document to Firestore
    res.status(201).json({ message: 'User created successfully', id: docRef.id });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

// GET all users
app.get('/users', async (req, res) => {
  try {
    const querySnapshot = await db.collection('users').get();
    const users = querySnapshot.docs.map(doc => doc.data());
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Failed to retrieve users.' });
  }
});

// GET specific user by ID
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const doc = await db.collection('users').doc(userId).get();
    if (doc.exists) {
      res.json(doc.data());
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Failed to retrieve user.' });
  }
});

app.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
  
    try {
      await db.collection('users').doc(userId).update(userData);
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user.' });
    }
  });

  app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      await db.collection('users').doc(userId).delete();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user.' });
    }
  });

  app.get('/users/search', async (req, res) => {
    const { name } = req.query;
  
    try {
      const querySnapshot = await db.collection('users').where('name', '==', name).get();
      const users = querySnapshot.docs.map(doc => doc.data());
      res.json(users);
    } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).json({ error: 'Failed to search users.' });
    }
  });
  


app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;

  try {
    await db.collection('users').doc(userId).update(userData);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
/* 
const productData = [];

app.post('/api/add_product', (req, res) => {
     console.log("Result",req.body);
     const pdata = { 
      "id": productData.length+1,
      "pname": req.body.pname,
      "price": req.body.price,
      "desc": req.body.pdesc
     };
})

productData.push(pdata);
console.log("Final",pdata);

res.status(200).send({
    "status_code": 200,
    "status_message": "Product added successfully",
    "prodcuct": pdata
}) */
/* ,
app.get('/users/search', async (req, res) => {
    const { name } = req.query; // Extract search term from query parameters
  
    try {
      // Check if search term is present and valid
      if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid search term.' });
      }
  
      // Perform case-insensitive search using LIKE query (consider indexing for performance)
      const querySnapshot = await db.collection('users').where('name', 'like', `${name.toLowerCase()}`).get();
  
      // Handle empty results gracefully
      if (querySnapshot.empty) {
        return res.json({ message: 'No users found with that name.' });
      }
  
      // Extract matched users and send response
      const users = querySnapshot.docs.map(doc => doc.data());
      res.json(users);
    } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).json({ error: 'Failed to search users.' });
    }
  });

 */


/* //middleware
//app.use("/api/products", products_routes);

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log('${PORT} Yes I am connected');
            console.log('Server is running on port 3000');
        })
    } catch (error) {
        console.log('Cannot connect to the server',error);
    }

};

start(); */

/* var admin = require("firebase-admin");

var serviceAccount = require("/Users/Ahsan Ali/Downloads/muet-api-firebase-adminsdk-jsu7e-c229b27a4e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
//let customerRef = db.collection('customers');

db.collection("users").doc("I5bS80VAvxC2G7XqwjM3").onSnapshot(docSnapshot => {
    console.log(docSnapshot.data());
}) */

//delete data from database
/* const batch = db.batch();

const user2 = db.collection('users').doc('2');
const user3 = db.collection('users').doc('3');

db.collection('users').doc('1').delete().then((doc) => {
    console.log("document deleted")
});

 */
// adding in database
/* const data = {
    id: 1,
    number: 0,
    name: 'John Doe',
    email: 'qwe@fmail.com',
    card: true,
    
}
db.collection('users').doc(data.id.toString()).set(data);
 */

/* customerRef.get().then((querySnapshot) => {
    querySnapshot.forEach(document => {
        console.log(document.data());
    })}); */
