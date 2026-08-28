# FoodExpress — Full-Stack Food Delivery App (Learning Project)

A complete MERN-style food delivery application built with plain JavaScript.

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Frontend:** React (Vite), React Router, Context API, Axios

## Folder Structure

```
food-delivery-app/
├── backend/
│   ├── config/         # MongoDB connection
│   ├── controllers/    # Route handler logic
│   ├── middleware/     # auth, admin, error handling
│   ├── models/         # Mongoose schemas: User, Restaurant, Food, Order
│   ├── routes/         # Express routers
│   ├── seed/           # Database seed script
│   ├── utils/          # generateToken helper
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/         # centralized axios instance
    │   ├── components/  # Navbar, cards, ProtectedRoute, Loading, ErrorMessage
    │   ├── context/      # AuthContext, CartContext
    │   ├── pages/        # Home, Restaurants, Cart, Checkout, Admin, etc.
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env.example
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Prerequisites

- Node.js 18+
- A running MongoDB instance (local `mongod`, or a free MongoDB Atlas cluster)

## 1. Install dependencies

```bash
# Backend
cd food-delivery-app/backend
npm install

# Frontend (in a separate terminal)
cd food-delivery-app/frontend
npm install
```

## 2. Configure environment variables

**Backend** — copy the example file and edit values:

```bash
cd food-delivery-app/backend
cp .env.example .env
```

Edit `backend/.env`:

```
MONGO_URI=mongodb://127.0.0.1:27017/food-delivery-app
JWT_SECRET=some_long_random_string
JWT_EXPIRES_IN=7d
PORT=5000
```

**Frontend** — copy the example file:

```bash
cd food-delivery-app/frontend
cp .env.example .env
```

Edit `frontend/.env` if your backend runs on a different host/port:

```
VITE_API_URL=http://localhost:5000/api
```

## 3. Seed the database

Make sure MongoDB is running, then from the `backend` folder:

```bash
npm run seed
```

This creates:
- An admin user: `admin@fooddelivery.com` / `admin123`
- A customer user: `john@example.com` / `customer123`
- 4 sample restaurants with menus
- 1 sample delivered order

## 4. Start the backend

```bash
cd food-delivery-app/backend
npm run dev      # with nodemon (auto-restart)
# or
npm start        # plain node
```

The API will be available at `http://localhost:5000/api`.

## 5. Start the frontend

```bash
cd food-delivery-app/frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

## Using the App

1. Open `http://localhost:5173`
2. Browse restaurants without logging in.
3. Register a new customer account, or log in with the seeded customer account.
4. Add food to your cart, adjust quantities, and check out.
5. View your orders and their delivery status under **My Orders**.
6. Log in as the seeded admin (`admin@fooddelivery.com` / `admin123`) to access **Admin** in the navbar:
   - Create, edit, and delete restaurants
   - Create, edit, and delete food items
   - View all orders and update their status

## API Overview

| Method | Route                        | Access          |
|--------|-------------------------------|-----------------|
| POST   | /api/auth/register             | Public          |
| POST   | /api/auth/login                | Public          |
| GET    | /api/auth/me                   | Private         |
| GET    | /api/restaurants                | Public          |
| GET    | /api/restaurants/:id            | Public          |
| POST   | /api/restaurants                | Admin           |
| PUT    | /api/restaurants/:id            | Admin           |
| DELETE | /api/restaurants/:id            | Admin           |
| GET    | /api/foods                      | Public (filter by ?restaurant=) |
| GET    | /api/foods/:id                  | Public          |
| POST   | /api/foods                      | Admin           |
| PUT    | /api/foods/:id                  | Admin           |
| DELETE | /api/foods/:id                  | Admin           |
| POST   | /api/orders                     | Customer        |
| GET    | /api/orders                     | Private (own orders, or all for admin) |
| GET    | /api/orders/:id                 | Owner or admin  |
| PUT    | /api/orders/:id/status           | Admin           |

## Notes

- Passwords are hashed with bcrypt and never returned in API responses.
- JWT tokens are stored in `localStorage` on the frontend and attached automatically to requests via an Axios interceptor.
- The cart is persisted in `localStorage` and restricted to one restaurant at a time (adding food from a different restaurant replaces the cart).
- Order prices are always recalculated server-side from the current food prices, never trusted from the client.
- This project intentionally avoids Docker, GraphQL, WebSockets, payment gateways, and other unnecessary complexity to stay approachable for learning.
