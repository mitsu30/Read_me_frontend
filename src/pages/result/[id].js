import { useState } from 'react';
import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { styled } from '@mui/system';

const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: '2em', 
  textAlign: 'center', 
}));


export default function ResultPage({ imageText }) {
  const router = useRouter();
  const { id, shared } = router.query; 
  const shareUrl = `https://read-me-frontend-git-14mvp3-mitsu30.vercel.app/result/${id}?shared=true`;
  const siteTitle = "りーどみー";
  const siteDescription = "あなたのプロフィール帳シェアしませんか";

  useEffect(() => {
    if (shared === 'true') {
      router.push('/');
    }
  }, [shared, router]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    window.open(`https://twitter.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('わたしのプロフィール！みんなよろしく♪ #りーどみー #RUNTEQ #大人のプロフィール帳')}`, '_blank');
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // 内容を中央に持っていきます
                alignItems: 'center', // 内容を中央に持っていきます
                height: '100vh', // 画面全体の高さを使用します
                width: '80%',
                padding: 2,
              }}
                >
              <Typography id="modal-modal-title" variant="h5" component="h2">
                りーどみー(ベータ版)をご利用いただきありがとうございました！
              </Typography>
              <StyledLink
                href="https://forms.gle/UoeMHNFurtZiUAhs5"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{ mt: 2 }}
              >
                アンケート
              </StyledLink>
              <Typography id="modal-modal-description" variant="h5" sx={{ mt: 2 }}>
                アンケートにご協力いただけると幸いです！
              </Typography>
            </Box>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ width: 400, padding: 2, bgcolor: 'background.paper' }}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  りーどみー(ベータ版)をご利用いただきありがとうございました！
                </Typography>
                <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
                  アンケートにご協力いただけると幸いです！
                </Typography>
                <StyledLink
                href="https://forms.gle/UoeMHNFurtZiUAhs5"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{ mt: 2 }}
              >
                   アンケート
              </StyledLink>
              </Box>
            </Modal>
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


  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/image_texts/${id}`);
  const imageText = await response.json();

  return {
    props: {
      imageText,
    },
  }
}
