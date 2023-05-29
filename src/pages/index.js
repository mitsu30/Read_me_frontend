import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/create'); // Assuming your create page route is '/create'
  };

  return (
    <div style={{
      position: 'fixed',
      right: 0,
      bottom: 0,
      width: '100%',  // change from minWidth
      height: '100%', // change from minHeight
      zIndex: -100
    }}>
      <video autoPlay loop muted style={{
        position: 'fixed',
        right: '50%',
        bottom: '50%',
        width: '100%',  // change from minWidth
        height: '100%', // change from minHeight
        transform: 'translate(50%, 50%)',
        objectFit: 'cover'
      }}>
        <source src="/video/top.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Here is the rest of your content */}
      <div style={{
        position: 'relative',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh' 
      }}>
        {/* Rest of your content goes here */}
        <Button 
          variant="contained"
          style={{ backgroundColor: '#FF82B2', color: '#000000', position: 'absolute', bottom: '10%' }}
          onClick={handleClick}
        >
          はじめる
        </Button>
      </div>
    </div>
  );
}
