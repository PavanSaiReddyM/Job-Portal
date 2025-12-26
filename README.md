# 💼 Job Portal  

Job Portal is a **full-stack job management web application** built using **Node.js**, **Express.js**, **MongoDB**, and **React.js**.  
It allows **job seekers** to find and apply for jobs, and **recruiters** to create companies, post jobs, and manage applicants.  

---
## 🌐 Live Preview  
[Click here to view the deployed app](https://job-portal-ec1m.onrender.com/)  

---
## ✨ Features  

### 👤 Authentication  
✅ User signup & login with JWT authentication  
✅ Role-based access (Job Seeker / Recruiter)  
✅ Secure logout using HTTP-only cookies  

### 🧑‍💼 Job Seeker  
✅ Browse and search jobs by keyword  
✅ View job details  
✅ Apply for jobs  
✅ Upload profile photo & resume  
✅ Update personal profile  

### 🏢 Recruiter  
✅ Create and manage companies  
✅ Post new job openings  
✅ View applicants for each job  

### ☁️ Media & Storage  
✅ Profile photo and resume uploads using **Cloudinary**  
✅ Secure file handling with **Multer**  

---

## 🛠 Tech Stack  

### Backend  
- Node.js  
- Express.js  
- MongoDB & Mongoose  
- JWT Authentication  
- Cloudinary  

### Frontend  
- React.js  
- Tailwind CSS  

### Deployment  
- **Render** (Frontend + Backend)  
- **MongoDB Atlas** (Database)  

---

## 🚦 How It Works  

1️⃣ User accesses the web application.  
2️⃣ React frontend sends API requests using Axios.  
3️⃣ Express.js backend handles authentication and business logic.  
4️⃣ MongoDB stores users, companies, jobs, and applications.  
5️⃣ Cloudinary manages image and resume uploads.  
6️⃣ Render hosts the complete application for public access.  

---

## 🚀 How to Run Locally  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/PavanSaiReddyM/Job-Portal.git
cd jobportal
```
## 🚀 How to Run Locally

Install backend dependencies:
```bash
cd backend  
npm install  
```
Install frontend dependencies:
```bash
cd frontend  
npm install  
```
Start the backend server:
```bash
npm run dev  
```
Start the frontend server:
```bash
npm run dev  
```
🌐 Application URLs

Frontend:
```bash
http://localhost:5173  
```
Backend:
```bash
http://localhost:8000  
```

