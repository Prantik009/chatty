# 💬 Chatty - Real-Time Chat Application

Chatty is a real-time messaging application with a React frontend and Node.js backend, enabling seamless user communication with secure authentication and media sharing.

## About The Project
ChatApp allows users to register, log in, and chat in real-time. It features a responsive UI styled with Tailwind CSS and DaisyUI, real-time messaging via Socket.IO, and media uploads powered by Cloudinary. The backend uses Express and MongoDB, with JWT for authentication.

## 🛠️ Features

✅ User Authentication (Signup / Login)  
✅ Password hashing using `bcryptjs`  
✅ JWT-based Authentication with HttpOnly Cookies  
✅ Real-time Messaging with Socket.IO  
✅ Zustand-powered Global State  
✅ Search and select users for chat  
✅ Clean and minimal Tailwind UI  
✅ Toast notifications for feedback  
✅ Responsive for both desktop and mobile 

### Tech Stack
**Frontend:**
- React
- React Router
- Tailwind CSS
- DaisyUI
- Socket.IO Client
- Axios
- Zustand
- React Hot Toast
- Lucide React

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)
- Socket.IO
- Cloudinary
- JWT
- bcrypt
- CORS
- Cookie Parser
- Dotenv

## Getting Started

### Prerequisites
- Node.js
- npm
- MongoDB
- Cloudinary account

### Installation
1. Clone the repo:
   ```sh
   git clone https://github.com/Prantik009/ChatApp.git
   ```
2. Navigate to frontend and install dependencies:
   ```sh
   cd frontend
   npm install
   ```
3. Navigate to backend and install dependencies:
   ```sh
   cd ../backend
   npm install
   ```
4. Set up environment variables in `backend/.env`:
   ```sh
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   PORT=5000
   ```
5. Run the backend:
   ```sh
   cd backend
   npm run dev
   ```
6. Run the frontend:
   ```sh
   cd frontend
   npm run dev
   ```

## Deployment
1. Build the frontend:
   ```sh
   cd frontend
   npm run build
   ```
2. Deploy the backend on a platform like Render or Heroku.
3. Serve the frontend build files using a static file server or deploy on Vercel/Netlify.
4. Ensure environment variables are configured on the deployment platform.


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository  
2. Create a new branch  
```bash
git checkout -b feature/your-feature
```
3. Commit your changes  
```bash
git commit -m 'Add your feature'
```
4. Push to your branch  
```bash
git push origin feature/your-feature
```
5. Open a Pull Request

---

## 📬 Contact

Built with ❤️ by Prantik Biswas  
📧 Email: biswasritam5.13@gmail.com 
🌐 LinkedIn: https://www.linkedin.com/in/prantik-biswas-a74ab4347/

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
