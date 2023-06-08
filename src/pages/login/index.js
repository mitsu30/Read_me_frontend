import { useRouter } from 'next/router';
import axios from "axios";
import useFirebaseAuth from "../../hooks/useFirebaseAuth"

export default function LoginPage() {
  const { loginWithFirebase } = useFirebaseAuth();
  const router = useRouter();


  const handleGitHubLogin = () => {
    const verifyIdToken = async () => {
      const { user } = await loginWithFirebase("github");
      const token = await user?.getIdToken();

      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      try {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth`, null, config);
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
