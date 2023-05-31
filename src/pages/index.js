import { NextSeo } from 'next-seo';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/create'); 
  };

  const siteTitle = "りーどみー";
  const siteDescription = "あなたのプロフィール帳シェアしませんか";

  return (
    <>
      <NextSeo
          title={siteTitle}
          description={siteDescription}
          openGraph={{
            title: siteTitle,
            description: siteDescription,
            images: [
              {
                url: 'https://readmeee.vercel.app/top_ogp.png',
                width: 800,
                height: 600,
                alt: 'Top OGP Image',
              },
            ],
          }}
        />
      <Box 
          sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" style={{ 
          width: '100%',
        }}>
          <img src="/logo.png" alt="Logo" style={{
            maxHeight: '100%',  
            maxWidth: '100%', 
            objectFit: 'contain'
          }}/>
        </Box>
        <Box>
          <Button 
            variant="contained"
            style={{ 
              backgroundColor: '#FF6699', 
              color: 'white', 
              position: 'static', 
              marginTop: '20px', 
              fontSize: '1.0em', 
              padding: '10px 10px', 
              fontWeight: 'bold',
            }}
            onClick={handleClick}
          >
            はじめる
          </Button>
        </Box>
        <Box 
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" style={{margin: '10px 0',textAlign: 'center', width: '100%' }}>
            あなただけのプロフィール帳
          </Typography>
        </Box>
        <Box 
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
          <Typography variant="h6" style={{textAlign: 'center', width: '100%' }}>
            Twitterでシェアしませんか
          </Typography>
        </Box>
        
        <img src="/template1.png" alt="Template1" style={{ 
          maxHeight: '60%',  
          maxWidth: '60%', 
          objectFit: 'contain' 
        }}/>
      </Box>
    </>
  );
}
