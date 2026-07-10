# 🤖 FINAL-DEEPSEEK2

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-3FA037?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
</p>

<p align="center">
An AI-powered conversational platform built using the MERN Stack with Google Gemini integration. The application provides intelligent text generation, AI image generation, image analysis, speech-to-text, text-to-speech, secure authentication, subscription management, and payment integration through Razorpay.
</p>

---

Live Link: https://final-deepseek-2.vercel.app/


# 📖 Overview

FINAL-DEEPSEEK2 is a modern AI assistant application that combines powerful generative AI capabilities with a clean and responsive user interface. Users can interact with the AI through text or voice, generate images, analyze uploaded images, manage conversation history, and access premium features through Razorpay integration.

The project follows a scalable MERN architecture with React + Vite for the frontend and Node.js, Express.js, and MongoDB for the backend.

---

# ✨ Features

## 👤 User Features

* User Registration & Login
* JWT Authentication
* Secure User Profile
* AI Chat using Google Gemini
* AI Code Generation
* AI Image Generation
* AI Image Analysis
* Speech-to-Text
* Text-to-Speech
* Save Chat History
* Manage Conversation History
* Premium Subscription
* Razorpay Payment Integration
* Responsive User Interface

---

## 🤖 AI Features

* Intelligent Chat Responses
* Programming Assistance
* Content Generation
* Image Understanding
* AI Prompt Processing
* Real-Time Response Generation

---

## 🔒 Security Features

* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* Authentication Middleware
* Secure API Access

---

# 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* JavaScript (ES6+)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

### AI Services

* Google Gemini API
* Image Generation API
* Speech Recognition
* Text-to-Speech

### Payment

* Razorpay

---

# 📂 Project Structure

```text
FINAL-DEEPSEEK2/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/mayankcharde/FINAL-DEEPSEEK2.git

cd FINAL-DEEPSEEK2
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_google_gemini_api_key

RAZORPAY_KEY_ID=your_razorpay_key

RAZORPAY_SECRET=your_razorpay_secret
IMAGGA API=''
IMAGGA SECRET=''
```

Run the backend server:

```bash
npm start
```

or

```bash
node server.js
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🔑 Environment Variables

| Variable        | Description               |
| --------------- | ------------------------- |
| PORT            | Backend Server Port       |
| MONGO_URI       | MongoDB Connection String |
| JWT_SECRET      | JWT Secret Key            |
| GEMINI_API_KEY  | Google Gemini API Key     |
| RAZORPAY_KEY_ID | Razorpay Public Key       |
| RAZORPAY_SECRET | Razorpay Secret Key       |

---

# 🤖 AI Capabilities

* AI Chat Assistant
* Intelligent Content Generation
* Code Generation
* Image Generation
* Image Analysis
* Speech-to-Text
* Text-to-Speech
* Context-Aware Conversations

---

# 💳 Payment Integration

Premium features are unlocked using Razorpay.

Features include:

* Secure Checkout
* Payment Verification
* Subscription Support
* Transaction Validation

---

# 📦 Backend Modules

* Authentication
* User Management
* AI Chat
* Image Generation
* Image Analysis
* Payment
* Subscription
* History Management

---

# 🎨 Frontend Highlights

* Modern Responsive Design
* Fast React + Vite
* Mobile Friendly
* Reusable Components
* Clean User Experience
* Optimized Performance

---

# ⚡ Performance

* Fast API Responses
* Optimized MongoDB Queries
* Efficient React Rendering
* Lightweight Vite Build
* Scalable Backend Architecture

---

# 🚀 Future Enhancements

* Multi-language Support
* AI Document Analysis
* AI PDF Summarization
* Chat Export
* Dark & Light Themes
* Team Collaboration
* Conversation Sharing
* AI Plugins
* Voice Assistant Improvements
* Advanced AI Memory

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.

2. Create a new branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push to your branch.

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

# 📄 License

This project is developed for educational, learning, and research purposes.

---

# 👨‍💻 Author

**Mayank Charde**

* GitHub: https://github.com/mayankcharde

If you found this project useful, don't forget to ⭐ the repository!
