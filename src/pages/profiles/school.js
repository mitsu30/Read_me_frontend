import * as React from 'react';
import { useState, useEffect } from "react";
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
import { useSnackbar } from 'notistack';
import { useAuthContext } from '../../context/AuthContext';

const MAX_LINE_LENGTH_OF_ANSWER1 = 6;
const MAX_LINE_LENGTH_OF_ANSWER2 = 12;
const MAX_LINE_LENGTH_OF_ANSWER4 = 23;
const MAX_LINE_LENGTH_OF_ANSWER5 = 15;

export default function App () {
  const [body1, setBody1] = useState("");
  const [body2, setBody2] = useState("");
  const [body3, setBody3] = useState("");
  const [body4, setBody4] = useState("");
  const [body5, setBody5] = useState("");
  const [imageUrl, setImageUrl] = useState("/templates/school.png");

  const [body1Error, setBody1Error] = useState("");
  const [body2Error, setBody2Error] = useState("");
  const [body4Error, setBody4Error] = useState("");
  const [body5Error, setBody5Error] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const { AuthContext} = useAuthContext(); 
  const { isStudent } = AuthContext;

  const router = useRouter();

  useEffect(() => {
    if (!isStudent) {
      enqueueSnackbar("許可されていないアクセスです", { variant: 'error' })
      router.push('/profiles');
    }
  }, [isStudent, router]);

  const validateForm = () => {
    let isValid = true;
    if (!body1) {
      enqueueSnackbar("なまえを入力してね", { variant: 'error' });
      isValid = false;
    }
    if (!body2) {
      enqueueSnackbar("しゅみを入力してね", { variant: 'error' });
      isValid = false;
    }
    if (!body3) {
      enqueueSnackbar("推しCREDOを選択してね", { variant: 'error' });
      isValid = false;
    }
    if (!body4) {
      enqueueSnackbar("めざしたわけを入力してね", { variant: 'error' });
      isValid = false;
    }
    if (!body5) {
      enqueueSnackbar("がんばりたいことを入力してね", { variant: 'error' });
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

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/school/preview`, { answers: { body1, body2, body3, body4, body5 } }, config);
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

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/school`, { answers: { body1, body2, body3, body4, body5 } }, config);
      
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
                  id="answer1"
                  label="なまえ"
                  name="answer1"
                  autoFocus
                  value={body1}
                  error={body1Error !== ''}
                  helperText={body1Error}
                  onChange={(e) => {
                    if (e.target.value.length > MAX_LINE_LENGTH_OF_ANSWER1) {
                      setBody1Error('6文字以内で入力してください。');
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
                  label="しゅみ"
                  id="answer2"
                  value={body2}
                  error={body2Error !== ''}
                  helperText={body2Error}
                  onChange={(e) => {
                    if (e.target.value.length > MAX_LINE_LENGTH_OF_ANSWER2) {
                      setBody2Error('12文字以内で入力してください。');
                    } else {
                      setBody2Error('');
                      setBody2(e.target.value);
                    }
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel id="select-label">推しCREDO</InputLabel>
                  <Select
                    labelId="select-label"
                    id="answer3"
                    value={body3}
                    label="推しCREDO"
                    onChange={(e) => {
                      setBody3(e.target.value);
                    }}
                  >
                    <MenuItem value={"Be Open"}>Be Open</MenuItem>
                    <MenuItem value={"Move Fast"}>Move Fast</MenuItem>
                    <MenuItem value={"Give First"}>Give First</MenuItem>
                    <MenuItem value={"Geek Out"}>Geek Out</MenuItem>
                    <MenuItem value={"Take Ownership"}>Take Ownership</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  color="secondary"
                  margin="normal"
                  fullWidth
                  name="answer4"
                  label="めざしたわけ"
                  id="answer4"
                  value={body4}
                  error={body4Error !== ''}
                  helperText={body4Error}
                  onChange={(e) => {
                    if (e.target.value.length > MAX_LINE_LENGTH_OF_ANSWER4) {
                      setBody4Error('23文字以内で入力してください。');
                    } else {
                      setBody4Error('');
                      setBody4(e.target.value);
                    }
                  }}
                />
                <TextField
                  color="secondary"
                  margin="normal"
                  fullWidth
                  name="answer5"
                  label="がんばりたいこと"
                  id="answer5"
                  value={body5}
                  error={body5Error !== ''}
                  helperText={body5Error}
                  onChange={(e) => {
                    if (e.target.value.length > MAX_LINE_LENGTH_OF_ANSWER5) {
                      setBody5Error('15文字以内で入力してください。');
                    } else {
                      setBody5Error('');
                      setBody5(e.target.value);
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
