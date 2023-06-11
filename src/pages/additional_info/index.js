import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from "axios";
import { useState, useEffect } from "react";

export default function AdditionalInfoPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(""); 

  useEffect(() => {
    // ローカルストレージからユーザー名を取得して初期値とする
    const initialUsername = localStorage.getItem('username') || "";
    setUsername(initialUsername);
  }, []);
  
  const handleUpdateProfile = async () => {
    try {
      // Add the API endpoint and request method to update user profile
      // and the data to be sent (username and avatar)
      const response = await axios.put("/api/update_profile", {
        username,
        avatar,
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

  return (
    <div>
      <Box component="form">
        <Typography variant="h6">ユーザー情報の更新</Typography>

        <label>ユーザーネーム:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>アバター画像:</label>
        <input
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
        />

        <Button variant="contained" onClick={handleUpdateProfile}>
          更新
        </Button>
      </Box>
    </div>
  );
}
