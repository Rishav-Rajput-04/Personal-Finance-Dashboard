import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        textAlign: 'center',
        padding: '24px 16px',
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
        }}
      >
        Welcome to Your Financial Tracker
      </Typography>
      <Typography
        variant="h6"
        paragraph
        sx={{
          fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
        }}
      >
        Manage your income, expenses, and budget goals efficiently.
      </Typography>
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: 2,
        }}
      >
        <Button
          component={Link}
          to="/dashboard"
          variant="contained"
          color="primary"
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Go to Dashboard
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          color="primary"
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/signup"
          variant="outlined"
          color="secondary"
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
