# Personal Finance Dashboard

## Overview
The Personal Finance Dashboard is a web application designed to help users manage their finances. It allows users to track their income, expenses, set budget goals, and generate reports. It provides an intuitive interface for tracking financial transactions and visualizing financial data. The application is built with React and Material UI, and it uses Firebase for authentication.

## Features
- Dashboard overview of financial status
- Income and expense management
- Budget goal setting and tracking
- Financial reports and analytics
- User authentication (email/password and Google sign-in)

## Live Demo
You can view the live demo of the project [here](https://rishav-rajput-04.github.io/personal-finance-dashboard/).

## Technologies Used
- React.js
- Material-UI
- Firebase (Authentication)
- Chart.js
- React Router

## Setup Instructions
1. Clone the repository:
   ```
   git clone https://github.com/rishav-rajput-04/personal-finance-dashboard.git
   ```
2. Navigate to the project directory:
   ```
   cd personal-finance-dashboard
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```
5. **Important:** If you're running this project locally or deploying to a different platform, update the base paths in the following files:

   a. In `App.js`:
   Change `/personal-finance-dashboard/` to `/` in the Home route:
   ```jsx
   <Route path="/" element={<Home />} />
   ```

   b. In `Navbar.jsx`:
   Update the `to` prop in the Typography component:
   ```jsx
   <Typography
     variant="h6"
     component={Link}
     to="/"
     sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
   >
   ```

   These changes ensure that your application works correctly when accessed from the root URL of your deployment environment.

   **Note:** The `/personal-finance-dashboard/` path is typically used for GitHub Pages deployments where the project is not at the root of the domain. For local development or other deployment platforms, using the root path (`/`) is more common and allows for easier navigation.

6. Start the development server:
   ```
   npm start
   ```

## Authentication Notice
This project showcases a fully implemented Firebase authentication system, including email/password and Google sign-in methods. While the live demo's authentication is currently inactive for security reasons, the codebase demonstrates the complete implementation.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
