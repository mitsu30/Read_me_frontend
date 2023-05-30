import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

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
      height: 'calc(100% - 64px)', // Adjust this based on your AppBar height
    }}>
      <div style={{
        width: '100%',  // Set the container to occupy the full width
        height: 'calc(100% - 64px)',  // Set a fixed height minus the AppBar height
        overflow: 'hidden'  // This will ensure the video is cut off and doesn't overflow the container
      }}>
        <video autoPlay loop muted style={{
          width: '100%',  
          height: '100%', 
          objectFit: 'cover'
        }}>
          <source src="/video/top.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <Button 
        variant="contained"
        style={{ 
          backgroundColor: '#FF82B2', 
          color: '#000000', 
          position: 'static', 
          marginTop: '20px', // Creates space between video and button
          fontSize: '1.5em', // Adjust font size as needed
          padding: '50px 80px', // Adjust padding as needed
        }}
        onClick={handleClick}
      >
        はじめる
      </Button>
    </div>
  );
}
