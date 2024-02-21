const express = require('express');
const admin = require('firebase-admin');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;
const serviceAccount = require(`/Users/Ahsan Ali/Downloads/muet-api-firebase-adminsdk-jsu7e-c229b27a4e.json`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // No need for databaseURL when using Firestore
});

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
/* 
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
// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });


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
