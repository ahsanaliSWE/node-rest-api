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
1. Clone the repository
2. Install dependencies
3. Set up Firestore database
4. Obtain service account key
5. Create .env file
6. Update .env file with service account key path
7. Update Firestore database configuration
8. Start the server
