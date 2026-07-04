# Vaulta Savings API

A secure, scalable RESTful API for a digital savings platform that supports **Single Savings**, **Duo Savings**, and **Family Savings**, complete with authentication, admin management, real-time messaging, automated background jobs, and API documentation.

---

# Overview

Vaulta Savings API enables users to securely create and manage different savings plans while earning fixed interest over a specified maturity period.

The application also includes:

* Secure JWT Authentication
* Email Verification using OTP
* Password Reset via OTP
* Real-time messaging with administrators
* Admin Dashboard APIs
* Automatic maturity processing using Cron Jobs
* Redis caching for improved performance
* Prisma ORM for database management
* Interactive Swagger Documentation

---

# Features

## Authentication

* User Registration
* Email Verification (OTP)
* User Login
* User Logout
* Forgot Password
* Reset Password
* Get Authenticated User
* Update User Profile
* Delete User Account
* Report Problems
* Retrieve User Reports

---

## Single Savings

Users can create and manage individual savings plans.

### Features

* Create Single Savings Plan
* Deposit Funds
* Withdraw Funds
* View Savings History
* Calculate Total Yield
* Automatic Interest Calculation
* Automatic Maturity Handling

### Savings Rules

* Minimum Deposit: ₦100
* Interest Rate: 10%
* Maturity Period: 21 Days

---

## Duo Savings

Allows two users to save together.

### Features

* Create Duo Savings Plan
* Invite Another User
* Accept Invitations
* Deposit Funds
* Withdraw Funds
* View Savings History
* Invitation Management

### Savings Rules

* Maximum Participants: 2
* Minimum Deposit: ₦200
* Interest Rate: 15%
* Maturity Period: 21 Days

---

## Family Savings

Allows multiple family members to save together.

### Features

* Create Family Savings Plan
* Invite Members
* Accept Invitations
* Deposit Funds
* Withdraw Funds
* View Savings History
* Participant Management

### Savings Rules

* Maximum Participants: 5
* Minimum Deposit: ₦1000
* Interest Rate: 30%
* Maturity Period: 21 Days

---

## Admin Module

Provides administrative control over the platform.

### Features

* Register Admin
* Admin Login
* List All Users
* Delete Users
* View All Savings Plans
* Delete Savings Plans
* Manage Withdrawals
* Manage Platform Data

---

## Real-Time Messaging

Integrated support messaging powered by **Socket.IO**.

Features include:

* Users can message support
* Automatic conversation creation
* Retrieve conversation history
* Real-time message delivery
* Conversation rooms
* Read status tracking

---

# Technologies Used

## Backend

* Node.js
* Express.js

## Database

* PostgreSQL
* Prisma ORM

Prisma is used for:

* Database schema management
* Migrations
* Query optimization
* Type-safe database access
* Relationship management

---

## Caching

Redis is integrated to improve API performance.

Redis is used for:

* Frequently requested resources
* Reduced database load
* Faster response times
* Temporary caching of savings data

---

## Background Jobs

Cron Jobs automate scheduled platform activities.

Used for:

* Savings maturity processing
* Automatic status updates
* Time-based business logic
* Scheduled maintenance tasks

---

## Authentication

* JWT (JSON Web Tokens)
* HTTP-only Cookies
* OTP Verification

---

## Documentation

Swagger (OpenAPI)

Interactive API documentation is available after running the server.

```
http://localhost:PORT/api-docs
```

---

## Security

The API includes multiple security best practices:

* Helmet
* CORS
* JWT Authentication
* HTTP-only Cookies
* Password Hashing
* Input Validation
* Error Handling Middleware

---

## Compression

Responses are compressed using Express Compression middleware for improved performance.

---

## Logging

Custom logging middleware is included for monitoring incoming requests.

---

# Project Structure

```
src/
│
├── bootstrap/
├── config/
├── docs/
├── middleware/
├── modules/
│   ├── auth/
│   ├── admin/
│   ├── singleSavings/
│   ├── duoSavings/
│   ├── familySavings/
│   └── messages/
│
├── lib/
│   ├── cronJobs.js
│   └── utilities
│
└── server.js
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/yourusername/vaulta-api.git
```

Navigate into the project

```bash
cd vaulta-api
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

Example:

```env
PORT=5000

DATABASE_URL=

JWT_SECRET=

JWT_EXPIRES_IN=

REDIS_URL=

EMAIL_HOST=

EMAIL_PORT=

EMAIL_USER=

EMAIL_PASSWORD=

BITCOIN_ADDRESS=

ETHEREUM_ADDRESS=
```

---

# Database Setup

Generate Prisma Client

```bash
npx prisma generate
```

Run database migrations

```bash
npx prisma migrate dev
```

---

# Running Redis

Start Redis before running the API.

```bash
redis-server
```

---

# Start the Server

Development

```bash
npm run start:dev
```

Production

```bash
npm run start:prod
```

---

# API Documentation

Once the server is running:

```
http://localhost:5000/api-docs
```

Swagger provides complete documentation for:

* Authentication
* Single Savings
* Duo Savings
* Family Savings
* Admin
* Messaging

---

# Real-Time Events

The API uses Socket.IO.

Available events:

```
joinConversation
```

```
leaveConversation
```

Messages are automatically broadcast to every user connected to the conversation room.

---

# Performance Optimizations

The API includes several optimizations:

* Redis caching
* Database optimization with Prisma
* HTTP compression
* Pagination
* Efficient database queries
* Middleware-based architecture

---

# Error Handling

Centralized error handling is implemented across the application for consistent API responses.

---

# Future Improvements

* Email Notifications
* Push Notifications
* Bank Transfer Integration
* Payment Gateway Integration
* Transaction History
* Audit Logs
* Role-Based Permissions
* Multi-factor Authentication
* Docker Deployment
* CI/CD Pipeline

---

# Tech Stack Summary

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* Redis
* JWT Authentication
* Socket.IO
* Swagger/OpenAPI
* Cron Jobs
* Helmet
* CORS
* Compression
* Cookie Parser

---

# Author

Developed by **Ikwuka Martin Somto**.
