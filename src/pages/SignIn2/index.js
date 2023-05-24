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
import Image from "next/image";
import { TwitterShareButton, TwitterIcon} from "react-share";



// TODO remove, this demo shouldn't need to reset the theme.

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
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/image_texts', { answer1, answer2, answer3 });
      setImageUrl(response.data.url);
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
                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
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
                      justifyContent: 'center',
                    }}
                  >
                    <Button 
                      type="submit"
                      variant="contained"
                      sx={{ 
                        mt: 3, 
                        mb: 2, 
                        width: '50%',
                        backgroundColor: '#FF82B2',
                        color: '#000000'  }}
                    >
                      これでつくる!
                    </Button>
                  </Container>
                </Box>
              </Box>
            </Grid>
            <Container
                maxWidth="sm"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Typography component="h1" variant="h5">
                  プロフィール帳のデザインはこれだよ！
                </Typography>
              </Container>
                <Grid
                  item
                  xs={false}
                  sm={4}
                  md={6}
      
                  sx={{
                    my:20
                  }}
                >
            {imageUrl && <Image src={imageUrl} alt="Generated" height='630px' width='1200px' />}
            <Image src="/template1.png" height='630px' width='1200px'/>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
