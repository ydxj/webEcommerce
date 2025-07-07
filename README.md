# 🛒 E-Commerce Web Application

A full-stack e-commerce web application built using **React** for the frontend and **Node.js** with **Express** for the backend. This project includes user authentication, product management, shopping cart functionality, and smooth UI animations.

---

## 🔧 Tech Stack

### 🖥 Frontend
- **React**
- **React Router DOM** – Routing
- **GSAP** – Animations
- **Font Awesome** – Icons
- **Axios** – HTTP requests
- **Context API / Redux** – (Optional) for state management

### 🛠 Backend
- **Node.js**
- **Express**
- **JWT** – Authentication
- **Bcrypt** – Password hashing
- **MySQL2** – Relational database

---

## 🚀 Features

### ✅ User
- Register & Login (JWT Auth with Bcrypt)
- Profile management
- Browse products
- Add to cart / wishlist
- Checkout process

### 🛍 Admin
- Add/Edit/Delete products
- View user orders
- Manage inventory

### 💡 UI/UX
- Smooth animations with **GSAP**
- Responsive and modern design
- Icon-rich interface with **Font Awesome**

---

## 🗂 Project Structure

- /src
- /components
- /pages
- /assets
- /utils
- /server # Node.js backend
- /controllers
- /routes
- /models
- /middleware

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app
```
### 2. Setup Backend
```bash
cd server
npm install
```
#### Create a .env file:

- To fill later
3. Setup Frontend
```bash

cd ./frontend
npm install
npm start
```
## 🔐 Authentication Flow
- User registers → Password is hashed using Bcrypt

- On login → JWT is generated and stored in localStorage or HTTP-only cookies

- Protected routes are accessed via token validation middleware

