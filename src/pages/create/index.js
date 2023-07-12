import * as React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import { Loading } from '../../components/Loading'
import { usePreviewAndSubmit } from '../../hooks/usePreviewAndSubmit';


const MAX_LINE_LENGTH_OF_NICKNAME = 13;
const MAX_LINE_LENGTH_OF_HOBBY = 13;
const MAX_LINE_LENGTH_OF_MESSAGE = 26;
const MAX_LINE_COUNT = 3;

export default function App () {
  const [nickname, setNickname] = useState("");
  const [hobby, setHobby] = useState("");
  const [message, setMessage] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [hobbyError, setHobbyError] = useState("");
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wakeup`)
    .then(data => {
      console.log("Server wakeup response: ", data);
    })
  }, []);

  
  const { imageUrl, isLoading, isNavigating, handlePreview, handleSubmit } = usePreviewAndSubmit(nickname, hobby, message);

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
                  id="nickname"
                  label="ニックネームは？"
                  name="nickname"
                  autoFocus
                  value={nickname}
                  error={nicknameError !== ''}
                  helperText={nicknameError}
                  onChange={(e) => {
                    if (e.target.value.length > MAX_LINE_LENGTH_OF_NICKNAME) {
                      setNicknameError('13文字以内で入力してください。');
                    } else {
                      setNicknameError('');
                      setNickname(e.target.value);
                    }
                  }}
                />
                <TextField
                  color="secondary"
                  margin="normal"
                  fullWidth
                  name="hobby"
                  label="しゅみは？"
                  id="hobby"
                  value={hobby}
                  error={hobbyError !== ''}
                  helperText={hobbyError}
                  onChange={(e) => {
                    if (e.target.value.length > MAX_LINE_LENGTH_OF_HOBBY) {
                      setHobbyError('13文字以内で入力してください。');
                    } else {
                      setHobbyError('');
                      setHobby(e.target.value);
                    }
                  }}
                />
                <TextField
                  color="secondary"
                  margin="normal"
                  fullWidth
                  name="message"
                  label="みんなにひとこと！"
                  id="message"
                  value={message}
                  multiline
                  rows={MAX_LINE_COUNT}
                  error={messageError !== ''}
                  helperText={messageError}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n');
                    if (lines.length > MAX_LINE_COUNT || lines.some(line => line.length > MAX_LINE_LENGTH_OF_MESSAGE)) {
                      setMessageError('1行は26文字以内、改行は2回までとしてください。');
                    } else {
                      setMessageError('');
                      setMessage(e.target.value);
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
