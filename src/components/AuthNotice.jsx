import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const AuthNotice = () => {
  return (
    <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
      <AlertTitle>Authentication Notice</AlertTitle>
      This project showcases a fully implemented Firebase authentication system, 
      including email/password and Google sign-in methods. While the live demo's 
      authentication is currently inactive for security reasons, the codebase 
      demonstrates the complete implementation.
    </Alert>
  );
};

export default AuthNotice;