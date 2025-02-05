# MERN Chat Application

A **real-time chat application** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** with **Socket.io** for seamless messaging and **JWT authentication** for secure user access.

## 🚀 Features

- **Real-time Messaging** with WebSockets (Socket.io)
- **User Authentication** (JWT-based login/signup)
- **One-on-One Chat** functionality
- **Image Sharing**
- **User Online/Offline Status**
- **Multiple chat themes**
- **Responsive UI** built with Tailwind CSS and daisy UI

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS and Daisy UI components
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Real-time Communication:** Socket.io
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Render.com (Backend & Frontend)

## 📌 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - User login

### Messages

- `GET /api/messages/:id` - Get messages with a specific user
- `POST /api/messages/send/:id` - Send a message

### Users

- `GET /api/messages/users` - Get all users (except the logged-in user)

## 📖 Future Enhancements

- Group Chats
- Voice & Video Calling
- Message Reactions
- Typing Indicators

**Live Demo URL** - [MERN Chat App](https://mern-chat-app-wyvi.onrender.com/login)

## 📩 Contact

For queries or collaboration, reach out via [LinkedIn](https://www.linkedin.com/in/ujjwal-sharma-1809-/).

