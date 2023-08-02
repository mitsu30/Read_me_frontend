import * as React from 'react';
import { useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import { Loading } from '../../components/Loading';
import nookies from "nookies";
import { useSnackbar } from 'notistack';


const MAX_LINE_LENGTH_OF_ANSWER1 = 13;
const MAX_LINE_LENGTH_OF_ANSWER2 = 9;
const MAX_LINE_COUNT = 6;


export default function App () {
  const [body1, setBody1] = useState("");
  const [body2, setBody2] = useState("");
  const [imageUrl, setImageUrl] = useState("/templates/anniversary.png");

  const [body1Error, setBody1Error] = useState("");
  const [body2Error, setBody2Error] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const router = useRouter();

  const countStringLength = (str) => {
    let length = 0;
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
        length += 0.5;
      } else {
        length += 1;
      }
    }
    return length;
  }


  const handleTextChange1 = (e) => {
    const inputValue = e.target.value;
    const lines = inputValue.split('\n');
    if (lines.length > MAX_LINE_COUNT || 
        lines.some(line => countStringLength(line) > MAX_LINE_LENGTH_OF_ANSWER1)) {
      setBody1Error('1行は全角13文字以内、改行は5回までとしてください。');
    } else {
      setBody1Error('');
      setBody1(inputValue);
    }
  };
  
  const handleTextChange2 = (e) => {
    const inputValue = e.target.value;
    if (countStringLength(inputValue) > MAX_LINE_LENGTH_OF_ANSWER2) {
      setBody2Error('全角9文字以内で入力してください。');
    } else {
      setBody2Error('');
      setBody2(inputValue);
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (!body1) {
      enqueueSnackbar("メッセージを入力してね", { variant: 'error' });
      isValid = false;
    }
    if (!body2) {
      enqueueSnackbar("なまえを入力してね", { variant: 'error' });
      isValid = false;
    }
    return isValid;
  };


  const handlePreview = async (e) => {
    e.preventDefault();
    
  try {
    const cookies = nookies.get(null);
    const config = {
      headers: { 
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${cookies.token}` 
      },
    };

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/anniversary/preview`, { answers: { body1, body2 } }, config);
    setImageUrl(response.data.url);
    } catch (error) {
    console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
  
    try {
      const cookies = nookies.get(null);
      const config = {
        headers: { 
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${cookies.token}` 
        },
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/anniversary`, { answers: { body1, body2 } }, config);
      
      if (response.status !== 200) {
        throw new Error('Request failed with status: ' + response.status);
      }
      // console.log(response);
  
      const img = new Image();
  
      img.onload = () => {
        setImageUrl(response.data.url);
        setIsNavigating(true);
        enqueueSnackbar('プロフィール帳を保存したよ！', { variant: 'success' });
        router.push({
          pathname: '/profiles/[id]', 
          query: { id: response.data.uuid }, 
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
                  name="answer1"
                  label="メッセージ"
                  id="answer1"
                  value={body1}
                  multiline
                  rows={MAX_LINE_COUNT}
                  error={body1Error !== ''}
                  helperText={body1Error}
                  onChange={handleTextChange1}
                />
                <TextField
                  color="secondary"
                  margin="normal"
                  fullWidth
                  id="answer2"
                  label="なまえ"
                  name="answer2"
                  autoFocus
                  value={body2}
                  error={body2Error !== ''}
                  helperText={body2Error}
                  onChange={handleTextChange2}
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
