import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from "next/image";


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
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }} justifyContent="center">
        <CssBaseline />
          <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                プロフィール入力
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nickname"
                  label="ニックネームは？"
                  name="nickname"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="hobby"
                  label="しゅみは？"
                  id="hobby"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="favoriteCT"
                  label="推しCTは？"
                  id="favoriteCT"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  これでつくる
                </Button>
              </Box>
            </Box>
          </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: "/public/template1.png",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
  >
        <Typography component="h1" variant="h5">
          作成するプロフィール帳のデザイン
        </Typography>
        <Image src="/template1.png" height='630px' width='1200px'/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
