import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedPage() {
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  // ログインしていないユーザーであれば、ログインページへ飛ばす
  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, loading]);

  return <h1>This page only for logged in users.</h1>;
}
