import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import axios from "axios";
import useFirebaseAuth from "../../hooks/useFirebaseAuth"

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
    <div>
      <button onClick={handleGitHubLogin}>
        <span>Sign in with GitHub</span>
      </button>
    </div>
    </>
  );
}
