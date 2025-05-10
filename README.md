# 📝 Kazam_EV_assignment

A real-time Notes App built with React, Tailwind CSS, Node.js, Redis, **MQTT**, and MongoDB. Add and view notes instantly using lightweight publish-subscribe messaging via MQTT, with smart caching and persistent storage.

---

## 📚 Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Deployed Links](#deployed-links)  
- [Screenshots](#screenshots)  
- [Contributing](#contributing)  
- [License](#license)  

---

## 🚀 Project Overview

**kazam_assignment** is a real-time Notes Application that allows users to add and view notes instantly.  
It leverages:

- **MQTT** for real-time communication using a publish-subscribe pattern  
- **Redis** for task caching  
- **MongoDB** for long-term storage when the number of notes exceeds 50  

The frontend is fully responsive and built using **React** and **Tailwind CSS** for a smooth user experience across all devices.

---

## ✨ Features

- ⚡ **Real-Time Updates:** Instantly view added notes using MQTT protocol over WebSockets  
- 🧠 **Task Caching:** Temporarily stores notes in Redis for quick access  
- 💾 **MongoDB Storage:** Moves notes to MongoDB automatically once they exceed 50 entries  
- 🌐 **HTTP API:** REST endpoint for fetching all tasks  
- 📱 **Responsive Frontend:** Optimized UI for mobile, tablet, and desktop views  
- 🧩 **Reusable Components:** Modular React components and clean service structure  

---

## 🧰 Tech Stack

### **Frontend**
- React.js  
- TypeScript  
- Tailwind CSS  
- Axios  
- MQTT over WebSocket (MQTT.js Client)  

### **Backend**
- Node.js  
- Express.js  
- TypeScript  
- MQTT Broker & Client
- dotenv  

### **Database**
- Redis (Caching Layer)  
- MongoDB Atlas (Permanent Storage)  

### **Deployment**
- Render.com (Backend)  
- Vercel (Frontend)  

---

## ⚙️ Installation

To run this project locally, follow the steps below:

1. **Clone the repository**
   ```bash
   git clone https://github.com/badrisinghoo7/Kazam_EV_assignment.git
