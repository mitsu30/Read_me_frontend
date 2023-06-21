import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import nookies from "nookies";

export default function AdditionalInfoPage({ initialData }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const defaultAvatarUrl = '/default_avatar.png';
  const [username, setUsername] = useState(initialData.name);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(defaultAvatarUrl);
  
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/groups/for_community/1`);
      setGroups(response.data.groups);
      // const data = response.data.groups
    };
    fetchGroups();
  }, []);

  const handleUpdateProfile = async () => {
    
    if (selectedGroup === '') {
      enqueueSnackbar('グループを選択してね！', { variant: 'error' });
      return;
    }

    if (greeting === '' || greeting.length > 50) {
      enqueueSnackbar('ひとことを50文字以内で入力してね！', { variant: 'error' });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('user[name]', username); 
      formData.append('user[greeting]', greeting); 
      if (avatar) { 
        formData.append('user[avatar]', avatar);
      }
  
      formData.append('group_id', selectedGroup);
  
      const cookies = nookies.get(null);
      const config = {
        headers: { 
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${cookies.token}` 
        },
      };
  
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/resister_new_RUNTEQ_student`, formData, config);
  
      if (response.status === 200) {
        enqueueSnackbar('プロフィールを更新しました', { variant: 'success' });
        router.push("/users");
      } else {
        enqueueSnackbar('プロフィールの更新に失敗しました', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('エラーが発生しました', { variant: 'error' });
      console.error(error);
    }
  };

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  }
  
  const formRef = useRef();

  const handleAvatarCancel = () => {
    setAvatar(null);
    setPreview(defaultAvatarUrl);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <Grid container component="main" justifyContent="center">
      <Grid item xs={10} md={8}>
        <Box
          sx={{
            my: 2,
            mx: 4,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
            <Typography component="h1" variant="h3">
              ユーザー登録
            </Typography>
          </Box>
          <Box sx={{mt: 2 }}>
            <Typography component="h1" variant="h5">
            ニックネームをおしえてね
            </Typography>
          </Box>
          <Box>
            <Typography component="h1" variant="h5">
            (RUNTEQで使っている名前)
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
          <Box sx={{mt: 2 }}>
            <Typography component="h1" variant="h5">
            何期かおしえてね
            </Typography>
          </Box>
          <Box component="form">
            <Select
              value={selectedGroup}
              onChange={handleGroupChange}
              fullWidth
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{mt: 2 }}>
            <Typography component="h1" variant="h5">
            みんなにひとこと！
            </Typography>
          </Box>
          <Box component="form">
            <TextField
              color="secondary"
              margin="normal"
              fullWidth
              id="greeting"
              label="ひとこと"
              name="greeting"
              autoFocus
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
            />
          </Box>
          <Box sx={{mt: 2 }}>
            <Typography component="h1" variant="h5">
              アイコン用の画像をえらんでね
            </Typography>
          </Box>
          <Box>
            <form ref={formRef}>
              <TextField
                color="secondary"
                margin="normal"
                fullWidth
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={handleAvatarChange}
                />
            </form>
            {preview && preview !== defaultAvatarUrl && (
              <IconButton onClick={handleAvatarCancel}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          {preview && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <Avatar alt="アバター画像プレビュー" 
                src={preview} 
                sx={{ width: 90, height: 90 }}
              />
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
  const cookies = nookies.get(context);
  const config = {
    headers: { authorization: `Bearer ${cookies.token}` },
  };
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/show`, config);
  const data = await response.json();
  console.log(data);  

  return {
    props: {
      initialData: data.data,
    },
  };
}
