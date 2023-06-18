import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from "axios";
import useFirebaseAuth from "../../hooks/useFirebaseAuth"
import CenteredBox from '../../components/CenteredBox';
import { FaGithub } from 'react-icons/fa'; 
import { useState } from 'react';  
import { Loading } from '../../components/Loading'
import Box from '@mui/material/Box';

export default function LoginPage() {
  const { loginWithFirebase } = useFirebaseAuth();
  const router = useRouter();
  
  const { enqueueSnackbar } = useSnackbar(); 

  const [authenticating, setAuthenticating] = useState(false);

  const handleGitHubLogin = () => {
    setAuthenticating(true);

    const verifyIdToken = async () => {
      const { user, details } = await loginWithFirebase("github");
      const token = await user?.getIdToken();

      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      const userDetails = {
        username: details.username,
        isNewUser: details.isNewUser
      };

      try {
        // console.log(details);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth`, userDetails, config);
        if (response.data.status === "success") {
          enqueueSnackbar('ログインしたよ！', { variant: 'success' });
          if (userDetails.isNewUser) {
            router.push(response.data.is_student ? `/additional_info_runteq/${response.data.uid}` : `/additional_info_general/${response.data.uid}`);
          } else {
            router.push('/users');
          }
        //APIのレスポンスが "success" ではない場合（つまり、APIのリクエスト自体は成功したが、その結果としてエラーが返された場合）
        } else {
          enqueueSnackbar(response.data.message, { variant: 'error' });
        }
      //APIリクエスト自体がエラーを引き起こした場合（つまり、ネットワークエラーやサーバーのダウンなど）
      } catch (err) {
        let message;
        if (axios.isAxiosError(err) && err.response) {
          console.error(err.response.data.message);
        } else {
          message = String(err);
          console.error(message);
        }
      }
    };
    verifyIdToken();
  };

  {authenticating && 
    <Box 
      sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <Loading>認証中...</Loading>
    </Box>
  }

  return (
    <>
      <CenteredBox>
        <Typography variant="h6" style={{margin: '10px 0',textAlign: 'center', width: '100%' }}>
          RUNTEQのみんなはこっち！
        </Typography>
      </CenteredBox>
      <CenteredBox>
        <Button 
          variant="contained"
          sx={{ 
            mt: 2, 
            mb: 2, 
            width: '40%', 
            backgroundColor: '#FF6699',
            '&:hover': {
              backgroundColor: '#E60073',
            },
            color: '#white',
            fontWeight: 'bold',
            fontSize: '1.0em',
            padding: '8px 10px' 
          }}
          onClick={handleGitHubLogin}
        >
          <FaGithub style={{ marginRight: '8px' }} /> 
          GitHubログイン
        </Button>
      </CenteredBox>
    </>
  );
}


