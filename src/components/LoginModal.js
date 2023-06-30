import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import axios from "axios";
import useFirebaseAuth from "../hooks/useFirebaseAuth"
import CenteredBox from './CenteredBox';
import { FaGithub } from 'react-icons/fa'; 
import { useState } from 'react';  
import { Loading } from './Loading'
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography'
import Link from 'next/link';

export default function LoginModal({ open, onClose }) {
  const { loginWithFirebase } = useFirebaseAuth();
  const { enqueueSnackbar } = useSnackbar(); 
  const [authenticating, setAuthenticating] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const router = useRouter();
  
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
      };

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth`, userDetails, config);

        if (response.data.status === "success") {
          enqueueSnackbar('ログインしたよ！', { variant: 'success' });
          setAuthenticating(false); 
          setNavigating(true);
          onClose();
          try {
            if (response.data.isNewUser) {
              await router.push(response.data.is_student ? `/mypage/edit` : `/mypage/edit`);
            } else {
              await router.push('/users');
              setNavigating(false);
            }
          } catch (err) {
            console.error("Navigation error: ", err);
            enqueueSnackbar('遷移中にエラーが発生したよ。', { variant: 'error' });
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
          enqueueSnackbar('認証中にエラーが発生したよ。', { variant: 'error' });
        } else {
          message = String(err);
          console.error(message);
        }
      } finally {
        if (!navigating) setAuthenticating(false);
      }
    };
    verifyIdToken();
  };


  return (
    <>
    <Dialog open={open} onClose={onClose}>
    {(authenticating || navigating) &&
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
    { (!authenticating && !navigating) && 
    <>
      <CenteredBox>
      <Typography variant="body1" paragraph>
        <Link href="/terms"><a>利用規約</a></Link>、<Link href="/privacy-policy"><a>プライバシーポリシー</a></Link>に<br/>
            同意してからログインしてね！
    </Typography>
          <Button 
            variant="contained"
            sx={{ 
   
              mb: 2, 
              backgroundColor: '#FF6699',
              '&:hover': {
                backgroundColor: '#E60073',
              },
              color: '#white',
              fontWeight: 'bold',
              fontSize: '1.2em',
              padding: '2px 10px' 
            }}
            onClick={handleGitHubLogin}
          > 
            <FaGithub style={{ marginRight: '8px' }} /> 
            GitHubログイン
          </Button>
      </CenteredBox>
    </>
    }
    </Dialog>
    </>
  )
}
