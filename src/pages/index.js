import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/create'); // Assuming your create page route is '/create'
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',

    }}>
      <Box display="flex" alignItems="center" justifyContent="center" style={{ 
        width: '100%',
      }}>
        <img src="/logo.png" alt="Logo" style={{
          maxHeight: '70%',  
          maxWidth: '70%', 
          objectFit: 'contain'
        }}/>
      </Box>
      <Button 
        variant="contained"
        style={{ 
          backgroundColor: '#FF82B2', 
          color: '#000000', 
          position: 'static', 
          marginTop: '20px', // Creates space between video and button
          fontSize: '1.0em', // Adjust font size as needed
          padding: '10px 10px', // Adjust padding as needed
        }}
        onClick={handleClick}
      >
        はじめる
      </Button>
      <Box width="50%" display="flex" justifyContent="center">
        <Typography variant="h6" style={{ margin: '10px 0', textAlign: 'center' }}>
          あなただけのプロフィール帳をTwitterでシェアしませんか？
        </Typography>
      </Box>
      <img src="/template1.png" alt="Template1" style={{ 
        maxHeight: '40%',  
        maxWidth: '40%', 
        objectFit: 'contain' 
      }}/>
    </div>
  );
}
