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

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      nickname: data.get('nickname'),
      hobby: data.get('hobby'),
      favoriteCT: data.get('favoriteCT')
    });
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
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    color="secondary"
                    margin="normal"
                    required
                    fullWidth
                    id="nickname"
                    label="ニックネームは？"
                    name="nickname"
                    autoFocus
                  />
                  <TextField
                    color="secondary"
                    margin="normal"
                    required
                    fullWidth
                    name="hobby"
                    label="しゅみは？"
                    id="hobby"
                  />
                  <TextField
                    color="secondary"
                    margin="normal"
                    required
                    fullWidth
                    name="favoriteCT"
                    label="推しCTは？"
                    id="favoriteCT"
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
          <Grid
            item
            xs={false}
            sm={4}
            md={6}
            sx={{
              my:20,
              backgroundImage: "/public/template1.png",
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              
            }}
          >
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
          <Image src="/template1.png" height='630px' width='1200px'/>
          </Grid>
        </Grid>
      </ThemeProvider>

      <TwitterShareButton 
        url="https://prism-cube.com" 
        title="りーどみー"
        >
        <TwitterIcon size={30} round={true} />
      </TwitterShareButton>
  </>
  );
}
