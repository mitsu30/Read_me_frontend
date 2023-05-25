import { useState } from "react";
import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';



const defaultTheme = createTheme();
const theme = createTheme({
  typography: {
    fontFamily: 'Yomogi, sans-serif',
  }
})

export default function App () {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [imageUrl, setImageUrl] = useState("/template1.png");

  const router = useRouter();

  const handlePreview = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/image_texts/preview`, { answer1, answer2, answer3 });
      setImageUrl(response.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/image_texts`, { answer1, answer2, answer3 });
      setImageUrl(response.data.url);
      router.push({
        pathname: '/result',
        query: { imageUrl: response.data.url },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }} justifyContent="center">
          <CssBaseline />
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 20,
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
                    required
                    fullWidth
                    id="answer1"
                    label="ニックネームは？"
                    name="answer1"
                    autoFocus
                    value={answer1}
                    onChange={(e) => setAnswer1(e.target.value)}
                  />
                  <TextField
                    color="secondary"
                    margin="normal"
                    required
                    fullWidth
                    name="answer2"
                    label="しゅみは？"
                    id="answer2"
                    value={answer2}
                    onChange={(e) => setAnswer2(e.target.value)}
                  />
                  <TextField
                    color="secondary"
                    margin="normal"
                    required
                    fullWidth
                    name="answer3"
                    label="推しCTは？"
                    id="answer3"
                    value={answer3}
                    onChange={(e) => setAnswer3(e.target.value)}
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
                        backgroundColor: '#FF82B2',
                        color: '#000000'  
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
                        backgroundColor: '#FF82B2',
                        color: '#000000'  
                      }}
                      onClick={handleSubmit} // 変更
                    >
                      作成
                    </Button>
                  </Container>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 20,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component="h1" variant="h5">
                  プロフィール帳のデザインはこれだよ！
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  {
                    imageUrl.startsWith('data:image/jpeg;base64,') ?
                    <img src={imageUrl} alt="Generated" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                  :
                    <img src={imageUrl} alt="Template" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                  }
                </Box>
              </Box>
            </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
