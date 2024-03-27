# MUET APP API

This is an Express.js server setup to provide API endpoints for managing user data, achievements, directory information, announcements, and news for the MUET (Mehran University of Engineering and Technology) application.

# Endpoints

## History
POST /history: Create a new user history.
GET /history: Retrieve all user histories.
GET /history/:id: Retrieve a specific user history by ID.
PUT /history/:id: Update a specific user history by ID.
DELETE /history/:id: Delete a specific user history by ID.
GET /history/search: Search for users by name.

## Achievements
GET /achievements: Retrieve all achievements.
## Directory
GET /directory: Retrieve all directory entries.
## Announcements
GET /announcements/exams: Retrieve all exam announcements.
GET /announcements/general: Retrieve all general announcements.
GET /announcements/sports: Retrieve all sports announcements.
GET /announcements/classes: Retrieve all class announcements.
## News
GET /news: Retrieve all news.

## Setup

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up a Firestore database in your Firebase project.
4. Obtain a service account key file from Firebase and save it in a secure location.
5. Create a `.env` file in the root directory and add the following environment variables:
   ```plaintext
   PORT=3000
   FIREBASE_SERVICE_ACCOUNT_KEY_PATH=/path/to/serviceAccountKey.json

  
