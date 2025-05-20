# 📋 Client Management App

![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.0-orange?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-blueviolet?logo=tailwind-css)
![Render](https://img.shields.io/badge/Deployed_on-Render-46d3ff?logo=render)

A modern client management application built with React, Vite, and Tailwind CSS, deployed on Render.

The Site (https://client-management-app-frontend.onrender.com/)

![App Screenshot](/screenshot.png)

## ✨ Features

- **Client CRUD Operations**:

  - Add new clients with detailed information
  - View all clients in a responsive table
  - Edit existing client records
  - Delete clients when needed

- **Advanced Search**:

  - Real-time filtering by client name
  - Clean UI with search icon

- **Measurement Tracking**:

  - Specialized fields for clothing measurements
  - Support for Amharic characters

- **Responsive Design**:
  - Works on mobile, tablet, and desktop
  - Beautiful gradient backgrounds

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/siramo1/client-management-app.git
   ```

2. Navigate to project directory:

   ```bash
   cd client-management-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create `.env` file:

   ```env
   VITE_API_URL=http://localhost:3000 # or your production API URL
   ```

5. Run development server:
   ```bash
   npm run dev
   ```

## 🛠 Project Structure

```
client-management-app/
├── src/
│   ├── pages/          # Main page components
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
├── public/             # Static assets
├── .env.example        # Environment variables template
├── vite.config.js      # Vite configuration
└── package.json        # Project dependencies
```

## 🌐 Deployment

The application is configured for easy deployment on [Render](https://render.com):

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Add environment variables:
   - `VITE_API_URL`: Your backend API URL
4. Deploy!

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## 🧪 Testing

Run the test suite with:

```bash
npm test
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

Project Link : [https://github.com/siramo1/client-management-app](https://github.com/siramo1/client-management-app)
