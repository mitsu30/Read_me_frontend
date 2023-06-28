import * as React from 'react';
import { useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import { Loading } from '../../components/Loading';
import nookies from "nookies";

const MAX_LINE_LENGTH_OF_ANSWER1 = 13;
const MAX_LINE_LENGTH_OF_ANSWER6 = 13;
const MAX_LINE_LENGTH_OF_ANSWER7 = 26;

export default function App () {
  const [body1, setBody1] = useState("");
  const [body2, setBody2] = useState("1");
  const [body3, setBody3] = useState("1");
  const [body4, setBody4] = useState("");
  const [body5, setBody5] = useState("");
  const [body6, setBody6] = useState("");
  const [body7, setBody7] = useState("");

  const [body1Error, setBody1Error] = useState("");
  const [body6Error, setBody6Error] = useState("");
  const [body7Error, setBody7Error] = useState("");
  
  const [imageUrl, setImageUrl] = useState("/templates/2.png");
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const router = useRouter();

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

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/preview`, { answers: { body1, body2, body3, body4, body5, body6, body7 } }, config);
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

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles`, { answers: { body1, body2, body3, body4, body5, body6, body7 } }, config);
      
      if (response.status !== 200) {
        throw new Error('Request failed with status: ' + response.status);
      }
  
      const img = new Image();
  
      img.onload = () => {
        setImageUrl(response.data.url);
        setIsNavigating(true);
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
      setIsLoading(false);
    }
  };

  const ZodiacSigns = ['おひつじ', 'おうし', 'ふたご', 'かに', 'しし', 'おとめ', 'てんびん', 'さそり', 'いて', 'やぎ', 'みずがめ', 'うお'];

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
                  label="なまえは？"
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
                <FormControl fullWidth margin="normal">
                  <InputLabel id="month-label">月は？</InputLabel>
                  <Select
                    labelId="month-label"
                    id="month-select"
                    value={body2}
                    onChange={(e) => setBody2(e.target.value)}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                      <MenuItem key={num} value={num}>{num}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="day-label">日は？</InputLabel>
                  <Select
                    labelId="day-label"
                    id="day-select"
                    value={body3}
                    onChange={(e) => setBody3(e.target.value)}
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((num) => (
                      <MenuItem key={num} value={num}>{num}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="zodiac-sign-label">せいざは？</InputLabel>
                  <Select
                    labelId="zodiac-sign-label"
                    id="zodiac-sign-select"
                    value={body4}
                    onChange={(e) => setBody4(e.target.value)}
                  >
                    {ZodiacSigns.map((sign) => (
                      <MenuItem key={sign} value={sign}>{sign}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="blood-type-label">けつえきがたは？</InputLabel>
                  <Select
                    labelId="blood-type-label"
                    id="blood-type-select"
                    value={body5}
                    onChange={(e) => setBody5(e.target.value)}
                  >
                    {['A', 'B', 'O', 'AB'].map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  color="secondary"
                  margin="normal"
                  fullWidth
                  name="answer6"
                  label="みんなからいわれる"
                  id="answer6"
                  value={body6}
                  error={body6Error !== ''}
                  helperText={body6Error}
                  onChange={(e) => {
                    if (e.target.value.length > MAX_LINE_LENGTH_OF_ANSWER2) {
                      setBody6Error('13文字以内で入力してください。');
                    } else {
                      setBody6Error('');
                      setBody6(e.target.value);
                    }
                  }}
                />
                <TextField
                  color="secondary"
                  margin="normal"
                  fullWidth
                  name="answer7"
                  label="じぶんのせいかく"
                  id="answer7"
                  value={body7}
                  multiline
                  rows={MAX_LINE_LENGTH_OF_ANSWER7}
                  error={body7Error !== ''}
                  helperText={body7Error}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n');
                    if (lines.length > MAX_LINE_COUNT || lines.some(line => line.length > MAX_LINE_LENGTH_OF_ANSWER3)) {
                      setBody7Error('1行は26文字以内、改行は2回までとしてください。');
                    } else {
                      setBody7Error('');
                      setBody7(e.target.value);
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
