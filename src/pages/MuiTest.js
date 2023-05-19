import MuiButton from "../components/MuiButton"
import Head from "next/head"
import SignIn from "../components/SignIn"
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';





export default function Mui() {

  return (
    <>
      <Head>
        <title>ページのタイトル</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box
      sx={{
        width: 300,
        height: 300,
        backgroundColor: 'pink',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      />
      <Container component="main" maxWidth="lg">
        <Box
        sx={{
          width: 1200,
          height: 300,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#FFBEDA',
        }}
        ></Box>
      </Container>

      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#FFBEDA',
          }}
          >
          <Box
            sx={{
              width: 1000,
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'green',
            }}
          >
            <Grid container justify="center">
              <Grid item xs={8}>
                <TextField fullWidth id="standard-basic" variant="standard" />
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  私の名前はらんてくんです
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#FFBEDA',
          }}
          >
            <Box
              border={2}
              borderColor="skyblue"
              Box borderRadius={5}
              boxShadow={3}
              width="80%"
              height="80%"
              sx={{
                m:  8,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: 'white',
              }}
              >
                <Grid container justify="center">
                  <Grid item xs={4}>
                  <Typography component="h6" variant="h5">
                    なまえ
                  </Typography>
                  <Grid item xs={8}>
                    <TextField fullWidth id="standard-basic" variant="standard" />
                  </Grid>
                  </Grid>  
                </Grid>
                <Grid container justify="center">
                  <Grid item xs={4}>
                    <TextField fullWidth id="standard-basic" variant="standard" />
                  </Grid>
                  <Grid item xs={8}>
                  <Typography component="h6" variant="h5">
                    私の名前はらんてくん
                  </Typography>
                  </Grid>  
                </Grid>
            </Box>
        </Box>
    </>
  )
}
