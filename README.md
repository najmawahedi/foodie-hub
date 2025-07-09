# Foodie Hub – Backend API

This is the backend system for **Foodie Hub**, a public food ordering platform that allows users to browse restaurants, view menus, place orders, and track them — **no login required**.

---

## Project Purpose

This project was built to demonstrate full backend development using Node.js, Express, and PostgreSQL. The system follows a modular MVC structure and provides RESTful APIs for restaurant, menu, customer, and order management.

---

## Features Implemented

### Restaurant Management
- Add a new restaurant
- View all restaurants
- Edit restaurant details
- Delete a restaurant

### Menu Management
- Add menu items to a restaurant
- Edit or remove menu items
- List all menu items for a restaurant
- Mark menu items as available/unavailable

### Customer Management
- Add a new customer (name & phone only)
- View all customers
- Update or delete customer info

### Ordering System
- Place an order with selected items and quantities
- View all orders in the system
- View all orders by a specific customer
- Update an order’s status (e.g., pending → completed)
- Cancel or delete an order

---

## Technologies Used

- Node.js
- Express
- PostgreSQL
- `pg` (PostgreSQL driver)
- `dotenv` for environment configuration
- Postman (for testing)

---

## How to Run the Project

### 1. Clone the repository
```bash
git clone https://github.com/najmawahedi/foodie-hub.git
cd foodie-hub
```

### 2.  Install dependencies
```bash
npm i
```

### 3. Setup environment variables
Create a .env file using the provided .env.example

### 4. Create the database schema
Make sure PostgreSQL is running, then execute:
```bash
psql -U your_user -d your_database -f schema.sql
```
replace your_user and your_databse with your local setup

### start the server
```bash
npm start
```
