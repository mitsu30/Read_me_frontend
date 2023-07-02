import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from "axios";
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import nookies from "nookies";
import { useAuthContext } from '../../context/AuthContext';

export default function AdditionalInfoPage() {
  const [initialData, setInitialData] = useState(null); 
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState('');
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [greeting, setGreeting] = useState('');
  const { AuthContext} = useAuthContext(); 
  const { isStudent, setUserAvatar } = AuthContext;

  useEffect(() => {
  if (isStudent) {
    const fetchGroups = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/groups/for_community/1`);
      setGroups(response.data.groups);
    };
    fetchGroups();
  }
}, [isStudent]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookies = nookies.get();
        const config = {
          headers: { authorization: `Bearer ${cookies.token}` },
        };
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/mypages/edit`, config);
        setInitialData(response.data.data);
        setUsername(response.data.data.name || '');
        setPreview(response.data.data.avatar_url);
        setSelectedGroup(response.data.data.groups ? response.data.data.groups.id : '');
        setGreeting(response.data.data.greeting || '');
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  if (!initialData) {
    return <div>Loading...</div>; // or return a skeleton component
  }

  const handleUpdateProfile = async () => {
    
    if (greeting === '' || greeting.length > 50) {
      enqueueSnackbar('ひとことを50文字以内で入力してね！', { variant: 'error' });
      return;
    }
    
    if (preview === '') {
      enqueueSnackbar('アイコン用の画像をえらんでね！', { variant: 'error' });
      return;
    }

    
    if (isStudent) { // isStudentの場合のみ以下を実行
      if (selectedGroup === '') {
        enqueueSnackbar('グループをえらんでね！', { variant: 'error' });
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append('user[name]', username); 
      formData.append('user[greeting]', greeting); 
      if (avatar) {
      formData.append('user[avatar]', avatar);
      };
      if (isStudent) { 
        formData.append('group_id', selectedGroup);
      }
  
      const cookies = nookies.get(null);
      const config = {
        headers: { 
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${cookies.token}` 
        },
      };
  
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/mypages`, formData, config);
  
      if (response.status === 200) {
        setUserAvatar(response.data.data)
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
  
  return (
    <>
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
              プロフィール
            </Typography>
          </Box>
          <Box sx={{mt: 2 }}>
            <Typography component="h1" variant="h5">
            なまえをおしえてね
            </Typography>
          </Box>
          {isStudent && (
          <Box>
            <Typography component="h1" variant="h5">
            (スクールで使っているなまえ)
            </Typography>
          </Box>
          )}
          <Box component="form">
            <TextField
              color="secondary"
              margin="normal"
              fullWidth
              id="username"
              label="なまえ"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          {isStudent && (
          <>
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
          </>
          )}
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
    </>
  );
}

