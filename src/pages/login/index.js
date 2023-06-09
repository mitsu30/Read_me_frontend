import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from "axios";
import useFirebaseAuth from "../../hooks/useFirebaseAuth"
import CenteredBox from '../../components/CenteredBox';
import { FaGithub } from 'react-icons/fa'; 

export default function LoginPage() {
  const { loginWithFirebase } = useFirebaseAuth();
  const router = useRouter();
  
  const { enqueueSnackbar } = useSnackbar(); 

  const handleGitHubLogin = () => {
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
        console.log(details);
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth`, userDetails, config);
        enqueueSnackbar('ログインに成功しました', { variant: 'success' });
        router.push("/");
        // router.push('/additional_info_google');
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

  return (
    <>
      <CenteredBox>
        <Typography variant="h6" style={{margin: '10px 0',textAlign: 'center', width: '100%' }}>
          RUNTEQのみんなはこちら！
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


