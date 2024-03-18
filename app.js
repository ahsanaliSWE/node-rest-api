
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
//const serviceAccount = require(`/Users/Ahsan Ali/Downloads/muet-api-firebase-adminsdk-jsu7e-c229b27a4e.json`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

app.use(express.json()); // Enable JSON body parsing
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded body parsing

const db = admin.firestore(); // Reference to Firestore database

// Welcome message and list of endpoints
app.get('/', (req, res) => {
  const message = 'Welcome to the MUET APP API!\n\nAvailable endpoints: <br> - POST /history (Create a new history) <br> - GET /history (Retrieve all history)<br><br>- POST /achievements (Create a new achievements)<br>- GET /achievements (Retrieve all achievements)<br><br>- POST /directory (Create a new directory)<br>- GET /directory (Retrieve all directory)';
  res.send(message);
});

// Create users endpoint
app.post('/history', async (req, res) => {
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
app.get('/history', async (req, res) => {
  console.log("/user request");
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
app.get('/history/:id', async (req, res) => {
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

app.put('/history/:id', async (req, res) => {
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

  app.delete('/history/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      await db.collection('users').doc(userId).delete();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user.' });
    }
  });

  app.get('/history/search', async (req, res) => {
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
  


app.put('/history/:id', async (req, res) => {
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

// GET all achiecements
app.get('/achievements', async (req, res) => {
  console.log("/achievements get request");
 try {
    const querySnapshot = await db.collection('achievements').get();
    const achievements = querySnapshot.docs.map(doc => doc.data());
    res.json(achievements);
  } catch (error) {
    console.error('Error retrieving achievements:', error);
    res.status(500).json({ error: 'Failed to retrieve achievements.' });
  }
});

// GET all directory
app.get('/directory', async (req, res) => {
  console.log("/directory get request");
  try {
    const querySnapshot = await db.collection('directory').get();
    const directory = querySnapshot.docs.map(doc => doc.data());
    res.json(directory);
  } catch (error) {
    console.error('Error retrieving directory:', error);
    res.status(500).json({ error: 'Failed to retrieve directory.' });
  }
});

// GET all exams
app.get('/announcements/exams', async (req, res) => {
  console.log("/exam get request");
  try {
    const querySnapshot = await db.collection('exams').get();
    const exams = querySnapshot.docs.map(doc => doc.data());
    res.json(exams);
  } catch (error) {
    console.error('Error retrieving directory:', error);
    res.status(500).json({ error: 'Failed to retrieve directory.' });
  }
});

// GET all general
app.get('/announcements/general', async (req, res) => {
  console.log("/general get request");
  try {
    const querySnapshot = await db.collection('general').get();
    const general = querySnapshot.docs.map(doc => doc.data());
    res.json(general);
  } catch (error) {
    console.error('Error retrieving directory:', error);
    res.status(500).json({ error: 'Failed to retrieve directory.' });
  }
});

// GET all sports
app.get('/announcements/sports', async (req, res) => {
  console.log("/sports get request");
  try {
    const querySnapshot = await db.collection('sports').get();
    const sports = querySnapshot.docs.map(doc => doc.data());
    res.json(sports);
  } catch (error) {
    console.error('Error retrieving directory:', error);
    res.status(500).json({ error: 'Failed to retrieve directory.' });
  }
});

// GET all classes
app.get('/announcements/classes', async (req, res) => {
  console.log("/classes get request");
  try {
    const querySnapshot = await db.collection('classes').get();
    const classes = querySnapshot.docs.map(doc => doc.data());
    res.json(classes);
  } catch (error) {
    console.error('Error retrieving classes:', error);
    res.status(500).json({ error: 'Failed to retrieve classes.' });
  }
});

// GET all news
app.get('/news', async (req, res) => {
  console.log("/news get request");
  try {
    const querySnapshot = await db.collection('news').get();
    const news = querySnapshot.docs.map(doc => doc.data());
    res.json(news);
  } catch (error) {
    console.error('Error retrieving news:', error);
    res.status(500).json({ error: 'Failed to retrieve news.' });
  }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });



