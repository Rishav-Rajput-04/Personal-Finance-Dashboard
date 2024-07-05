import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Drawer, List, ListItem, ListItemText, Box, ListItemButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <List>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/dashboard" onClick={handleDrawerToggle}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/income" onClick={handleDrawerToggle}>
          <ListItemText primary="Income" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/expenses" onClick={handleDrawerToggle}>
          <ListItemText primary="Expenses" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/budget-goals" onClick={handleDrawerToggle}>
          <ListItemText primary="Budget Goals" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/reports" onClick={handleDrawerToggle}>
          <ListItemText primary="Reports" />
        </ListItemButton>
      </ListItem>
      {currentUser ? (
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      ) : (
        <>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/login" onClick={handleDrawerToggle}>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/signup" onClick={handleDrawerToggle}>
              <ListItemText primary="Signup" />
            </ListItemButton>
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { sm: 'none' } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component={Link}
              to="/personal-finance-dashboard/"
              sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
            >
              Personal Finance Dashboard
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
              <Button color="inherit" component={Link} to="/income">Income</Button>
              <Button color="inherit" component={Link} to="/expenses">Expenses</Button>
              <Button color="inherit" component={Link} to="/budget-goals">Budget Goals</Button>
              <Button color="inherit" component={Link} to="/reports">Reports</Button>
              {currentUser ? (
                <Button color="inherit" onClick={logout}>Logout</Button>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">Login</Button>
                  <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
