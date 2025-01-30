// components/Navbar.js
import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Avatar,
  styled 
} from '@mui/material';

const StyledTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: 700,
  letterSpacing: '-0.5px',
}));

const Navbar = () => {
  return (
    <AppBar position="fixed" elevation={1}>
      <Toolbar>
        <StyledTitle variant="h6">
          SocialApp
        </StyledTitle>
        <IconButton color="inherit">
          <Avatar sx={{ bgcolor: 'primary.main' }}>U</Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;