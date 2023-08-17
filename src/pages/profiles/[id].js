import { useState, useEffect } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CenteredBox from '../../components/CenteredBox';
import DialogActions from '@mui/material/DialogActions';

const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: '2em', 
  textAlign: 'center', 
}));

export default function ResultPage({ profileImage }) {
  const router = useRouter();
  const { id, shared } = router.query; 
  const [modalOpen, setModalOpen] = useState(false);
  
  const shareUrl = `https://readmeprofile.com/profiles/${id}?shared=true`;
  const siteTitle = "りーどみー";
  const siteDescription = "あなたのプロフィール帳シェアしませんか";

  const alternativeImageUrl = "https://readmeprofile.com/top_ogp.png"; 

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
    setModalOpen(true); 
  };

  const handleClose = () => {
    setModalOpen(false); 
  };

  const handleShare = () => {
    let tweetText;
    switch(profileImage.template_id) {
      case 1:
        tweetText = 'みんなよろしく♪ #りーどみー #大人のプロフィール帳';
        break;
      case 2:
        tweetText = 'わたしのプロフィール帳みんなみてね♪ #りーどみー #大人のプロフィール帳';
        break;
      case 3:
        tweetText = 'ひよっこエンジニアなかま募集中♪ #駆け出しエンジニアと繋がりたい #りーどみー #RUNTEQ';
        break;
      case 4:
        tweetText = '4周年おめでとう!! #RUNTEQ #りーどみー';
        break;
      default:
        tweetText = 'わたしのプロフィール！みんなよろしく♪ #りーどみー #大人のプロフィール帳';
        break;
    }
    setTimeout(() => {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(tweetText)}`, '_blank');
      setModalOpen(false); ;
    }, 700); 
  };

  const handleMypage = () => {
    router.push('/mypage'); 
  };

  const handleProfile = () => {
    router.push(`/mypage/${id}`); 
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
            \uD835\uDD4F(Twitter)でシェア
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
        <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>\uD835\uDD4F(Twitter)でシェア</DialogTitle>
        <DialogContent>
          <Typography>
            このまま\uD835\uDD4F(Twitter)ボタンをおすと、作成したプロフィール帳がツイートにセットされるよ！
            <Box component="form" noValidate sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src='/sample1.png' alt="Generated Image" style={{ width: '80%', height: 'auto' }}/>
            </Box>
            マイページのプロフィール帳の詳細ページで公開範囲を<strong>「自分のみ」か「コミュニティのなかま」に設定してから</strong>、\uD835\uDD4F(Twitter)シェアボタンを押すとツイートに以下の画像が設定されるよ。最初に\uD835\uDD4F(Twitter)シェアボタンを押した時の設定がツイートに反映されちゃうので注意してね！
            <Box component="form" noValidate sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src='/sample2.png' alt="Generated Image" style={{ width: '80%', height: 'auto' }}/>
            </Box>
          </Typography>
          <CenteredBox>
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
          onClick={handleShare}
        >
            \uD835\uDD4F(Twitter)でシェア
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
          onClick={handleProfile}
        >
          プロフィール帳詳細ページ
        </Button>
        </CenteredBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            とじる
          </Button>
        </DialogActions>
      </Dialog>
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


