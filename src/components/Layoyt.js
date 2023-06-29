import React from 'react';
import { Box } from '@mui/system';

const Layout = ({ children }) => {
  return (
    <Box 
      sx={{ 
        mt: 8.8, 
        ml: { 
          xs: 0, // xs breakpoint is 0px or larger
          sm: 7  // sm breakpoint is 600px or larger
        }  
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
