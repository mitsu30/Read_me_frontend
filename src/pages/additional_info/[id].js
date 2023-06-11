import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from "axios";
import { useState, useEffect } from "react";

export default function AdditionalInfoPage({ initialData }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = router.query;

  const [username, setUsername] = useState(initialData.name);
  const [avatar, setAvatar] = useState(""); 
  // const [group, setGroup] = useState("");  // Add a new state for 'group'
  
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${id}`, {
        name: username,
        avatar,
        // group,
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

        {/* <label>グループ:</label>  // Add a new input field for 'group'
        <input
          type="text"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        /> */}

        <Button variant="contained" onClick={handleUpdateProfile}>
          更新
        </Button>
      </Box>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`);
  const data = await response.json();
  console.log(data)

  return {
    props: {
      initialData: data.data
    },
  };
}
