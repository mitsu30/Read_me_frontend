import { useState } from 'react';
import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { styled } from '@mui/system';
import LoginModal from '../../components/LoginModal';

const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: '2em', 
  textAlign: 'center', 
}));

export default function ResultPage({ imageText }) {
  const router = useRouter();
  const { id, shared } = router.query; 
  const shareUrl = `https://readmeee.vercel.app/result/${id}?shared=true`;
  const siteTitle = "りーどみー";
  const siteDescription = "あなたのプロフィール帳シェアしませんか";
  const templateStyle = { maxHeight: '60%',  maxWidth: '60%', objectFit: 'contain' };

  useEffect(() => {
    if (shared === 'true') {
      router.push('/');
    }
  }, [shared, router]);

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleOpen = () => {
    setTimeout(() => {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('わたしのプロフィール！みんなよろしく♪ #りーどみー #RUNTEQ #大人のプロフィール帳')}`, '_blank');
    }, 700); 
  };

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  const handleLoginClick = () => {
    handleLoginModalOpen();
  };

  return (
    <>
      <NextSeo
        twitter={{
          cardType: "summary_large_image",
          handle: "@readmee_profile", 
          site: "@readmee_profile"
        }}
        title={siteTitle}
        description={siteDescription}
        openGraph={{
          url: shareUrl,
          title: siteTitle,
          description: siteDescription,
          images: [
            {
              url: imageText.image_url, 
              width: 800,
              height: 600,
              alt: 'Result Image',
            }
          ],
          site_name: 'りーどみー',
        }}
        />
      
      {shared !== 'true' && (
      <>
      <Container
        sx={{
          my: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Typography component="h1" variant="h5" align="center">
          できあがり！
        </Typography>
        <Box 
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" style={{margin: '10px 0',textAlign: 'center', width: '100%' }}>
            長押しまたは右クリックで画像を保存できます！
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
            下のボタンからシェアできます！
          </Typography>
        </Box>

        <Box component="form" noValidate sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={imageText.image_url} alt="Generated Image" style={{ width: '80%', height: 'auto' }}/>
        </Box>
        <Button 
          variant="contained" 
          style={{ 
            backgroundColor: '#00acee',
            color: 'white', 
            position: 'static', 
            marginTop: '20px', 
            fontSize: '1.0em', 
            padding: '8px 8px', 
            fontWeight: 'bold',
          }}
          onClick={handleOpen}
        >
            Twitterでシェア
        </Button>
        <Button 
          variant="contained"
          sx={{ 
            backgroundColor: '#FF6699',
            '&:hover': {
              backgroundColor: '#E60073',
            },
            color: '#white',
            fontWeight: 'bold',
            position: 'static', 
            marginTop: '20px', 
            fontSize: '1.0em', 
            padding: '8px 8px', 
            fontWeight: 'bold',
          }}
          onClick={handleLoginClick}
        >
          ログイン
        </Button>
        <Typography component="h1" variant="h5" align="center">
          ログインするともっとかわいいプロフィール帳がつくれるよ♪
        </Typography>
        <img src="/templates/basic.png" alt="basic" style={templateStyle}/>
      </Container>
      <LoginModal open={isLoginModalOpen} onClose={handleLoginModalClose} />
      </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { id, shared } = context.query;
  const userAgent = context.req.headers['user-agent'];

  if (shared === 'true' && !userAgent.includes('Twitterbot')) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }


  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/image_texts/${id}`);
  const imageText = await response.json();

  return {
    props: {
      imageText,
    },
  }
}
