// components/Sidebar.js
import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Paper 
} from '@mui/material';

const Sidebar = () => {
  return (
    <Paper sx={{ 
      position: 'sticky',
      top: 80,
      p: 2,
      borderRadius: 2
    }}>
      <Typography variant="h6" gutterBottom>
        Trending Topics
      </Typography>
      <List dense>
        {['Technology', 'Programming', 'Web Development', 'React'].map((text) => (
          <ListItem button key={text}>
            <ListItemText 
              primary={text} 
              slotProps={{ primary: primaryTypographyProps,variant: 'body2' }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Sidebar;