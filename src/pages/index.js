import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const siteTitle = "りーどみー";
const siteDescription = "あなたのプロフィール帳シェアしませんか";

export default function HomePage() {
  const router = useRouter();
  const siteTitle = "りーどみー";
  const siteDescription = "あなたのプロフィール帳シェアしませんか";

  const handleClick = () => {
    router.push('/create'); 
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
            maxHeight: '80%',  
            maxWidth: '80%', 
            objectFit: 'contain'
          }}/>
        </Box>
        <Box>
          <Button 
            variant="contained"
            sx={{ 
              mt: 2, 
              mb: 2, 
              width: '100%', 
              backgroundColor: '#FF6699',
              '&:hover': {
                backgroundColor: '#E60073',
              },
              color: '#white',
              fontWeight: 'bold',
              fontSize: '1.2em',
              padding: '15px 30px' 
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
