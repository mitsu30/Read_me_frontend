import * as React from 'react';
import { useState } from "react";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { styled } from '@mui/system';
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'


const MAX_LINE_LENGTH_OF_ANSWER1 = 13;
const MAX_LINE_LENGTH_OF_ANSWER2 = 13;
const MAX_LINE_LENGTH_OF_ANSWER3 = 26;
const MAX_LINE_COUNT = 3;


const Loading = styled('div')({
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 9999,
  color: '#FF773E',
  fontSize: '1.5em',
  fontWeight: 'bold',
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

  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const router = useRouter();

  useEffect(() => {
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
      
      if (response.status !== 200) {
        throw new Error('Request failed with status: ' + response.status);
      }
  
      const img = new Image();
  
      img.onload = () => {
        setImageUrl(response.data.url);
        setIsNavigating(true);
        router.push({
          pathname: '/result/[id]', 
          query: { id: response.data.id }, 
        });
  
        setIsLoading(false);
      };
  
      img.onerror = () => {
        throw new Error('Image load failed');
      };
  
      img.src = response.data.url;
  
    } catch (error) {
      console.error(error);
      setIsLoading(false); 
    }
  };

  return (
    <>
      {(!isLoading && !isNavigating) &&
        <Grid container component="main" sx={{ height: '100vh' }} justifyContent="center">
          <Grid item xs={12} md={6} component={Paper} elevation={6} square  style={{ backgroundColor: 'transparent' }}>
            <Box
              sx={{
                my: 2,
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
                  label="みんなにひとこと！"
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
                    justifyContent: 'space-between', 
                  }}
                >
                  <Button 
                    type="submit"
                    variant="contained"
                    sx={{ 
                      mt: 3, 
                      mb: 2, 
                      width: '40%', 
                      backgroundColor: '#FF6699',
                      '&:hover': {
                        backgroundColor: '#E60073',
                      },
                      color: '#white',
                      fontWeight: 'bold'  
                    }}
                    onClick={handlePreview} 
                  >
                    プレビュー
                  </Button>
                  <Button 
                    type="submit"
                    variant="contained"
                    sx={{ 
                      mt: 3, 
                      mb: 2, 
                      width: '40%', 
                      backgroundColor: '#FF6699',
                      '&:hover': {
                        backgroundColor: '#E60073',
                      },
                      color: '#white',
                      fontWeight: 'bold'  
                    }}
                    onClick={handleSubmit} 
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
                my: 2,
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
                  <img src={imageUrl} alt="Generated" style={{width: '100%', height: '100%', objectFit: 'relative'}}></img>
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
        <Loading>まっててね</Loading>
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
