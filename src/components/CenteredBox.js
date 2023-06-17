import Box from '@mui/material/Box';

export default function CenteredBox({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
}
