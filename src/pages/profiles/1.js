import * as React from 'react';
import { useState } from "react";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from "axios";
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import { Loading } from '../../components/Loading';
import nookies from "nookies";


const MAX_LINE_LENGTH_OF_ANSWER1 = 13;
const MAX_LINE_LENGTH_OF_ANSWER2 = 13;
const MAX_LINE_LENGTH_OF_ANSWER3 = 26;
const MAX_LINE_COUNT = 3;


export default function App () {
  const [body1, setBody1] = useState("");
  const [body2, setBody2] = useState("");
  const [body3, setBody3] = useState("");
  const [imageUrl, setImageUrl] = useState("/templates/1.png");

  const [body1Error, setBody1Error] = useState("");
  const [body2Error, setBody2Error] = useState("");
  const [body3Error, setBody3Error] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wakeup`)
  //   .then(data => {
  //     console.log("Server wakeup response: ", data);
  //   })
  // }, []);

  const handlePreview = async (e) => {
    e.preventDefault();

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles`, { image_text: { answer1, answer2, answer3 } });
    setImageUrl(response.data.url);
    } catch (error) {
    console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const cookies = nookies.get(null);
      const config = {
        headers: { 
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${cookies.token}` 
        },
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles`, { answers: { body1, body2, body3 } }, config);
      
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
      setIsLoading(false); //念の為
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
                  value={body1}
                  error={body1Error !== ''}
                  helperText={body1Error}
                  onChange={(e) => {
                    if (e.target.value.length > MAX_LINE_LENGTH_OF_ANSWER1) {
                      setBody1Error('13文字以内で入力してください。');
                    } else {
                      setBody1Error('');
                      setBody1(e.target.value);
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
                  value={body2}
                  error={body2Error !== ''}
                  helperText={body2Error}
                  onChange={(e) => {
                    if (e.target.value.length > MAX_LINE_LENGTH_OF_ANSWER2) {
                      setBody2Error('13文字以内で入力してください。');
                    } else {
                      setBody2Error('');
                      setBody2(e.target.value);
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
                  value={body3}
                  multiline
                  rows={MAX_LINE_COUNT}
                  error={body3Error !== ''}
                  helperText={body3Error}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n');
                    if (lines.length > MAX_LINE_COUNT || lines.some(line => line.length > MAX_LINE_LENGTH_OF_ANSWER3)) {
                      setBody3Error('1行は26文字以内、改行は2回までとしてください。');
                    } else {
                      setBody3Error('');
                      setBody3(e.target.value);
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
                プレビュー！
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
