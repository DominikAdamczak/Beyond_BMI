# Beyond BMI - Appointment Booking System

A full-stack mobile application for medical appointment booking with integrated payment processing.

## Overview

React Native (Expo) + Node.js application enabling users to view available appointment slots, book appointments, and process payments through Stripe's test environment.

## Tech Stack

**Frontend:** React Native, Expo, TypeScript, Expo Router, Axios  
**Backend:** Node.js, Express, RESTful API  
**Payment:** Stripe (Test Mode)

## Quick Start

### Prerequisites
- Node.js v16+
- Android Emulator or iOS Simulator
- Stripe test account

### Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configuration

**Backend** (`backend/.env`):
```env
PORT=3000
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```env
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:3000/api  # Android Emulator
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

> **Note:** Use `http://localhost:3000/api` for iOS, `http://10.0.2.2:3000/api` for Android Emulator

### Running the Application

**Start Backend:**
```bash
cd backend
npm start
```

**Start Frontend:**
```bash
cd frontend
npm start
# Press 'a' for Android or 'i' for iOS
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | List available slots |
| POST | `/api/book` | Create booking |
| POST | `/api/pay` | Process payment |

## Testing

**Test Card:** `4242 4242 4242 4242`  
**Expiry:** Any future date (e.g., 12/34)  
**CVC:** Any 3 digits (e.g., 123)

## Project Structure

```
Beyond_BMI/
├── frontend/          # React Native app
│   ├── app/          # Screens (Expo Router)
│   └── services/     # API layer
└── backend/          # Express API
    ├── controllers/  # Request handlers
    ├── services/     # Business logic
    └── routes/       # API routes
```

## Features

- ✅ View available appointment slots
- ✅ Book appointments with validation
- ✅ Process test payments via Stripe
- ✅ TypeScript type safety
- ✅ Environment-based configuration
- ✅ RESTful API design

## Troubleshooting

**Cannot connect to backend:**
- Verify backend is running on port 3000
- Check `EXPO_PUBLIC_API_BASE_URL` in `frontend/.env`
- Use `10.0.2.2` for Android Emulator

**Stripe issues:**
- Verify test key starts with `pk_test_`
- Use test card: `4242 4242 4242 4242`

**App not updating:**
```bash
cd frontend
npm start -- --clear
```

## License

Beyond BMI Technical Assessment
