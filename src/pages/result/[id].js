import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

export default function ResultPage({ imageText }) {
  const router = useRouter();
  const { id, shared } = router.query; 
  const shareUrl = `https://read-me-frontend-git-09twitter-mitsu30.vercel.app/result/${id}?shared=true`;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    window.open(`https://twitter.com/share?url=${encodeURIComponent(shareUrl)}&text=Check out this cool image I created!`, '_blank');
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <NextSeo
        twitter={{
          cardType: "summary_large_image"
        }}
        title={'りーどみー'}
        description={'大人のプロフィール帳'}
        openGraph={{
          url: shareUrl,
          title: 'site title',
          description: 'site description',
          images: [
            {
              url: imageText.image_url, 
              width: 800,
              height: 600,
              alt: 'Result Image',
            }
          ],
          site_name: 'site name',
        }}
      />
      
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <Typography component="h1" variant="h3" align="center">
          完成！
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={imageText.image_url} alt="Generated Image" style={{ width: '50%', height: 'auto' }}/>
        </Box>

        {shared !== 'true' && (
          <>
            <Button 
              variant="contained" 
              onClick={handleOpen}
              sx={{ marginY: 2 }}>
                Twitterでシェア！
            </Button>

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
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  りーどみー(ベータ版)を使っていただきありがとうございました！
                </Typography>
                <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
                  アンケートにご協力いただけると幸いです！
                </Typography>
                <Link href="https://your-google-form-url" target="_blank" rel="noopener noreferrer" underline="none" sx={{ mt: 2 }}>
                  Googleフォームへ
                </Link>
              </Box>
            </Modal>
          </>
        )}
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(context.query)
  // Send a GET request to your API to get the data by id
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/image_texts/${id}`);
  console.log(response)
  const imageText = await response.json();

  return {
    props: {
      imageText,
    },
  }
}
