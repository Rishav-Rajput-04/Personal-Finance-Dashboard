import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ p: 2, mt: 2 , textAlign: 'center', backgroundColor: '#f1f1f1' }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Personal Finance Dashboard
      </Typography>
    </Box>
  );
};

export default Footer;