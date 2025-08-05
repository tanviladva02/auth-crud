# 🔐 Auth + CRUD API with Node.js, MongoDB Atlas & JWT

A clean and powerful authentication + CRUD system built with **Node.js**, **Express**, **Mongoose**, **MongoDB Atlas**, and **JWT**. Includes full login/signup, password hashing with **bcrypt**, and token-based **private routing**.

---

## 🚀 Features

- ✅ Signup & Login with hashed passwords
- 🔒 Private routes protected by JWT middleware
- 🧠 Secure token storage using cookies
- 📦 CRUD operations (Products, Users, etc.)
- 🌍 Hosted MongoDB with **MongoDB Atlas**
- 🔐 Environment variables with `.env`

---

## 🧪 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **JWT (jsonwebtoken)**
- **bcrypt.js**
- **dotenv**

---

## 🛠️ Project Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up `.env`

Create a `.env` file in root and add:

```env
MONGO_URI=your_mongodb_atlas_connection_string
```

---

## 📦 API Routes

### 🔐 Auth

#### ➕ Signup

`POST /auth/signup`

```json
{
  "name": "Tanvi",
  "email": "tanvi@example.com",
  "password": "supersecret"
}
```

#### 🔓 Login

`POST /auth/login`

```json
{
  "email": "tanvi@example.com",
  "password": "supersecret"
}
```

> 🔁 Returns a JWT token that you’ll use in the header for protected routes.

---

### 🔒 Private Routes (Example: Products)

#### 🆕 Create Product

`POST /api/product/create`

Cookies:

- token stored in cookies while login

Body:

```json
{
  "name": "iPhone 17",
  "price": 99999,
  "description": "Insane upgrade",
  "quantity": 1
}
```

#### 🔁 Get All Products

`GET /api/product/`

#### 🗑️ Delete Product

`DELETE /api/product/:id`

---

## 🔐 Middleware – JWT Auth

In `middleware/auth.js`:

```js
import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
```

---

## 🧼 Password Hashing with Bcrypt

```js
import bcrypt from "bcrypt";

const hashPass = await bcrypt.hash(password, 10);
const match = await bcrypt.compare(plainPassword, hashFromDB);
```

---

## 🧠 Pro Tips

- Always use **async/await**
- Use `try/catch` in routes
- Store tokens **securely** (in frontend → localStorage or cookies)
- Validate user inputs!

---

## 👩‍💻 Author

Made with 💻 by **Tanvi Ladva** — fueled by caffeine, code, and curiosity ☕🚀  
Let's gooo!
