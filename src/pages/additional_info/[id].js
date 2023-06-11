import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from "axios";
import { useState } from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';

export default function AdditionalInfoPage({ initialData }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = router.query;

  const [username, setUsername] = useState(initialData.name);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', username);
      formData.append('avatar', avatar);

      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        enqueueSnackbar('プロフィールを更新しました', { variant: 'success' });
        router.push("/");
      } else {
        enqueueSnackbar('プロフィールの更新に失敗しました', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('エラーが発生しました', { variant: 'error' });
      console.error(error);
    }
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <Grid container component="main" justifyContent="center">
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            my: 2,
            mx: 4,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography component="h1" variant="h5">
            ニックネームをおしえてね
            </Typography>
          </Box>
          <Box component="form">
            <TextField
              color="secondary"
              margin="normal"
              fullWidth
              id="username"
              label="ニックネーム"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box>
            <Typography component="h1" variant="h5">
              アイコン用の画像をえらんでね
            </Typography>
          </Box>
          <Box>
            <TextField
              color="secondary"
              margin="normal"
              fullWidth
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleAvatarChange}
              />
          </Box>
          {preview && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <Avatar alt="アバター画像プレビュー" src={preview} />
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <Button 
              type="submit"
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                width: '30%', 
                backgroundColor: '#FF6699',
                '&:hover': {
                  backgroundColor: '#E60073',
                },
                color: '#white',
                fontWeight: 'bold'  
              }}
              onClick={handleUpdateProfile}
            >
              登録する
            </Button>
          </Box>
        </Box> 
      </Grid>
    </Grid>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`);
  const data = await response.json();

  return {
    props: {
      initialData: data.data
    },
  };
}
