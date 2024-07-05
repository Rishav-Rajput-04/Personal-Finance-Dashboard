import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, Box, Alert } from "@mui/material";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import AuthNotice from "./AuthNotice";

const Signup = () => {
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails({ ...signupDetails, [name]: value });
  };

  const handleSignup = async () => {
    setError("");
    if (signupDetails.password !== signupDetails.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(
        auth,
        signupDetails.email,
        signupDetails.password
      );
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      <Container maxWidth="sm">
      <AuthNotice />
        <Paper
          elevation={6}
          sx={{ p: 4, width: "100%", maxWidth: 400, margin: "auto" }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Sign Up
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            label="Email"
            name="email"
            value={signupDetails.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={signupDetails.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={signupDetails.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignup}
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            onClick={handleGoogleSignup}
            fullWidth
            sx={{
              mt: 1,
              backgroundColor: "#DB4437",
              "&:hover": {
                backgroundColor: "#C33D2E",
              },
            }}
          >
            Sign Up with Google
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
