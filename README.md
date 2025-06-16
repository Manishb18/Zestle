# Zestle Monorepo

A full-stack application with a React Native mobile frontend and a Node.js/Express backend, managed in a monorepo structure.

---

## Features
- **Mobile App**: Built with React Native, Redux, and navigation.
- **Backend API**: RESTful API using Express, MongoDB, JWT authentication, and file uploads.
- **Modular Structure**: Clean separation between frontend and backend codebases.

---

## Tech Stack
- **Frontend**: React Native, Redux Toolkit, React Navigation, NativeWind (Tailwind CSS for RN), TypeScript
- **Backend**: Node.js, Express, TypeScript, MongoDB (via Mongoose), JWT, Multer

---

## Monorepo Structure
```
.
├── backend/   # Node.js/Express API
└── frontend/  # React Native mobile app
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance (local or cloud)
- Android Studio/Xcode for mobile development

---

### Backend Setup
1. `cd backend`
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```
4. Run in development mode:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Build and start production server:
   ```bash
   npm run build && npm start
   # or
   yarn build && yarn start
   ```

---

### Frontend Setup
1. `cd frontend`
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start Metro bundler:
   ```bash
   npm start
   # or
   yarn start
   ```
4. In a new terminal, run the app:
   - **Android:**
     ```bash
     npm run android
     # or
     yarn android
     ```
   - **iOS:**
     ```bash
     npm run ios
     # or
     yarn ios
     ```

---

## Scripts

### Backend
- `npm run dev` — Start backend in development mode (with hot reload)
- `npm run build` — Compile TypeScript
- `npm start` — Start backend from compiled code

### Frontend
- `npm start` — Start Metro bundler
- `npm run android` — Run app on Android emulator/device
- `npm run ios` — Run app on iOS simulator/device
- `npm run lint` — Lint code
- `npm run test` — Run tests

---

## Folder Structure
```
backend/
  src/
    controllers/
    middlewares/
    models/
    routes/
    uploads/
    server.ts
frontend/
  src/
    components/
    navigation/
    redux/
    screens/
    utils/
    App.tsx
```

---

## Environment Variables
- **Backend:** `.env` file in `backend/` (see above)
- **Frontend:** Add any required environment variables as needed (e.g., for API URLs, Firebase, etc.)

---

## Troubleshooting
- For React Native issues, see the [official troubleshooting guide](https://reactnative.dev/docs/troubleshooting).
- Ensure MongoDB is running and accessible for the backend.
- For emulator/simulator setup, refer to [React Native Environment Setup](https://reactnative.dev/docs/environment-setup).

---

## License

This project is licensed under the ISC License. See individual package.json files for details. 