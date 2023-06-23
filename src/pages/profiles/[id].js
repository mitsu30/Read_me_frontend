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
import nookies from "nookies";
import axios from "axios";

const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: '2em', 
  textAlign: 'center', 
}));

export default function ResultPage({ profileImage }) {
  const router = useRouter();
  const { id, shared } = router.query; 
  const shareUrl = `https://readmeee.vercel.app/profiles/${id}?shared=true`;
  const siteTitle = "りーどみー";
  const siteDescription = "あなたのプロフィール帳シェアしませんか";

  useEffect(() => {
    if (shared === 'true') {
      router.push('/');
    }
  }, [shared, router]);


  const handleOpen = () => {
    setTimeout(() => {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('わたしのプロフィール！みんなよろしく♪ #りーどみー #RUNTEQ #大人のプロフィール帳')}`, '_blank');
      setOpen(true);
    }, 700); 
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
              url: profileImage.image_url, 
              width: 800,
              height: 600,
              alt: 'Result Image',
            }
          ],
          site_name: 'りーどみー',
        }}
        />
      
      {shared !== 'true' && (
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
          <img src={profileImage.image_url} alt="Generated Image" style={{ width: '80%', height: 'auto' }}/>
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
      </Container>
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

  const cookies = nookies.get(context);
  const config = {
  headers: { authorization: `Bearer ${cookies.token}` },
  };

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/${id}`, config);
  const profileImage = await res.data;
  // console.log(res.data);


  return {
    props: {
      profileImage,
    },
  }
}


