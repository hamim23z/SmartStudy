import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PricingPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: 'white',
        padding: 3,
        minHeight: '100vh',
        textAlign: "center"
      }}
    >
      <Typography variant="h4" gutterBottom>
        Pricing
      </Typography>
      <Typography variant="body1">
        Details about pricing coming soon...
      </Typography>
    </Box>
  );
};

export default PricingPage;