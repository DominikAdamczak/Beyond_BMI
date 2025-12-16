# Beyond BMI - Appointment Booking System

A full-stack mobile application for medical appointment booking with integrated payment processing.

## Overview

React Native (Expo) + Node.js application enabling users to view available appointment slots, book appointments, and process payments through Stripe's test environment.

## Tech Stack

**Frontend:** React Native, Expo, TypeScript, Expo Router, Axios  
**Backend:** Node.js, Express, Stripe API  
**Payment:** Stripe (Test Mode)

## Quick Start

### Prerequisites
- Node.js v16+
- Android Emulator or iOS Simulator
- Stripe account with test API keys

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

**Backend** - Create `backend/.env`:
```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

**Frontend** - Create `frontend/.env`:
```env
# Android Emulator
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:3000/api

# iOS Simulator  
# EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Stripe Publishable Key (for display only)
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

> **Get Stripe Keys:** Sign up at [stripe.com](https://stripe.com) → Developers → API Keys → Copy test keys

### Running the Application

**Start Backend:**
```bash
cd backend
npm start
# Server runs on http://localhost:3000
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
| POST | `/api/pay` | Process payment via Stripe |

## Testing

**Test Card:** `4242 4242 4242 4242`  
**Expiry:** Any future date (e.g., 12/34)  
**CVC:** Any 3 digits (e.g., 123)

## Project Structure

```
Beyond_BMI/
├── frontend/          # React Native app
│   ├── app/          # Screens (Expo Router)
│   │   ├── index.tsx      # Appointments list
│   │   ├── booking.tsx    # Booking form
│   │   └── payment.tsx    # Payment screen
│   └── services/     # API layer
└── backend/          # Express API
    ├── controllers/  # Request handlers
    ├── services/     # Business logic (Stripe integration)
    ├── routes/       # API routes
    └── config/       # Configuration
```

## Features

- ✅ View available appointment slots
- ✅ Book appointments with validation
- ✅ Process real Stripe test payments
- ✅ TypeScript type safety
- ✅ Environment-based configuration
- ✅ RESTful API design
- ✅ Expo Go compatible

## Troubleshooting

**Backend won't start:**
- Verify `STRIPE_SECRET_KEY` is set in `backend/.env`
- Check key starts with `sk_test_`

**Cannot connect to backend:**
- Verify backend is running: `curl http://localhost:3000/api/appointments`
- Check `EXPO_PUBLIC_API_BASE_URL` in `frontend/.env`
- Android Emulator must use `10.0.2.2` instead of `localhost`

**Payment fails:**
- Verify Stripe secret key is valid
- Use test card: `4242 4242 4242 4242`
- Check backend terminal for Stripe API errors

**App not updating:**
```bash
cd frontend
npm start -- --clear  # Clear Metro cache
```

## Environment Variables Summary

**Backend (`backend/.env`):**
- `STRIPE_SECRET_KEY` - Required for payment processing

**Frontend (`frontend/.env`):**
- `EXPO_PUBLIC_API_BASE_URL` - Backend API URL
- `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key (display only)

## License

Beyond BMI Technical Assessment
