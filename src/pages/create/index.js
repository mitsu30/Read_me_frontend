import { useState } from "react";
import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { styled } from '@mui/system';
import { useEffect } from 'react';


const MAX_LINE_LENGTH_OF_ANSWER1 = 13;
const MAX_LINE_LENGTH_OF_ANSWER2 = 13;
const MAX_LINE_LENGTH_OF_ANSWER3 = 26;
const MAX_LINE_COUNT = 3;

const defaultTheme = createTheme();
const theme = createTheme({
  typography: {
    fontFamily: 'Yomogi, sans-serif',
  }
})

const Loading = styled('div')({
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 9999,
  color: '#000',
  fontSize: '2em',
  animation: 'blinkingText 1.2s infinite',
  '@keyframes blinkingText': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
});

export default function App () {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [imageUrl, setImageUrl] = useState("/template1.png");

  const [answer1Error, setAnswer1Error] = useState("");
  const [answer2Error, setAnswer2Error] = useState("");
  const [answer3Error, setAnswer3Error] = useState("");

  const [ogImageUrl, setOgImageUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Dummy request to wake up the server as soon as possible
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wakeup`)
    .then(data => {
      console.log("Server wakeup response: ", data);
    })
  }, []);

  const handlePreview = async (e) => {
    e.preventDefault();

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/image_texts/preview`, { image_text: { answer1, answer2, answer3 } });
    setImageUrl(response.data.url);
    } catch (error) {
    console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/image_texts`, { image_text: { answer1, answer2, answer3 } });
      
      // If status is not 200, throw an error
      if (response.status !== 200) {
        throw new Error('Request failed with status: ' + response.status);
      }
  
      // Create a promise to wait for the image to load
      const img = new Image();
  
      img.onload = () => {
        // Set image URL and OG image URL state
        setImageUrl(response.data.url);
        setOgImageUrl(response.data.ogImageUrl);
  
        // Push new path to router
        setIsNavigating(true);
        router.push({
          pathname: '/result/[id]', // Adjust to be dynamic route
          query: { id: response.data.id }, // Use unique id from the response
        });
  
        // Set loading state to false
        setIsLoading(false);
      };
  
      img.onerror = () => {
        throw new Error('Image load failed');
      };
  
      img.src = response.data.url;
  
    } catch (error) {
      console.error(error);
      setIsLoading(false); // In case of an error, also set loading state to false
    }
  };

  return (
    <>
      {(!isLoading && !isNavigating) &&
      <Grid container component="main" sx={{ height: '100vh' }} justifyContent="center">
        <Grid item xs={12} md={6} component={Paper} elevation={6} square  style={{ backgroundColor: 'transparent' }}>
          <Box
            sx={{
              my: 3,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
              <Typography component="h1" variant="h5">
                入力してね♪
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  color="secondary"
                  margin="normal"
                  fullWidth
                  id="answer1"
                  label="ニックネームは？"
                  name="answer1"
                  autoFocus
                  value={answer1}
                  error={answer1Error !== ''}
                  helperText={answer1Error}
                  onChange={(e) => {
                    if (e.target.value.length > MAX_LINE_LENGTH_OF_ANSWER1) {
                      setAnswer1Error('13文字以内で入力してください。');
                    } else {
                      setAnswer1Error('');
                      setAnswer1(e.target.value);
                    }
                  }}
                />
                <TextField
                  color="secondary"
                  margin="normal"
                  fullWidth
                  name="answer2"
                  label="しゅみは？"
                  id="answer2"
                  value={answer2}
                  error={answer2Error !== ''}
                  helperText={answer2Error}
                  onChange={(e) => {
                    if (e.target.value.length > MAX_LINE_LENGTH_OF_ANSWER2) {
                      setAnswer2Error('13文字以内で入力してください。');
                    } else {
                      setAnswer2Error('');
                      setAnswer2(e.target.value);
                    }
                  }}
                />
                <TextField
                  color="secondary"
                  margin="normal"
                  fullWidth
                  name="answer3"
                  label="みんなにひと言！"
                  id="answer3"
                  value={answer3}
                  multiline
                  rows={MAX_LINE_COUNT}
                  error={answer3Error !== ''}
                  helperText={answer3Error}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n');
                    if (lines.length > MAX_LINE_COUNT || lines.some(line => line.length > MAX_LINE_LENGTH_OF_ANSWER3)) {
                      setAnswer3Error('1行は26文字以内、改行は2回までとしてください。');
                    } else {
                      setAnswer3Error('');
                      setAnswer3(e.target.value);
                    }
                  }}
                />
                <Container
                  maxWidth="sm"
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // 変更
                  }}
                >
                  <Button 
                    type="submit"
                    variant="contained"
                    sx={{ 
                      mt: 3, 
                      mb: 2, 
                      width: '40%', // 変更
                      backgroundColor: '#FF6699',
                      color: '#white',
                      fontWeight: 'bold'  
                    }}
                    onClick={handlePreview} // 追加
                  >
                    プレビュー
                  </Button>
                  <Button 
                    type="submit"
                    variant="contained"
                    sx={{ 
                      mt: 3, 
                      mb: 2, 
                      width: '40%', // 変更
                      backgroundColor: '#FF6699',
                      color: '#white',
                      fontWeight: 'bold'  
                    }}
                    onClick={handleSubmit} // 変更
                  >
                    つくる!
                  </Button>
                </Container>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}  md={6} component={Paper} elevation={6} square  style={{ backgroundColor: 'transparent' }}>
            <Box
              sx={{
                my: 3,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                デザインはこれ！
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                {
                  imageUrl.startsWith('data:image/jpeg;base64,') ?
                  <img src={imageUrl} alt="Generated" style={{width: '100%', height: '100%', objectFit: 'relative'}} />
                :
                  <img src={imageUrl} alt="Template" style={{width: '100%', height: '100%', objectFit: 'relative'}} />
                }
              </Box>
            </Box>
          </Grid>
      </Grid>
    }
    {isLoading && 
      <Box 
          sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
        <Loading>まってね</Loading>
      </Box> 
    } 
    {isNavigating && 
      <Box 
          sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
        <Loading>もうちょっと</Loading>
      </Box> 
    } 
    </>
  );
};
