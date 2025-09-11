# 🚀 Finnovation

## ✨ Project Overview
Finnovation is a **fintech innovation platform** designed to onboard and manage diverse participants across the financial ecosystem including:

- 🏦 Financial Institutions  
- 🚀 Fintech Startups  
- 💰 Investors  
- 🤝 Ecosystem Partners  

It fosters seamless **collaboration**, **data collection**, and **co-innovation** through a secure multi-step registration process and an intuitive admin dashboard.

## 🚀 Live Demo
Check out the live app here: [Finnovation](https://finnovation-6x1lxa482-mrnishs-projects.vercel.app/)



## 🔥 Features

- **Multi-step Registration Form**  
  - 📝 Capture of participant **basic details**  
  - 🔄 Dynamic category selection with **category-specific fields**  
  - 📧 Email verification & 📱 Phone OTP verification for security  
  - 📂 File uploads (company profile, logos) handled via Cloudinary  
  - ✅ User consent and declaration capture  
  - 🔍 Review & Submit step for thorough data verification  

- **Admin Dashboard**  
  - 🔐 Secure admin login  
  - 🔎 Search and filter registrations by category, country, and interest area  
  - 📊 View **total** and **category-wise** registration counts  
  - 📥 Export filtered registrations as **CSV** for offline analysis  

- **User Experience**  
  - 🎨 Responsive and clean UI built with React and CSS Modules  
  - ⚡ Fast, real-time cloud database powered by Firebase Firestore  
  - 🔒 Reliable Firebase Authentication for user verification  


## 🛠️ Technology Stack

| Layer               | Technology                                     |
| ------------------- | -----------------------------------------------|
| 💻 Frontend        | React.js, CSS Modules                           |
| 🗄️ Backend & DB    | Firebase Firestore                              |
| 🔐 Authentication  | Firebase Authentication (Email & Phone OTP)     |
| ☁️ File Uploads    | Cloudinary                                      |


## 🚀 Installation & Setup

1. **Clone the repository:**
git clone https://github.com/MrNish/Finnovation.git
cd Finnovation

2. **Install dependencies:**
npm install

3. **Configure Firebase:**
- Create a project on [Firebase Console](https://console.firebase.google.com)  
- Enable **Firestore Database** and **Authentication** services  
- Add your Firebase config to `firebaseConfig.js`  

4. **Set up Cloudinary:**
- Create account on [Cloudinary](https://cloudinary.com/)  
- Get your **Cloudinary URL** and **Upload preset**  
- Update those values in the upload component  

5. **Run the development server:**
npm start


6. **Open your browser:**
http://localhost:3000/


## 🎯 Usage

### 👥 Participants
- Fill out the multi-step registration form including basic information, category-specific details, file uploads, and consents  
- Perform email and phone verification to complete registration  

### 🔐 Admins
- Login via the Admin Panel  
- View, search, and filter registrations  
- Export registration data for reports and analysis  


## 🤝 Contribution Guidelines
Contributions are welcome!  
Steps to contribute:  
- 🍴 Fork the repository  
- 🌿 Create a new branch: `git checkout -b feature/YourFeature`  
- 💾 Commit your changes: `git commit -m "Add feature"`  
- 🚀 Push branch: `git push origin feature/YourFeature`  
- 🔃 Open a pull request for review  


Thank you for your interest in Finnovation! 🎉✨


