import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CenteredBox from '../components/CenteredBox';
import LoginModal from '../components/LoginModal';
import { useAuthContext } from '../context/AuthContext';

const siteTitle = "りーどみー";
const siteDescription = "あなたのプロフィール帳シェアしませんか";
const logoStyle = { maxHeight: '80%', maxWidth: '80%', objectFit: 'contain' };
const templateStyle = { maxHeight: '60%',  maxWidth: '60%', objectFit: 'contain' };

export default function HomePage() {
  const router = useRouter();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { AuthContext } = useAuthContext(); 
  const { currentUser } = AuthContext;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wakeup`)
    .then(data => {
      console.log("Server wakeup response: ", data);
    })
  }, []);

  const handleClick = () => {
    router.push('/create'); 
  };

  const handleMakingClick = () => {
    router.push('/profiles'); 
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
      <CenteredBox>
        <Box display="flex" alignItems="center" justifyContent="center" style={{ width: '100%' }}>
          <img src="/logo.png" alt="Logo" style={logoStyle}/>
          </Box>
          {!currentUser && (
            <Box
                display="flex"
                justifyContent="space-between"
                gap={2}  // Optional: for space between buttons
              >
                <Button 
                  variant="contained"
                  sx={{ 
                    mt: 2, 
                    mb: 2, 
                    flex: 1, // Added this line
                    backgroundColor: '#FF6699',
                    '&:hover': {
                      backgroundColor: '#E60073',
                    },
                    color: '#white',
                    fontWeight: 'bold',
                    fontSize: '1.2em',
                    padding: '15px 30px' 
                  }}
                  onClick={handleLoginClick}
                >
                  ログイン
                </Button>
                <Button 
                  variant="contained"
                  sx={{ 
                    mt: 2, 
                    mb: 2, 
                    flex: 1, // Added this line
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
                  おためし
                </Button>
              </Box>
            )}
            {currentUser && (<Button 
            variant="contained"
            sx={{ 
              mt: 2, 
              mb: 2, 
              flex: 1, 
              backgroundColor: '#FF6699',
              '&:hover': {
                backgroundColor: '#E60073',
              },
              color: '#white',
              fontWeight: 'bold',
              fontSize: '1.2em',
              padding: '15px 30px' 
            }}
            onClick={handleMakingClick}
          >
            はじめる
          </Button>)}
        <CenteredBox>
          <Typography variant="h6" style={{margin: '10px 0',textAlign: 'center', width: '100%' }}>
            あなただけのプロフィール帳
          </Typography>
        </CenteredBox>
        <CenteredBox>
          <Typography variant="h6" style={{textAlign: 'center', width: '100%' }}>
            Twitterでシェアしませんか
          </Typography>
        </CenteredBox>
        {!currentUser && (
        <img src="/template1.png" alt="Template1" style={templateStyle}/>
        )}
        {currentUser && (
        <img src="/templates/basic.png" alt="basic" style={templateStyle}/>
        )}
        <LoginModal open={isLoginModalOpen} onClose={handleLoginModalClose} />
      </CenteredBox>
    </>
  );
}
