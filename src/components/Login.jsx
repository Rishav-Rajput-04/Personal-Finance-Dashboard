import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, Box, Alert } from "@mui/material";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import AuthNotice from "./AuthNotice";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(
        auth,
        loginDetails.email,
        loginDetails.password
      );
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
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
            Login
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            label="Email"
            name="email"
            value={loginDetails.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={loginDetails.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={handleGoogleLogin}
            fullWidth
            sx={{
              mt: 1,
              backgroundColor: "#DB4437",
              "&:hover": {
                backgroundColor: "#C33D2E",
              },
            }}
          >
            Login with Google
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;