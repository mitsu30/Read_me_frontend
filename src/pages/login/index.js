import { useRouter } from 'next/router';
import axios from "axios";
import useFirebaseAuth from "../../hooks/useFirebaseAuth"

export default function LoginPage() {
  const { loginWithGoogle } = useFirebaseAuth();
  const router = useRouter();

  const handleGoogleLogin = () => {
    const verifyIdToken = async () => {
      const user = await loginWithGoogle();
      const token = await user?.getIdToken();

      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      try {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth`, null, config);
        router.push('/additional_info_google');
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
    <div>
      <button onClick={handleGoogleLogin}>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}
