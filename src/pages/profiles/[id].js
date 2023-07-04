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
  
  const shareUrl = `https://read-me-frontend-git-20redeploy-mitsu30.vercel.app/profiles/${id}?shared=true`;
  const siteTitle = "りーどみー";
  const siteDescription = "あなたのプロフィール帳シェアしませんか";

  const alternativeImageUrl = "https://readmeee.vercel.app/top_ogp.png"; 

  let imageUrl;
  if (profileImage.privacy === 'closed' || profileImage.privacy === 'membered_communities_only') {
    imageUrl = alternativeImageUrl;
  } else {
    imageUrl = profileImage.image_url;
  }

  useEffect(() => {
    if (shared === 'true') {
      router.push('/');
    }
  }, [shared, router]);


  const handleOpen = () => {
    let tweetText;
    switch(profileImage.template_id) {
      case 1:
        tweetText = 'みんなよろしく♪ #りーどみー #RUNTEQ #大人のプロフィール帳';
        break;
      case 2:
        tweetText = 'わたしのプロフィール帳みんなみてね♪ #りーどみー #RUNTEQ #大人のプロフィール帳';
        break;
      case 3:
        tweetText = 'ひよっこエンジニアなかま募集中♪ #駆け出しエンジニアと繋がりたい #りーどみー #RUNTEQ';
        break;
      default:
        tweetText = 'わたしのプロフィール！みんなよろしく♪ #りーどみー #RUNTEQ #大人のプロフィール帳';
        break;
    }
    setTimeout(() => {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(tweetText)}`, '_blank');
      setOpen(true);
    }, 700); 
  };

  const handleMypage = () => {
    router.push('/mypage'); 
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
              url: imageUrl,
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
        <Button 
          type="submit"
          variant="contained"
          sx={{ 
            mt: 3, 
            mb: 2, 
            position: 'static', 
            marginTop: '20px', 
            fontSize: '1.0em',
            padding: '8px 8px', 
            backgroundColor: '#FF6699',
            '&:hover': {
              backgroundColor: '#E60073',
            },
            color: '#white',
            fontWeight: 'bold'  
          }}
          onClick={handleMypage}
        >
          マイページへ
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

  let res;
  if (cookies.token) {
  // ログインユーザー
  const config = {
  headers: { authorization: `Bearer ${cookies.token}` },
  };

  res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/base/${id}`, config);
} else {
  // Twitterロボ
  res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/twitter_share/${id}`);
}

  const profileImage = await res.data;
  // console.log(res.data);
  // console.log(res.data.image_url);
  // console.log(profileImage.image_url);

  return {
    props: {
      profileImage,
    },
  }
}


